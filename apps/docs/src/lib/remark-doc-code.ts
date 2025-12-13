import { visit } from "unist-util-visit";
import fs from "fs";
import path from "path";
import type { Node, Parent } from "unist";

interface MdxJsxAttribute extends Node {
  type: "mdxJsxAttribute";
  name: string;
  value: string | number | boolean | null | undefined;
}

interface MdxJsxFlowElement extends Parent {
  type: "mdxJsxFlowElement";
  name: string | null;
  attributes: MdxJsxAttribute[];
}

interface SourceFile {
  name: string;
  content: string;
  path: string;
}

interface SourceResponse {
  files: SourceFile[];
  error?: string;
}

const REGISTRY_PATH = path.join(process.cwd(), "public/registry.json");
let registryCache: Record<string, SourceResponse> | null = null;

function getRegistry() {
  if (registryCache) return registryCache;

  try {
    if (fs.existsSync(REGISTRY_PATH)) {
      registryCache = JSON.parse(fs.readFileSync(REGISTRY_PATH, "utf8"));
    } else {
      console.warn("Registry not found at", REGISTRY_PATH);
      registryCache = {};
    }
  } catch (e) {
    console.error("Failed to load registry:", e);
    registryCache = {};
  }

  return registryCache;
}

export function remarkDocCode() {
  return (tree: Node) => {
    const registry = getRegistry();

    visit(tree, "mdxJsxFlowElement", (node: Node) => {
      const mdxNode = node as MdxJsxFlowElement;
      if (mdxNode.name !== "Example" && mdxNode.name !== "Installation") return;

      const nameAttr = mdxNode.attributes.find((attr) => attr.name === "name");
      if (!nameAttr) return;

      const name = String(nameAttr.value);

      const componentData = registry ? registry[name] : null;

      if (
        componentData &&
        componentData.files &&
        componentData.files.length > 0
      ) {
        let mainFile = componentData.files.find(
          (f) => f.name === `${name}.tsx` || f.name === `${name}.ts`
        );

        if (!mainFile) {
          mainFile = componentData.files[0];
        }

        if (mainFile) {
          const cleaned = cleanCode(mainFile.content);
          mdxNode.attributes.push({
            type: "mdxJsxAttribute",
            name: "code",
            value: cleaned,
            data: undefined,
            position: undefined,
          });
        }
      }
    });
  };
}

function cleanCode(code: string): string {
  let cleaned = code.trim();
  cleaned = cleaned.replace(/^["']use client["'];?\s*\n+/m, "");
  return cleaned;
}
