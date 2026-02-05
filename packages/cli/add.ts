import { confirm, intro, outro, spinner, multiselect } from "@clack/prompts";
import fs from "fs-extra";
import path from "path";
import picocolors from "picocolors";

import { REGISTRY_URL, CRITICAL_DIRS } from "./constants";

export async function add(components?: string[], options?: { all?: boolean }) {
  intro(picocolors.cyan("LibravelUI Component Adder"));

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
    registry[key].type?.startsWith("registry:"),
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

  s.start("Processing components and dependencies...");

  try {
    const installed = new Set<string>();
    for (const name of selected) {
      await installComponent(name, registry, installed);
    }
    s.stop("Processing complete!");
    outro(
      picocolors.green(
        `Successfully installed: ${Array.from(installed).join(", ")}`,
      ),
    );
  } catch (err) {
    s.stop(picocolors.red("Installation failed"));
    console.error(err);
  }
}

async function installComponent(
  name: string,
  registry: any,
  installed: Set<string>,
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

  // Handle registry dependencies recursively
  if (component.registryDependencies) {
    for (const dep of component.registryDependencies) {
      await installComponent(dep, registry, installed);
    }
  }

  // Install component files
  for (const file of component.files) {
    const normalizedPath = file.path.replace(/\\/g, "/");
    const targetPath = path.join(process.cwd(), normalizedPath);

    // Prompt for confirmation if it's a critical shared file that already exists
    const isCriticalFile = CRITICAL_DIRS.some((dir) =>
      normalizedPath.startsWith(dir),
    );

    if (fs.existsSync(targetPath) && isCriticalFile) {
      const shouldOverwrite = await confirm({
        message: `File "${normalizedPath}" already exists. Overwrite?`,
        initialValue: false,
      });
      if (!shouldOverwrite) {
        console.log(picocolors.dim(`Skipping "${normalizedPath}"`));
        continue;
      }
    }

    await fs.ensureDir(path.dirname(targetPath));
    const content = file.code || file.content;

    // We write the code as is from the registry
    await fs.writeFile(targetPath, content);
  }

  installed.add(name);
}
