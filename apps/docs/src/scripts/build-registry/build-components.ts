import fs from "fs";
import { Registry, RegistryIndex } from "./types";
import { hasDefaultExport, isValidFile, toSrcRelative } from "./utils";
import { getComponentDocs } from "@/lib/registry-docs";

export function buildComponents(
  files: string[],
  registry: Registry,
  runtimeEntries: string[],
  indexData: RegistryIndex,
) {
  for (const filePath of files) {
    if (!isValidFile(filePath)) {
      continue;
    }

    const relative = toSrcRelative(filePath);

    const key = relative.replace(/\.(tsx|ts|jsx|js)$/, "").replace(/\\/g, "/");

    const importPath = "@/" + key;

    const code = fs.readFileSync(filePath, "utf8");

    const isComponent = relative.startsWith("components/");

    registry[key] = {
      name: key.split("/").pop() ?? key,

      type: "registry:file",

      docs:
        isComponent && filePath.endsWith(".tsx")
          ? getComponentDocs(filePath)
          : [],

      files: [
        {
          path: relative,
          code,
        },
      ],
    };

    if (!isComponent || !hasDefaultExport(code)) {
      continue;
    }

    let entryMetadata = "";

    if (key.startsWith("components/examples/")) {
      const parts = key.split("/");

      const section = parts[2];
      const componentName = parts[3];

      if (section && componentName) {
        const cleanName = componentName
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

        const docUrl = `/docs/components/${section}/${componentName}`;

        entryMetadata = `,
    name: "${cleanName}",
    url: "${docUrl}",
    section: "${section}"`;
      }
    }

    runtimeEntries.push(`"${key}": {
    Component: dynamic(() => import("${importPath}")),
    module: () => import("${importPath}")${entryMetadata}
  }`);

    if (!key.startsWith("components/examples/")) {
      continue;
    }

    const parts = key.split("/");

    const section = parts[2];
    const componentName = parts[3];

    if (!section || !componentName || !indexData[section]) {
      continue;
    }

    const current = indexData[section][componentName];

    const isBetter =
      !current ||
      (key.includes("basic") && !current.path.includes("basic")) ||
      (key.includes("demo") &&
        !current.path.includes("demo") &&
        !current.path.includes("basic"));

    if (!isBetter) {
      continue;
    }

    indexData[section][componentName] = {
      path: key,

      name: componentName
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),

      url: `/docs/components/${section}/${componentName}`,
    };
  }
}
