import fs from "fs-extra";
import path from "path";

export interface ProjectPaths {
  isSrcDir: boolean;
  isLaravel: boolean;
  baseDir: string;
  componentsDir: string;
  libDir: string;
  hooksDir: string;
  utilsDir: string;
  appDir: string;
  defaultCssPath: string;
}

export async function scanProject(cwd: string): Promise<ProjectPaths> {
  const isSrcDir = await fs.pathExists(path.resolve(cwd, "src"));
  const isLaravel = await fs.pathExists(path.resolve(cwd, "artisan"));

  let baseDir = ".";
  let appDir = "app";
  let defaultCssPath = "app/globals.css";

  if (isSrcDir) {
    baseDir = "src";
    appDir = "src/app";
    defaultCssPath = "src/app/globals.css";
  } else if (isLaravel) {
    baseDir = "resources/js";
    appDir = "resources/css";
    defaultCssPath = "resources/css/app.css";
  }

  return {
    isSrcDir,
    isLaravel,
    baseDir,
    componentsDir: path.join(baseDir, "components"),
    libDir: path.join(baseDir, "lib"),
    hooksDir: path.join(baseDir, "hooks"),
    utilsDir: path.join(baseDir, "lib/utils"),
    appDir,
    defaultCssPath,
  };
}
