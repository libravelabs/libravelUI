import fs from "fs";
import path from "path";
import { fetchComponentSource } from "../lib/source-fetcher";
import { getComponentDocs } from "../lib/registry-docs";
import { cleanCode } from "../lib/code-utils";

const SRC_ROOT = path.join(process.cwd(), "src");
const OUTPUT_PATH = path.join(process.cwd(), "public/registry.json");

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
      if (
        file.startsWith("_") ||
        file.includes(".test.") ||
        file.includes(".spec.") ||
        file.includes("test")
      )
        return;
      results.push(filePath);
    }
  });

  return results;
}

async function buildRegistry() {
  console.log("Building smart registry...");

  const registry: Record<string, any> = {};

  const componentRoots = [
    path.join(process.cwd(), "src/components/ui"),
    path.join(process.cwd(), "src/components/theme"),
    path.join(process.cwd(), "src/components/examples"),
  ];

  for (const root of componentRoots) {
    if (fs.existsSync(root)) {
      const files = getAllFiles(root, [".tsx"]);

      for (const filePath of files) {
        const relativePath = path.relative(SRC_ROOT, filePath);
        const slug = relativePath.replace(/\.tsx$/, "").split(path.sep);
        const name = path.basename(filePath, ".tsx");

        const isExample = relativePath.startsWith(
          "components" + path.sep + "examples",
        );
        const registryKey = isExample ? slug.join("/") : name;

        if (name.includes("test") || name.includes("spec")) continue;
        if (name.includes(".") && !isExample) continue;

        console.log(`Processing component: ${registryKey}...`);
        try {
          const source = await fetchComponentSource(
            slug,
            isExample ? name : registryKey,
          );
          const docs = isExample ? undefined : getComponentDocs(filePath);

          if (source.files.length > 0) {
            registry[registryKey] = {
              name: isExample ? registryKey : name,
              type: isExample ? "components:example" : "registry:ui",
              dependencies: source.dependencies,
              registryDependencies: source.registryDependencies,
              files: source.files.map((f) => {
                const normalizedPath = f.path.replace(/\\/g, "/");
                return {
                  ...f,
                  path: normalizedPath.replace(
                    "components/app/partials",
                    "components/ui",
                  ),
                  code: cleanCode(f.content),
                };
              }),
              docs,
            };

            for (const file of source.files) {
              const rel = file.path.replace(/\\/g, "/");
              if (rel.startsWith("lib/") || rel.startsWith("hooks/")) {
                const depName = path.basename(rel).split(".")[0];
                if (!registry[depName]) {
                  const depSlug = rel.replace(/\.[^/.]+$/, "").split("/");
                  const depSource = await fetchComponentSource(
                    depSlug,
                    depName,
                  );

                  registry[depName] = {
                    name: depName,
                    type: rel.startsWith("hooks/")
                      ? "registry:hook"
                      : "registry:lib",
                    dependencies: depSource.dependencies,
                    registryDependencies: depSource.registryDependencies,
                    files: depSource.files.map((f) => ({
                      ...f,
                      path: f.path.replace(/\\/g, "/"),
                      code: cleanCode(f.content),
                    })),
                  };
                }
              }
            }
          }
        } catch (error) {
          console.error(`Failed to process ${name}:`, error);
        }
      }
    }
  }

  const outputDir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(registry, null, 2));
  console.log(
    `Registry built with ${Object.keys(registry).length} total items.`,
  );
}

buildRegistry().catch((err) => {
  console.error(err);
  process.exit(1);
});
