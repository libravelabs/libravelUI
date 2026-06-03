import fs from "fs";
import path from "path";
import { CONFIG, SRC_DIR } from "./config";

export function walk(dir: string, result: string[] = []): string[] {
  if (!fs.existsSync(dir)) {
    return result;
  }

  const entries = fs.readdirSync(dir, {
    withFileTypes: true,
  });

  for (const entry of entries) {
    if (CONFIG.files.ignoredDirectories.includes(entry.name as never)) {
      continue;
    }

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath, result);
      continue;
    }

    result.push(fullPath);
  }

  return result;
}

export function isValidFile(file: string) {
  const ext = path.extname(file);

  if (!CONFIG.files.extensions.includes(ext as never)) {
    return false;
  }

  return !CONFIG.files.ignoredPatterns.some((pattern) =>
    file.includes(pattern),
  );
}

export function readCode(filePath: string) {
  return fs.readFileSync(filePath, "utf8");
}

export function toSrcRelative(filePath: string) {
  return path.relative(SRC_DIR, filePath).replace(/\\/g, "/");
}

export function hasDefaultExport(code: string) {
  return /export\s+default\s+/m.test(code);
}

export function buildRuntimeFile(
  runtimeEntries: string[],
  indexEntries: string[],
) {
  return `import dynamic from "next/dynamic";

export const runtimeRegistry = {
${runtimeEntries.join(",\n")}
} as const;

export const registryIndex = {
${indexEntries.join(",\n")}
} as const;

export type RuntimeRegistryKey =
  keyof typeof runtimeRegistry;
`;
}

export function buildIndexEntries(indexData: RegistryIndex) {
  return Object.entries(indexData).map(([section, items]) => {
    const componentLines = Object.values(items)
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(
        (item) =>
          `      { name: "${item.name}", path: "${item.path}", url: "${item.url}" }`,
      )
      .join(",\n");

    return `  ${section}: [
${componentLines}
  ]`;
  });
}
