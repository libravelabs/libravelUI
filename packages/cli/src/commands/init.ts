import { select, text, spinner, intro, outro, confirm } from "@clack/prompts";
import fs from "fs-extra";
import path from "path";
import picocolors from "picocolors";
import { getThemeTemplate } from "../utils/template";
import { scanProject } from "../scanners/project-scanner";
import {
  CONFIG_PATH,
  THEMES_API,
  REGISTRY_URL,
  CORE_DEPENDENCIES,
} from "../utils/constants";
import {
  getPackageManager,
  getProjectDependencies,
  installDependencies,
} from "../utils/package-manager";

export async function init() {
  intro(picocolors.cyan("LibravelUI Initialization"));

  const cwd = process.cwd();
  const projectPaths = await scanProject(cwd);

  const s = spinner();
  s.start("Fetching project configuration...");

  let themes: any[] = [];
  let registry: any = {};
  try {
    const [themesRes, registryRes] = await Promise.all([
      fetch(THEMES_API),
      fetch(REGISTRY_URL),
    ]);

    if (!themesRes.ok || !registryRes.ok)
      throw new Error("Failed to fetch data");

    themes = await themesRes.json();
    registry = await registryRes.json();
    s.stop("Configuration fetched successfully!");
  } catch (err) {
    s.stop(
      picocolors.red(
        "Could not connect to LibravelUI server. Make sure it's running on localhost:3000",
      ),
    );
    return;
  }

  const themeName = (await select({
    message: "Select your theme:",
    options: themes.map((t) => ({ value: t.name, label: t.label })),
  })) as string;
  if (typeof themeName !== "string") return;

  const iconLibrary = (await select({
    message: "Select icon library:",
    options: [
      { value: "lucide", label: "Lucide" },
      { value: "radix", label: "Radix" },
    ],
  })) as string;
  if (typeof iconLibrary !== "string") return;

  const defaultCssPath = projectPaths.defaultCssPath.replace(/\\/g, "/");

  const cssPath = (await text({
    message: "Where is your global CSS file located?",
    placeholder: defaultCssPath,
    initialValue: defaultCssPath,
  })) as string;
  if (typeof cssPath !== "string") return;

  const registryDeps = registry["utils"]?.dependencies || [];
  const allTargetDeps = [...new Set([...CORE_DEPENDENCIES, ...registryDeps])];

  if (allTargetDeps.length > 0) {
    const { dependencies: existingDeps, devDependencies: existingDevDeps } =
      await getProjectDependencies(cwd);

    const missingDeps = allTargetDeps.filter(
      (dep: string) => !existingDeps[dep] && !existingDevDeps[dep],
    );

    if (missingDeps.length > 0) {
      console.log(
        picocolors.cyan(`Dependencies needed: ${missingDeps.join(", ")}`),
      );

      const shouldInstall = (await confirm({
        message: "Would you like to install the required dependencies?",
        initialValue: true,
      })) as boolean;

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

  s.start("Generating configuration...");

  try {
    const selectedTheme = themes.find((t) => t.name === themeName);
    if (!selectedTheme) throw new Error("Theme not found");

    const cssContent = getThemeTemplate(
      selectedTheme.cssVars.light,
      selectedTheme.cssVars.dark,
      selectedTheme.radius,
      selectedTheme.fontUrl || [],
    );

    await fs.ensureDir(path.dirname(path.resolve(cwd, cssPath)));
    await fs.writeFile(path.resolve(cwd, cssPath), cssContent);

    await fs.ensureDir(path.resolve(cwd, projectPaths.componentsDir));
    await fs.ensureDir(path.resolve(cwd, projectPaths.libDir));
    await fs.ensureDir(path.resolve(cwd, projectPaths.hooksDir));

    const getAlias = (dir: string) => {
      const normalized = dir.replace(/\\/g, "/");
      const base = projectPaths.baseDir.replace(/\\/g, "/");
      if (base !== "." && normalized.startsWith(base + "/")) {
        return `@/${normalized.slice(base.length + 1)}`;
      }
      return `@/${normalized}`;
    };

    const config = {
      theme: themeName,
      tailwind: {
        config: "",
        css: cssPath,
        cssVariables: true,
      },
      aliases: {
        components: getAlias(projectPaths.componentsDir),
        utils: getAlias(projectPaths.utilsDir),
        ui: `${getAlias(projectPaths.componentsDir)}/ui`,
        lib: getAlias(projectPaths.libDir),
        hooks: getAlias(projectPaths.hooksDir),
      },
      iconLibrary: iconLibrary,
    };
    await fs.writeJSON(path.resolve(cwd, CONFIG_PATH), config, { spaces: 2 });

    s.stop("Theme and configuration saved!");
    outro(
      picocolors.green(
        "Initialization successful! Enjoy building with LibravelUI.",
      ),
    );
  } catch (err) {
    s.stop(picocolors.red("Initialization failed"));
    console.error(err);
  }
}
