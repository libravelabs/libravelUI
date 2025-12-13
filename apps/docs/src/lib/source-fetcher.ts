import fs from "fs/promises";
import { existsSync, statSync } from "fs";
import path from "path";
import { RegistryComponentDocs } from "./registry-docs";

const COMPONENT_ROOT = path.join(process.cwd(), "src/components/ui");
const LIB_ROOT = path.join(process.cwd(), "src/lib");
const SRC_ROOT = path.join(process.cwd(), "src");

export interface SourceFile {
  name: string;
  content: string;
  code?: string;
  path: string;
}

export interface SourceResponse {
  files: SourceFile[];
  docs?: RegistryComponentDocs[];
  error?: string;
}

const MAX_DEPTH = 3;

async function resolveImportPath(
  currentDir: string,
  importPath: string
): Promise<string | null> {
  let targetPath = "";

  if (importPath.startsWith("@/")) {
    targetPath = path.join(SRC_ROOT, importPath.replace("@/", ""));
  } else if (importPath.startsWith(".")) {
    targetPath = path.resolve(currentDir, importPath);
  } else {
    return null;
  }

  const extensions = [".tsx", ".ts", ".jsx", ".js"];

  try {
    const stats = await fs.stat(targetPath);
    if (stats.isFile()) return targetPath;
  } catch {}

  for (const ext of extensions) {
    try {
      const stats = await fs.stat(targetPath + ext);
      if (stats.isFile()) return targetPath + ext;
    } catch {}
  }

  for (const ext of extensions) {
    const indexPath = path.join(targetPath, `index${ext}`);
    try {
      const stats = await fs.stat(indexPath);
      if (stats.isFile()) return indexPath;
    } catch {}
  }

  return null;
}

function extractImports(content: string): string[] {
  const imports: string[] = [];
  const regex = /import\s+(?:[\s\S]*?from\s+)?["']([^"']+)["']/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    imports.push(match[1]);
  }
  return imports;
}

export async function fetchComponentSource(
  slug: string[]
): Promise<SourceResponse> {
  const componentPath = path.join(SRC_ROOT, slug.join("/"));

  let entryFile = componentPath;
  let found = false;

  try {
    const stats = await fs.stat(entryFile);
    if (stats.isFile()) found = true;
  } catch {}

  if (!found) {
    const extensions = [".tsx", ".ts"];
    for (const ext of extensions) {
      try {
        const stats = await fs.stat(componentPath + ext);
        if (stats.isFile()) {
          entryFile = componentPath + ext;
          found = true;
          break;
        }
      } catch {}
    }
    if (!found) return { files: [], error: "File not found" };
  }

  const visited = new Set<string>();
  const files: SourceFile[] = [];

  async function scan(filePath: string, depth: number) {
    if (visited.has(filePath) || depth > MAX_DEPTH) return;
    visited.add(filePath);

    try {
      const content = await fs.readFile(filePath, "utf8");
      files.push({
        name: path.basename(filePath),
        path: path.relative(SRC_ROOT, filePath),
        content: content,
      });

      const imports = extractImports(content);
      const resolvePromises = imports.map((imp) =>
        resolveImportPath(path.dirname(filePath), imp)
      );
      const resolvedPaths = await Promise.all(resolvePromises);

      const scanPromises: Promise<void>[] = [];
      for (const resolved of resolvedPaths) {
        if (resolved && resolved.startsWith(SRC_ROOT)) {
          scanPromises.push(scan(resolved, depth + 1));
        }
      }
      await Promise.all(scanPromises);
    } catch (e) {
      console.error(`Failed to read ${filePath}`, e);
    }
  }

  await scan(entryFile, 0);

  return { files };
}
