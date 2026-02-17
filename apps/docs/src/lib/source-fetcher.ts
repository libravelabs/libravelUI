import fs from "fs/promises";
import path from "path";
import { RegistryComponentDocs } from "./registry-docs";

const SRC_ROOT = path.join(process.cwd(), "src");
const COMPONENT_ROOT = path.join(process.cwd(), "src/components/ui");

export interface SourceFile {
  name: string;
  content: string;
  code?: string;
  path: string;
}

export interface SourceResponse {
  files: SourceFile[];
  docs?: RegistryComponentDocs[];
  dependencies: string[];
  registryDependencies: string[];
  type: "components:ui" | "components:block" | "components:example";
  error?: string;
}

function getRegistryNameFromPath(filePath: string): string | null {
  const relative = path.relative(COMPONENT_ROOT, filePath);
  if (relative.startsWith("..") || path.isAbsolute(relative)) return null;

  const parts = relative.split(path.sep);
  if (parts.length >= 2) {
    return parts[1].replace(/\.tsx$/, "");
  }
  return null;
}

async function resolveImportPath(
  currentDir: string,
  importPath: string,
): Promise<string | null> {
  let targetPath = "";

  if (importPath.startsWith("@/")) {
    targetPath = path.join(SRC_ROOT, importPath.replace("@/", ""));
  } else if (importPath.startsWith(".")) {
    targetPath = path.resolve(currentDir, importPath);
  } else {
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
  slug: string[],
  currentComponentName: string,
): Promise<SourceResponse> {
  const componentPath = path.join(SRC_ROOT, slug.join("/"));

  let type: SourceResponse["type"] = "components:ui";
  if (slug.includes("blocks")) type = "components:block";
  if (slug[0] === "components" && slug[1] === "docs")
    type = "components:example";

  const resolvedPath = path.resolve(componentPath);
  if (!resolvedPath.startsWith(SRC_ROOT)) {
    return {
      files: [],
      dependencies: [],
      registryDependencies: [],
      type,
      error: "Invalid path",
    };
  }

  let entryFile = resolvedPath;
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
    if (!found)
      return {
        files: [],
        dependencies: [],
        registryDependencies: [],
        type,
        error: "File not found",
      };
  }

  const files: SourceFile[] = [];
  const dependencies = new Set<string>();
  const registryDependencies = new Set<string>();
  const visited = new Set<string>();

  async function scan(filePath: string, isRoot: boolean) {
    if (visited.has(filePath)) return;
    visited.add(filePath);

    if (!isRoot) {
      const registryName = getRegistryNameFromPath(filePath);
      if (registryName && registryName !== currentComponentName) {
        registryDependencies.add(registryName);
      }
    }

    try {
      const content = await fs.readFile(filePath, "utf8");

      files.push({
        name: path.basename(filePath),
        path: path.relative(SRC_ROOT, filePath),
        content: content,
      });

      const imports = extractImports(content);

      for (const imp of imports) {
        if (imp.startsWith(".")) {
          const resolved = await resolveImportPath(path.dirname(filePath), imp);
          if (resolved) await scan(resolved, false);
        } else if (imp.startsWith("@/")) {
          const resolved = await resolveImportPath(path.dirname(filePath), imp);
          if (resolved) {
            await scan(resolved, false);
          }
        } else {
          if (!imp.startsWith("react") && !imp.startsWith("next")) {
            let dep = imp;

            // Handle scoped packages (e.g. @radix-ui/react-slot -> @radix-ui/react-slot)
            if (dep.startsWith("@")) {
              const parts = dep.split("/");
              if (parts.length >= 2) {
                dep = `${parts[0]}/${parts[1]}`;
              }
            } else {
              // Handle regular packages with subpaths (e.g. zustand/middleware -> zustand)
              const parts = dep.split("/");
              if (parts.length >= 1) {
                dep = parts[0];
              }
            }

            dependencies.add(dep);
          }
        }
      }
    } catch (e) {
      console.error(`Failed to read ${filePath}`, e);
    }
  }

  await scan(entryFile, true);

  return {
    files,
    dependencies: Array.from(dependencies),
    registryDependencies: Array.from(registryDependencies),
    type,
  };
}
