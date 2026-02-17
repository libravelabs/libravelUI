import fs from "fs-extra";
import path from "path";

export interface ProjectPaths {
  isSrcDir: boolean;
  isLaravel: boolean;
  isVite: boolean;
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
  const isVite =
    (await fs.pathExists(path.resolve(cwd, "vite.config.ts"))) ||
    (await fs.pathExists(path.resolve(cwd, "vite.config.js"))) ||
    (await fs.pathExists(path.resolve(cwd, "vite.config.mjs")));

  let baseDir = ".";
  let appDir = "app";
  let defaultCssPath = "app/globals.css";

  if (isLaravel) {
    // Laravel has priority over other detections
    baseDir = "resources/js";
    appDir = "resources/css";
    defaultCssPath = "resources/css/app.css";
  } else if (isVite) {
    // Vite projects typically use src directory
    baseDir = "src";
    appDir = "src";
    defaultCssPath = "src/index.css";
  } else if (isSrcDir) {
    // Generic src-based projects (Next.js, etc.)
    baseDir = "src";
    appDir = "src/app";
    defaultCssPath = "src/app/globals.css";
  }

  return {
    isSrcDir,
    isLaravel,
    isVite,
    baseDir,
    componentsDir: path.join(baseDir, "components"),
    libDir: path.join(baseDir, "lib"),
    hooksDir: path.join(baseDir, "hooks"),
    utilsDir: path.join(baseDir, "lib/utils"),
    appDir,
    defaultCssPath,
  };
}
