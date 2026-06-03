import fs from "fs";
import path from "path";
import { CONFIG, SRC_DIR } from "./config";
import { BlockMeta, BlocksRegistry, Registry, RegistryEntry } from "./types";
import { isValidFile, readCode, toSrcRelative, walk } from "./utils";

function collectFiles(dir: string) {
  return walk(dir)
    .filter(isValidFile)
    .map((filePath) => ({
      path: toSrcRelative(filePath),
      code: readCode(filePath),
    }));
}

function resolveBlockEntry(blockRoot: string) {
  for (const candidate of CONFIG.sources.blocks.entryCandidates) {
    const candidatePath = path.join(blockRoot, candidate);

    if (fs.existsSync(candidatePath)) {
      return candidate;
    }
  }

  return undefined;
}

function readMeta() {
  const metaPath = path.join(SRC_DIR, CONFIG.sources.blocks.root, "meta.json");

  return JSON.parse(fs.readFileSync(metaPath, "utf8")) as Record<
    string,
    BlockMeta
  >;
}

export function buildBlocks() {
  const meta = readMeta();

  const blocks: BlocksRegistry = {};

  const blocksRoot = path.join(SRC_DIR, CONFIG.sources.blocks.root);

  for (const [category, config] of Object.entries(meta)) {
    const variants: RegistryEntry[] = [];

    for (const variant of config.variants) {
      const variantDir = path.join(blocksRoot, category, variant);

      if (!fs.existsSync(variantDir)) {
        continue;
      }

      variants.push({
        name: variant,

        type: "registry:block",

        preview: `/blocks/${category}/${variant}`,

        previewEntry: resolveBlockEntry(variantDir),

        docs: [],

        files: collectFiles(variantDir),
      });
    }

    blocks[category] = {
      title: config.title,
      description: config.description,
      variants,
    };
  }

  return blocks;
}
