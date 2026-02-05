import fs from "fs";
import path from "path";
import { fetchComponentSource, SourceResponse } from "../lib/source-fetcher";
import { getComponentDocs } from "../lib/registry-docs";
import { cleanCode } from "../lib/code-utils";

const COMPONENT_ROOT = path.join(process.cwd(), "src/components/ui");
const HOOKS_ROOT = path.join(process.cwd(), "src/hooks");
const OUTPUT_PATH = path.join(process.cwd(), "public/registry.json");
const SRC_ROOT = path.join(process.cwd(), "src");
const CSS_PATH = path.join(process.cwd(), "src/app/libravel-ui.css");
const UTILS_PATH = path.join(process.cwd(), "src/lib/utils.ts");
const RENDER_PROPS_PATH = path.join(process.cwd(), "src/lib/render-props.ts");

function getComponentType(
  relativePath: string,
):
  | "registry:ui"
  | "registry:block"
  | "registry:example"
  | "registry:style"
  | "registry:hook" {
  if (relativePath.includes("blocks")) return "registry:block";
  if (relativePath.includes("hooks")) return "registry:hook";
  if (relativePath.endsWith(".css")) return "registry:style";
  return "registry:ui";
}

function getAllFiles(
  dir: string,
  extensions: string[] = [".tsx", ".ts"],
): string[] {
  let results: string[] = [];
  if (!fs.existsSync(dir)) return results;

  const list = fs.readdirSync(dir);

  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFiles(filePath, extensions));
    } else if (extensions.some((ext) => file.endsWith(ext))) {
      // Skip index files and private files
      if (file.startsWith("_")) return;
      results.push(filePath);
    }
  });

  return results;
}

async function buildRegistry() {
  console.log("Building registry...");

  const registry: Record<string, any> = {};

  // 1. Process Components (UI, Blocks, Motion)
  if (fs.existsSync(COMPONENT_ROOT)) {
    const files = getAllFiles(COMPONENT_ROOT, [".tsx"]);

    for (const filePath of files) {
      const relativePath = path.relative(SRC_ROOT, filePath);
      const slug = relativePath.replace(/\.tsx$/, "").split(path.sep);
      const name = path.basename(filePath, ".tsx");

      console.log(`Processing component: ${name}...`);
      try {
        const source = await fetchComponentSource(slug, name);
        const docs = getComponentDocs(filePath);

        if (source.files.length > 0) {
          source.files = source.files.map((file) => ({
            ...file,
            code: cleanCode(file.content),
          }));

          registry[name] = {
            name,
            type: getComponentType(relativePath),
            dependencies: source.dependencies,
            registryDependencies: source.registryDependencies,
            files: source.files,
            docs,
          };
        }
      } catch (error) {
        console.error(`Failed to process ${name}:`, error);
      }
    }
  }

  // 2. Process Hooks
  if (fs.existsSync(HOOKS_ROOT)) {
    const hookFiles = getAllFiles(HOOKS_ROOT, [".ts", ".tsx"]);
    for (const filePath of hookFiles) {
      const relativePath = path.relative(SRC_ROOT, filePath);
      const slug = relativePath.replace(/\.(ts|tsx)$/, "").split(path.sep);
      const name = path.basename(filePath).replace(/\.(ts|tsx)$/, "");

      console.log(`Processing hook: ${name}...`);
      try {
        const source = await fetchComponentSource(slug, name);

        if (source.files.length > 0) {
          source.files = source.files.map((file) => ({
            ...file,
            code: cleanCode(file.content),
          }));

          registry[name] = {
            name,
            type: "registry:hook",
            dependencies: source.dependencies,
            registryDependencies: source.registryDependencies,
            files: source.files,
          };
        }
      } catch (error) {
        console.error(`Failed to process hook ${name}:`, error);
      }
    }
  }

  // 3. Process Styles
  if (fs.existsSync(CSS_PATH)) {
    console.log("Processing global CSS...");
    const cssContent = fs.readFileSync(CSS_PATH, "utf8");
    registry["styles"] = {
      name: "styles",
      type: "registry:style",
      dependencies: [],
      registryDependencies: [],
      files: [
        {
          name: "libravel-ui.css",
          path: "app/libravel-ui.css",
          content: cssContent,
          code: cssContent,
        },
      ],
    };
  }

  // 4. Process Utils
  const utilsToProcess = [
    {
      name: "utils",
      path: UTILS_PATH,
      target: "lib/utils.ts",
      deps: ["clsx", "tailwind-merge"],
    },
    {
      name: "render-props",
      path: RENDER_PROPS_PATH,
      target: "lib/render-props.ts",
      deps: [],
    },
  ];

  for (const util of utilsToProcess) {
    if (fs.existsSync(util.path)) {
      console.log(`Processing util: ${util.name}...`);
      const content = fs.readFileSync(util.path, "utf8");
      registry[util.name] = {
        name: util.name,
        type: "registry:ui",
        dependencies: util.deps,
        registryDependencies: [],
        files: [
          {
            name: path.basename(util.path),
            path: util.target,
            content: content,
            code: cleanCode(content),
          },
        ],
      };
    }
  }

  // Note: We are REMOVING src/components/docs from the registry as per user request.
  // Documentation-only components should not be in the core registry.

  const outputDir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(registry, null, 2));
  console.log(`Registry built with ${Object.keys(registry).length} items.`);
}

buildRegistry().catch((err) => {
  console.error(err);
  process.exit(1);
});
