import fs from "fs";
import path from "path";
import { CONFIG, SRC_DIR } from "./config";
import {
  BlockCategory,
  BlockMetaItem,
  BlockVariant,
  BlocksMeta,
  BlocksRegistry,
} from "./types";
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

  return JSON.parse(fs.readFileSync(metaPath, "utf8")) as BlocksMeta;
}

export function buildBlocks(): BlocksRegistry {
  const meta = readMeta();
  const blocksRoot = path.join(SRC_DIR, CONFIG.sources.blocks.root);

  return {
    ...meta,
    blocks: meta.blocks.map(
      (block): BlockCategory => ({
        ...block,
        variants: block.variants
          .map((variant) => {
            const variantDir = path.join(blocksRoot, block.slug, variant.slug);

            if (!fs.existsSync(variantDir)) return null;

            return {
              ...variant,
              type: "registry:block",
              previewEntry: resolveBlockEntry(variantDir),
              docs: [],
              files: collectFiles(variantDir),
            };
          })
          .filter(Boolean),
      }),
    ),
  };
}
