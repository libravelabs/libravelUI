import fs from "fs";
import path from "path";
import { getComponentDocs } from "../lib/registry-docs";

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, "src");
const OUTPUT_REGISTRY = path.join(ROOT, "public/registry.json");
const OUTPUT_RUNTIME = path.join(SRC_DIR, "generated/runtime-registry.ts");

type Registry = Record<string, any>;

function walk(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];

  let results: string[] = [];
  const list = fs.readdirSync(dir);

  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      results = results.concat(walk(filePath));
    } else {
      results.push(filePath);
    }
  }

  return results;
}

function isValidFile(file: string) {
  if (!/\.(tsx|ts|jsx|js)$/.test(file)) return false;

  if (
    file.includes(".test.") ||
    file.includes(".spec.") ||
    file.includes("__tests__") ||
    file.includes(".stories.") ||
    file.includes("layout.tsx") ||
    file.includes("page.tsx")
  ) {
    return false;
  }

  return true;
}

function hasDefaultExport(code: string) {
  return /export\s+default\s+/m.test(code);
}

async function buildRegistry() {
  console.log("Building registry...");

  const registry: Registry = {};
  const runtimeEntries: string[] = [];
  const indexData: Record<
    string,
    Record<string, { path: string; name: string; url: string }>
  > = {
    core: {},
    motion: {},
    blocks: {},
  };

  const files = walk(SRC_DIR);

  for (const filePath of files) {
    if (!isValidFile(filePath)) continue;

    const relative = path.relative(SRC_DIR, filePath);
    const key = relative.replace(/\.(tsx|ts|jsx|js)$/, "").replace(/\\/g, "/");
    const importPath = "@/" + key;
    const code = fs.readFileSync(filePath, "utf-8");

    console.log("Processing:", key);

    const isComponent =
      relative.startsWith("components") || relative.startsWith("components\\");

    registry[key] = {
      name: path.basename(key),
      type: "registry:file",
      docs:
        isComponent && filePath.endsWith(".tsx")
          ? getComponentDocs(filePath)
          : [],
      files: [{ path: relative.replace(/\\/g, "/"), code }],
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

  fs.mkdirSync(path.dirname(OUTPUT_REGISTRY), { recursive: true });
  fs.mkdirSync(path.dirname(OUTPUT_RUNTIME), { recursive: true });

  fs.writeFileSync(OUTPUT_REGISTRY, JSON.stringify(registry, null, 2));

  const runtimeFile = `import dynamic from "next/dynamic";

export const runtimeRegistry = {
${runtimeEntries.join(",\n")}
} as const;

export const registryIndex = {
${indexEntries.join(",\n")}
} as const;

export type RuntimeRegistryKey = keyof typeof runtimeRegistry;
`;

  fs.writeFileSync(OUTPUT_RUNTIME, runtimeFile);

  console.log("Registry and Index built successfully!");
}

buildRegistry().catch((err) => {
  console.error(err);
  process.exit(1);
});
