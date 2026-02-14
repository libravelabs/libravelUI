import { confirm, intro, outro, spinner, multiselect } from "@clack/prompts";
import fs from "fs-extra";
import path from "path";
import picocolors from "picocolors";
import { scanProject } from "../scanners/project-scanner";
import { REGISTRY_URL, CONFIG_PATH, CRITICAL_DIRS } from "../utils/constants";
import {
  getPackageManager,
  getProjectDependencies,
  installDependencies,
} from "../utils/package-manager";

export async function add(components?: string[], options?: { all?: boolean }) {
  intro(picocolors.cyan("LibravelUI Component Adder"));

  const cwd = process.cwd();
  let config: any = null;
  if (await fs.pathExists(path.resolve(cwd, CONFIG_PATH))) {
    config = await fs.readJSON(path.resolve(cwd, CONFIG_PATH));
  }

  const projectPaths = await scanProject(cwd);

  const resolvePath = (pathStr: string) => {
    if (!pathStr.startsWith("@/")) return pathStr;
    const suffix = pathStr.replace("@/", "");
    const base = projectPaths.baseDir.replace(/\\/g, "/");

    if (base === ".") return suffix;
    return path.join(base, suffix);
  };

  const getPath = (key: string, defaultPath: string) => {
    if (config?.aliases?.[key]) return resolvePath(config.aliases[key]);
    if (projectPaths) {
      if (key === "components") return projectPaths.componentsDir;
      if (key === "lib") return projectPaths.libDir;
      if (key === "hooks") return projectPaths.hooksDir;
      if (key === "utils") return projectPaths.utilsDir;
    }
    return defaultPath;
  };

  const s = spinner();
  s.start("Fetching component registry...");

  let registry: any;
  try {
    const response = await fetch(REGISTRY_URL);
    if (!response.ok) throw new Error("Failed to fetch registry");
    registry = await response.json();
    s.stop("Registry fetched successfully!");
  } catch (err) {
    s.stop(
      picocolors.red(
        "Could not connect to LibravelUI server. Make sure it's running on localhost:3000",
      ),
    );
    return;
  }

  const availableComponents = Object.keys(registry).filter((key) =>
    ["registry:ui", "registry:block"].includes(registry[key].type),
  );

  let selected: string[] = [];

  if (options?.all) {
    selected = availableComponents;
  } else if (components && components.length > 0) {
    selected = components;
  } else {
    const choice = await multiselect({
      message: "Select components to install:",
      options: availableComponents.map((c) => ({ value: c, label: c })),
    });
    if (Array.isArray(choice)) {
      selected = choice as string[];
    }
  }

  if (selected.length === 0) {
    outro("No components selected.");
    return;
  }

  const installed = new Set<string>();
  const decidedFiles = new Map<string, boolean>();
  const processedFiles = new Set<string>();
  const allDependencies = new Set<string>();

  try {
    for (const name of selected) {
      await installComponent(
        name,
        registry,
        installed,
        decidedFiles,
        processedFiles,
        allDependencies,
        s,
        getPath,
      );
    }
  } finally {
    s.stop("All components processed.");
  }

  if (allDependencies.size > 0) {
    const { dependencies: existingDeps, devDependencies: existingDevDeps } =
      await getProjectDependencies(cwd);

    const missingDeps = Array.from(allDependencies).filter(
      (dep) => !existingDeps[dep] && !existingDevDeps[dep],
    );

    if (missingDeps.length > 0) {
      console.log(
        picocolors.cyan(
          `Missing dependencies found: ${missingDeps.join(", ")}`,
        ),
      );

      let shouldInstall = options?.all;

      if (!shouldInstall) {
        shouldInstall = (await confirm({
          message: "Would you like to install the missing dependencies?",
          initialValue: true,
        })) as boolean;
      }

      if (shouldInstall) {
        const pm = await getPackageManager(cwd);
        s.start(`Installing dependencies using ${pm}...`);
        try {
          await installDependencies(missingDeps, cwd, pm);
          s.stop("Dependencies installed successfully!");
        } catch (error) {
          s.stop(picocolors.red("Failed to install dependencies."));
          console.error(error);
        }
      }
    }
  }

  outro(
    picocolors.green(
      `Successfully installed: ${Array.from(installed).join(", ")}`,
    ),
  );
}

async function installComponent(
  name: string,
  registry: any,
  installed: Set<string>,
  decidedFiles: Map<string, boolean>,
  processedFiles: Set<string>,
  allDependencies: Set<string>,
  s: any,
  getPath: (key: string, defaultPath: string) => string,
) {
  if (installed.has(name)) return;

  const component = registry[name];
  if (!component) {
    console.warn(
      picocolors.yellow(
        `\nWarning: Component "${name}" not found in registry.`,
      ),
    );
    return;
  }

  s.message(`Installing ${name}...`);

  if (component.dependencies && Array.isArray(component.dependencies)) {
    component.dependencies.forEach((dep: string) => allDependencies.add(dep));
  }

  if (component.registryDependencies) {
    for (const dep of component.registryDependencies) {
      await installComponent(
        dep,
        registry,
        installed,
        decidedFiles,
        processedFiles,
        allDependencies,
        s,
        getPath,
      );
    }
  }

  for (const file of component.files) {
    let normalizedPath = file.path.replace(/\\/g, "/");

    if (normalizedPath.startsWith("components/ui/")) {
      const base = getPath("components", "components");
      normalizedPath = normalizedPath.replace("components/ui/", `${base}/ui/`);
    } else if (normalizedPath.startsWith("lib/utils")) {
      const base = getPath("utils", "lib/utils");
      normalizedPath = normalizedPath.replace("lib/utils", base);
    } else if (normalizedPath.startsWith("lib/")) {
      const base = getPath("lib", "lib");
      normalizedPath = normalizedPath.replace("lib/", `${base}/`);
    } else if (normalizedPath.startsWith("hooks/")) {
      const base = getPath("hooks", "hooks");
      normalizedPath = normalizedPath.replace("hooks/", `${base}/`);
    }

    const targetPath = path.resolve(process.cwd(), normalizedPath);
    const absolutePath = path.normalize(targetPath);

    if (processedFiles.has(absolutePath)) continue;

    const isCriticalFile = CRITICAL_DIRS.some((dir) =>
      normalizedPath.includes(dir),
    );

    if (fs.existsSync(absolutePath) && isCriticalFile) {
      if (decidedFiles.has(absolutePath)) {
        if (!decidedFiles.get(absolutePath)) {
          processedFiles.add(absolutePath);
          continue;
        }
      } else {
        s.stop(`File "${normalizedPath}" already exists.`);
        const shouldOverwrite = await confirm({
          message: `Overwrite ${normalizedPath}?`,
          initialValue: false,
        });

        decidedFiles.set(absolutePath, !!shouldOverwrite);

        if (!shouldOverwrite) {
          console.log(picocolors.dim(`Skipping "${normalizedPath}"`));
          processedFiles.add(absolutePath);
          s.start(`Installing ${name}...`);
          continue;
        }
        s.start(`Installing ${name}...`);
      }
    }

    await fs.ensureDir(path.dirname(absolutePath));
    const content = file.content || file.code;

    await fs.writeFile(absolutePath, content);
    processedFiles.add(absolutePath);
  }

  installed.add(name);
  console.log(picocolors.green(`✓ ${name} installed`));
}
