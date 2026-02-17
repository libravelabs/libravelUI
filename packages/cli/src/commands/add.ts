import { confirm, intro, outro, spinner, multiselect } from "@clack/prompts";
import fs from "fs-extra";
import path from "path";
import picocolors from "picocolors";
import { scanProject } from "../scanners/project-scanner";
import {
  REGISTRY_URL,
  CONFIG_PATH,
  CRITICAL_DIRS,
  REGISTRY_VALID_TYPES,
} from "../constants";
import {
  getPackageManager,
  getProjectDependencies,
  installDependencies,
} from "../utils/package-manager";
import { resolveRegistryPath } from "../utils/path-resolver";
import { MESSAGES } from "../constants";
import { transformImports } from "../utils/transformers";

export async function add(components?: string[], options?: { all?: boolean }) {
  intro(picocolors.cyan(MESSAGES.ADD.INTRO));

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
  s.start(MESSAGES.ADD.FETCHING_REGISTRY);

  let registry: any;
  try {
    const response = await fetch(REGISTRY_URL);
    if (!response.ok) throw new Error(MESSAGES.ADD.FAILED_FETCH_REGISTRY);
    registry = await response.json();
    s.stop(MESSAGES.ADD.REGISTRY_FETCHED);
  } catch (err) {
    s.stop(picocolors.red(MESSAGES.ERRORS.CONNECTION_FAILED));
    return;
  }

  const availableComponents = Object.keys(registry).filter((key) =>
    REGISTRY_VALID_TYPES.includes(registry[key].type),
  );

  let selected: string[] = [];

  if (options?.all) {
    selected = availableComponents;
  } else if (components && components.length > 0) {
    selected = components;
  } else {
    const choice = await multiselect({
      message: MESSAGES.ADD.SELECT_COMPONENTS,
      options: availableComponents.map((c) => ({ value: c, label: c })),
    });
    if (Array.isArray(choice)) {
      selected = choice as string[];
    }
  }

  if (selected.length === 0) {
    outro(MESSAGES.ADD.NO_COMPONENTS);
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
    s.stop(MESSAGES.ADD.ALL_PROCESSED);
  }

  if (allDependencies.size > 0) {
    const { dependencies: existingDeps, devDependencies: existingDevDeps } =
      await getProjectDependencies(cwd);

    const missingDeps = Array.from(allDependencies).filter(
      (dep) => !existingDeps[dep] && !existingDevDeps[dep],
    );

    if (missingDeps.length > 0) {
      console.log(
        picocolors.cyan(MESSAGES.ADD.MISSING_DEPS(missingDeps.join(", "))),
      );

      let shouldInstall = options?.all;

      if (!shouldInstall) {
        shouldInstall = (await confirm({
          message: MESSAGES.ADD.INSTALL_MISSING_DEPS_PROMPT,
          initialValue: true,
        })) as boolean;
      }

      if (shouldInstall) {
        const pm = await getPackageManager(cwd);
        s.start(MESSAGES.INIT.INSTALLING_DEPS(pm));
        try {
          await installDependencies(missingDeps, cwd, pm);
          s.stop(MESSAGES.INIT.DEPS_INSTALLED);
        } catch (error) {
          s.stop(picocolors.red(MESSAGES.INIT.DEPS_INSTALL_FAILED));
          console.error(error);
        }
      }
    }
  }

  outro(
    picocolors.green(MESSAGES.ADD.SUCCESS(Array.from(installed).join(", "))),
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
    console.warn(picocolors.yellow(MESSAGES.ADD.COMPONENT_NOT_FOUND(name)));
    return;
  }

  s.message(MESSAGES.ADD.INSTALLING(name));

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
    const cwd = process.cwd();
    const projectPaths = await scanProject(cwd);
    const targetPath = resolveRegistryPath(file.path, projectPaths, cwd);
    const absolutePath = path.normalize(targetPath);

    if (processedFiles.has(absolutePath)) continue;

    const isCriticalFile = CRITICAL_DIRS.some((dir) => file.path.includes(dir));

    if (fs.existsSync(absolutePath) && isCriticalFile) {
      if (decidedFiles.has(absolutePath)) {
        if (!decidedFiles.get(absolutePath)) {
          processedFiles.add(absolutePath);
          continue;
        }
      } else {
        s.stop(MESSAGES.ADD.FILE_EXISTS(file.path));
        const shouldOverwrite = await confirm({
          message: MESSAGES.ADD.OVERWRITE_PROMPT(file.path),
          initialValue: false,
        });

        decidedFiles.set(absolutePath, !!shouldOverwrite);

        if (!shouldOverwrite) {
          console.log(picocolors.dim(MESSAGES.ADD.SKIPPING(file.path)));
          processedFiles.add(absolutePath);
          s.start(MESSAGES.ADD.INSTALLING(name));
          continue;
        }
        s.start(MESSAGES.ADD.INSTALLING(name));
      }
    }

    await fs.ensureDir(path.dirname(absolutePath));
    const content = file.content || file.code;
    const transformedContent = transformImports(content, projectPaths);

    await fs.writeFile(absolutePath, transformedContent);
    processedFiles.add(absolutePath);
  }

  installed.add(name);
  console.log(picocolors.green(MESSAGES.ADD.INSTALLED(name)));
}
