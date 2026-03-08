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
  AUTO_INSTALL_COMPONENTS,
} from "../constants";
import {
  getPackageManager,
  getProjectDependencies,
  installDependencies,
} from "../utils/package-manager";
import { resolveRegistryPath } from "../utils/path-resolver";
import { MESSAGES } from "../constants";
import { transformImports } from "../utils/transformers";

export async function init() {
  intro(picocolors.cyan(MESSAGES.INIT.INTRO));

  const cwd = process.cwd();
  const projectPaths = await scanProject(cwd);

  const s = spinner();
  s.start(MESSAGES.INIT.FETCHING_CONFIG);

  let themes: any[] = [];
  let registry: any = {};
  try {
    const [themesRes, registryRes] = await Promise.all([
      fetch(THEMES_API),
      fetch(REGISTRY_URL),
    ]);

    if (!themesRes.ok || !registryRes.ok)
      throw new Error(MESSAGES.INIT.FAILED_FETCH_DATA);

    themes = await themesRes.json();
    registry = await registryRes.json();
    s.stop(MESSAGES.INIT.CONFIG_FETCHED);
  } catch (err) {
    s.stop(picocolors.red(MESSAGES.ERRORS.CONNECTION_FAILED));
    return;
  }

  const themeName = (await select({
    message: MESSAGES.INIT.THEME_SELECT,
    options: themes.map((t) => ({ value: t.name, label: t.label })),
  })) as string;
  if (typeof themeName !== "string") return;

  const defaultCssPath = projectPaths.defaultCssPath.replace(/\\/g, "/");

  const cssPath = (await text({
    message: MESSAGES.INIT.CSS_PATH_PROMPT,
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
        picocolors.cyan(MESSAGES.INIT.DEPS_NEEDED(missingDeps.join(", "))),
      );

      const shouldInstall = (await confirm({
        message: MESSAGES.INIT.INSTALL_DEPS_PROMPT,
        initialValue: true,
      })) as boolean;

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

  s.start(MESSAGES.INIT.GENERATING_CONFIG);

  try {
    const selectedTheme = themes.find((t) => t.name === themeName);
    if (!selectedTheme) throw new Error(MESSAGES.INIT.THEME_NOT_FOUND);

    const cssContent = getThemeTemplate(
      selectedTheme.cssVars.light,
      selectedTheme.cssVars.dark,
      selectedTheme.radius,
      selectedTheme.fontUrl || [],
    );

    await fs.ensureDir(path.dirname(path.resolve(cwd, cssPath)));
    await fs.writeFile(path.resolve(cwd, cssPath), cssContent + "\n", {
      encoding: "utf8",
    });

    await fs.ensureDir(path.resolve(cwd, projectPaths.componentsDir));
    await fs.ensureDir(path.resolve(cwd, projectPaths.libDir));
    await fs.ensureDir(path.resolve(cwd, projectPaths.hooksDir));

    for (const componentName of AUTO_INSTALL_COMPONENTS) {
      const component = registry[componentName];
      if (!component) {
        console.warn(
          picocolors.yellow(MESSAGES.ADD.COMPONENT_NOT_FOUND(componentName)),
        );
        continue;
      }

      for (const file of component.files) {
        const targetPath = resolveRegistryPath(file.path, projectPaths, cwd);
        await fs.ensureDir(path.dirname(targetPath));

        const content = file.content || file.code;
        const transformedContent = transformImports(content, projectPaths);
        await fs.writeFile(targetPath, transformedContent, {
          encoding: "utf8",
        });
      }
    }

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
    };
    await fs.writeJSON(path.resolve(cwd, CONFIG_PATH), config, { spaces: 2 });

    s.stop(MESSAGES.INIT.THEME_SAVED);
    outro(picocolors.green(MESSAGES.INIT.SUCCESS));
  } catch (err) {
    s.stop(picocolors.red(MESSAGES.INIT.FAILED));
    console.error(err);
  }
}
