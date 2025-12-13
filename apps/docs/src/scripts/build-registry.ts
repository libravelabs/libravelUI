import fs from "fs";
import path from "path";
import { fetchComponentSource, SourceResponse } from "../lib/source-fetcher";
import { getComponentDocs } from "../lib/registry-docs";
import { cleanCode } from "../lib/code-utils";

const COMPONENT_ROOT = path.join(process.cwd(), "src/components/ui");
const OUTPUT_PATH = path.join(process.cwd(), "public/registry.json");
const SRC_ROOT = path.join(process.cwd(), "src");

function getAllComponents(dir: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);

  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat && stat.isDirectory()) {
      results = results.concat(getAllComponents(filePath));
    } else if (file.endsWith(".tsx")) {
      results.push(filePath);
    }
  });

  return results;
}

async function buildRegistry() {
  console.log("Building registry...");

  if (!fs.existsSync(COMPONENT_ROOT)) {
    console.error(`Component root not found: ${COMPONENT_ROOT}`);
    process.exit(1);
  }

  const registry: Record<string, SourceResponse> = {};
  const files = getAllComponents(COMPONENT_ROOT);

  for (const filePath of files) {
    const relativePath = path.relative(SRC_ROOT, filePath);
    const slug = relativePath.replace(/\.tsx$/, "").split(path.sep);
    const name = path.basename(filePath, ".tsx");

    if (name.startsWith("_")) continue;

    console.log(`Processing ${name} (${slug.join("/")})...`);
    try {
      const source = await fetchComponentSource(slug);
      const docs = getComponentDocs(filePath);

      if (source.files.length > 0) {
        source.files = source.files.map((file) => ({
          ...file,
          code: cleanCode(file.content),
        }));

        registry[name] = {
          ...source,
          docs,
        };
      }
    } catch (error) {
      console.error(`Failed to process ${name}:`, error);
    }
  }

  const EXAMPLES_ROOT = path.join(process.cwd(), "src/components/docs");
  if (fs.existsSync(EXAMPLES_ROOT)) {
    const exampleFiles = getAllComponents(EXAMPLES_ROOT);
    for (const filePath of exampleFiles) {
      const relativePath = path.relative(SRC_ROOT, filePath);
      const slug = relativePath.replace(/\.tsx$/, "").split(path.sep);

      const key = slug.join("/");
      console.log(`Processing example ${key}...`);
      try {
        const source = await fetchComponentSource(slug);

        if (source.files.length > 0) {
          source.files = source.files.map((file) => ({
            ...file,
            code: cleanCode(file.content),
          }));

          registry[key] = source;
        }
      } catch (error) {
        console.error(`Failed to process example ${key}:`, error);
      }
    }
  }

  const outputDir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(registry, null, 2));
  console.log(
    `Registry built with ${Object.keys(registry).length} components.`
  );
}

buildRegistry().catch((err) => {
  console.error(err);
  process.exit(1);
});
