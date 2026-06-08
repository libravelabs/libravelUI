// scripts/generate-registry.ts

import fs from "node:fs/promises";
import path from "node:path";

interface RegistryFile {
  name: string;
  path: string;
  ext: string;
  size: number;
  lastModified: string;
  code: string;
}

async function getFiles(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        return getFiles(fullPath);
      }

      return fullPath;
    }),
  );

  return files.flat();
}

async function main() {
  const srcDir = path.join(process.cwd(), "src");

  const allFiles = await getFiles(srcDir);

  const allowedExts = new Set([".ts", ".tsx", ".js", ".jsx"]);

  const registryFiles: RegistryFile[] = await Promise.all(
    allFiles
      .filter((file) => allowedExts.has(path.extname(file)))
      .map(async (file) => {
        const [stat, code] = await Promise.all([
          fs.stat(file),
          fs.readFile(file, "utf8"),
        ]);

        return {
          name: path.basename(file),
          path: path.relative(process.cwd(), file).replace(/\\/g, "/"),
          ext: path.extname(file),
          size: stat.size,
          lastModified: stat.mtime.toISOString(),
          code,
        };
      }),
  );

  const registry = {
    files: registryFiles,
  };

  await fs.writeFile(
    "debug-registry.json",
    JSON.stringify(registry, null, 2),
    "utf8",
  );

  console.log(`Generated ${registryFiles.length} files`);
}

main().catch(console.error);
