import fs from "fs";
import path from "path";
import { getComponentDocs } from "../lib/registry-docs";

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, "src");
const OUTPUT_REGISTRY = path.join(ROOT, "public/registry.json");
const OUTPUT_RUNTIME = path.join(SRC_DIR, "generated/runtime-registry.ts");

const CONFIG = {
  registry: {
    output: OUTPUT_REGISTRY,
    runtimeOutput: OUTPUT_RUNTIME,
  },
  files: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
    ignoredPatterns: [".test.", ".spec.", "__tests__", ".stories."],
    ignoredDirectories: [".next", ".git", "node_modules", "generated"],
  },
  sources: {
    components: {
      root: "components",
      runtime: true,
      docs: true,
    },
    blocks: {
      root: "app/blocks",
      previewBase: "/blocks",
      entryCandidates: ["page.tsx", "page.ts", "page.jsx", "page.js"],
    },
  },
} as const;

type RegistryFile = {
  path: string;
  code: string;
};

type RegistryEntry = {
  name: string;
  type: "registry:file" | "registry:block";
  docs: unknown[];
  files: RegistryFile[];
  preview?: string;
  previewEntry?: string;
};

type Registry = Record<string, RegistryEntry>;

type RegistryIndexEntry = {
  path: string;
  name: string;
  url: string;
};

type RegistryIndex = Record<string, Record<string, RegistryIndexEntry>>;

function walk(dir: string, result: string[] = []): string[] {
  if (!fs.existsSync(dir)) return result;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (CONFIG.files.ignoredDirectories.includes(entry.name as never)) continue;

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath, result);
      continue;
    }

    result.push(fullPath);
  }

  return result;
}

function isValidFile(file: string) {
  const ext = path.extname(file);
  if (!CONFIG.files.extensions.includes(ext as never)) return false;
  return !CONFIG.files.ignoredPatterns.some((p) => file.includes(p));
}

function hasDefaultExport(code: string) {
  return /export\s+default\s+/m.test(code);
}

function readCode(filePath: string) {
  return fs.readFileSync(filePath, "utf8");
}

function toSrcRelative(filePath: string) {
  return path.relative(SRC_DIR, filePath).replace(/\\/g, "/");
}

function buildComponents(
  files: string[],
  registry: Registry,
  runtimeEntries: string[],
  indexData: RegistryIndex,
) {
  for (const filePath of files) {
    if (!isValidFile(filePath)) continue;

    const relative = path.relative(SRC_DIR, filePath);
    const key = relative.replace(/\.(tsx|ts|jsx|js)$/, "").replace(/\\/g, "/");
    const importPath = "@/" + key;
    const code = fs.readFileSync(filePath, "utf8");

    const isComponent =
      relative.startsWith("components") || relative.startsWith("components\\");

    registry[key] = {
      name: path.basename(key),
      type: "registry:file",
      docs:
        isComponent && filePath.endsWith(".tsx")
          ? getComponentDocs(filePath)
          : [],
      files: [{ path: toSrcRelative(filePath), code }],
    };

    if (isComponent && hasDefaultExport(code)) {
      let entryMetadata = "";

      if (key.startsWith("components/examples/")) {
        const parts = key.split("/");
        const section = parts[2];
        const componentName = parts[3];

        if (section && componentName) {
          const cleanName = componentName
            .split("-")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" ");

          const docUrl = `/docs/components/${section}/${componentName}`;

          entryMetadata = `,\n    name: "${cleanName}",\n    url: "${docUrl}",\n    section: "${section}"`;
        }
      }

      runtimeEntries.push(`"${key}": {
    Component: dynamic(() => import("${importPath}")),
    module: () => import("${importPath}")${entryMetadata}
  }`);

      if (key.startsWith("components/examples/")) {
        const parts = key.split("/");
        const section = parts[2];
        const componentName = parts[3];

        if (section && componentName && indexData[section]) {
          const current = indexData[section][componentName];

          const isBetter =
            !current ||
            (key.includes("basic") && !current.path.includes("basic")) ||
            (key.includes("demo") &&
              !current.path.includes("demo") &&
              !current.path.includes("basic"));

          if (isBetter) {
            indexData[section][componentName] = {
              path: key,
              name: componentName
                .split("-")
                .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                .join(" "),
              url: `/docs/components/${section}/${componentName}`,
            };
          }
        }
      }
    }
  }
}

function findBlockRoots() {
  const source = CONFIG.sources.blocks;
  const rootDir = path.join(SRC_DIR, source.root);
  const roots = new Set<string>();

  for (const filePath of walk(rootDir)) {
    const fileName = path.basename(filePath);

    if (!source.entryCandidates.includes(fileName as never)) continue;

    roots.add(path.dirname(filePath));
  }

  return [...roots];
}

function resolveBlockEntry(blockRoot: string) {
  for (const candidate of CONFIG.sources.blocks.entryCandidates) {
    const candidatePath = path.join(blockRoot, candidate);
    if (fs.existsSync(candidatePath)) return candidate;
  }
  return undefined;
}

function collectFiles(dir: string): RegistryFile[] {
  return walk(dir)
    .filter(isValidFile)
    .map((filePath) => ({
      path: toSrcRelative(filePath),
      code: readCode(filePath),
    }));
}

function buildBlocks(registry: Registry) {
  const source = CONFIG.sources.blocks;
  const blocksRoot = path.join(SRC_DIR, source.root);

  if (!fs.existsSync(blocksRoot)) return;

  const roots = findBlockRoots();

  for (const root of roots) {
    const relativeRoot = path.relative(blocksRoot, root).replace(/\\/g, "/");
    const key = `blocks/${relativeRoot}`;

    registry[key] = {
      name: path.basename(root),
      type: "registry:block",
      preview: `${source.previewBase}/${relativeRoot}`,
      previewEntry: resolveBlockEntry(root),
      docs: [],
      files: collectFiles(root),
    };
  }
}

async function buildRegistry() {
  console.log("Building registry...");

  const registry: Registry = {};
  const runtimeEntries: string[] = [];
  const indexData: RegistryIndex = {
    core: {},
    motion: {},
    blocks: {},
  };

  const files = walk(SRC_DIR);

  buildComponents(files, registry, runtimeEntries, indexData);
  buildBlocks(registry);

  const indexEntries = Object.entries(indexData).map(([section, items]) => {
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

  fs.mkdirSync(path.dirname(CONFIG.registry.output), { recursive: true });
  fs.mkdirSync(path.dirname(CONFIG.registry.runtimeOutput), {
    recursive: true,
  });

  fs.writeFileSync(CONFIG.registry.output, JSON.stringify(registry, null, 2));

  const runtimeFile = `import dynamic from "next/dynamic";

export const runtimeRegistry = {
${runtimeEntries.join(",\n")}
} as const;

export const registryIndex = {
${indexEntries.join(",\n")}
} as const;

export type RuntimeRegistryKey = keyof typeof runtimeRegistry;
`;

  fs.writeFileSync(CONFIG.registry.runtimeOutput, runtimeFile);

  console.log("Registry and Index built successfully!");
}

async function main() {
  try {
    await buildRegistry();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

main();
