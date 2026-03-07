import { execa } from "execa";
import { PackageManager } from "./detect-package-manager";

export async function installDependencies(
  targetDir: string,
  packageManager: PackageManager,
): Promise<void> {
  await execa(packageManager, ["install"], { cwd: targetDir, stdio: "ignore" });
}
