import path from "path";

const ROOT = process.cwd();

export const SRC_DIR = path.join(ROOT, "src");

export const CONFIG = {
  registry: {
    output: path.join(ROOT, "public/registry.json"),

    runtimeOutput: path.join(SRC_DIR, "generated/runtime-registry.ts"),
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
