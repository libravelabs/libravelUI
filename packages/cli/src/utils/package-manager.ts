import { execa } from "execa";
import fs from "fs-extra";
import path from "path";

export type PackageManager = "npm" | "pnpm" | "yarn" | "bun";

export async function getPackageManager(cwd: string): Promise<PackageManager> {
  if (await fs.pathExists(path.resolve(cwd, "pnpm-lock.yaml"))) return "pnpm";
  if (await fs.pathExists(path.resolve(cwd, "yarn.lock"))) return "yarn";
  if (await fs.pathExists(path.resolve(cwd, "bun.lockb"))) return "bun";
  if (await fs.pathExists(path.resolve(cwd, "bun.lock"))) return "bun";

  return "npm";
}

export async function installDependencies(
  dependencies: string[],
  cwd: string,
  packageManager: PackageManager,
  isDev = false,
) {
  if (dependencies.length === 0) return;

  const args = [];

  if (packageManager === "npm") {
    args.push("install", isDev ? "--save-dev" : "--save");
  } else if (packageManager === "yarn") {
    args.push("add", isDev ? "--dev" : "");
  } else if (packageManager === "pnpm") {
    args.push("add", isDev ? "-D" : "");
  } else if (packageManager === "bun") {
    args.push("add", isDev ? "-d" : "");
  }

  const cleanArgs = args.filter(Boolean);

  await execa(packageManager, [...cleanArgs, ...dependencies], {
    cwd,
    stdio: "inherit",
  });
}

export async function getProjectDependencies(cwd: string) {
  const packageJsonPath = path.resolve(cwd, "package.json");
  if (!(await fs.pathExists(packageJsonPath))) {
    return { dependencies: {}, devDependencies: {} };
  }

  const packageJson = await fs.readJSON(packageJsonPath);
  return {
    dependencies: packageJson.dependencies || {},
    devDependencies: packageJson.devDependencies || {},
  };
}
