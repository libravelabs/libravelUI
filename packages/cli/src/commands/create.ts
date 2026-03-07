import { spinner } from "@clack/prompts";
import fs from "fs-extra";
import path from "path";
import picocolors from "picocolors";
import { FRAMEWORK_LABELS } from "../constants/config";
import { resolveFramework } from "../frameworks/resolve-framework";
import { promptProjectName } from "../utils/prompt-project-name";
import { cloneStarter } from "../utils/clone-starter";
import { detectPackageManager } from "../utils/detect-package-manager";
import { installDependencies } from "../utils/install-dependencies";

export async function create(
  initialProjectName: string | undefined,
  options: { next?: boolean; vite?: boolean },
) {
  const projectName = initialProjectName || (await promptProjectName());
  const framework = await resolveFramework(options);
  const packageManager = detectPackageManager();

  const cwd = process.cwd();
  const targetDir = path.resolve(cwd, projectName);

  if (fs.existsSync(targetDir)) {
    console.error(
      picocolors.red(`\nError: Directory ${projectName} already exists.`),
    );
    process.exit(1);
  }

  console.log("");
  console.log(picocolors.green(`✔ Creating project ${projectName}`));

  const s = spinner();

  try {
    const label = FRAMEWORK_LABELS[framework];

    s.start(`Downloading ${label} starter`);
    await cloneStarter(framework, projectName);
    s.stop(picocolors.green(`✔ Downloading ${label} starter`));

    s.start(`Installing dependencies`);
    await installDependencies(targetDir, packageManager);
    s.stop(picocolors.green(`✔ Installing dependencies`));

    console.log(`\n${picocolors.green("Success!")}\n`);
    console.log("Next steps:\n");
    console.log(picocolors.cyan(`cd ${projectName}`));

    // Suggest the actual package manager start commands
    const runner = packageManager === "npm" ? "npm run" : packageManager;
    console.log(picocolors.cyan(`${packageManager} install`));
    console.log(picocolors.cyan(`${runner} dev\n`));
  } catch (error) {
    s.stop(picocolors.red("Failed to create project"));
    console.error(error);
    process.exit(1);
  }
}
