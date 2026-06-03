import fs from "fs";
import path from "path";
import { CONFIG, SRC_DIR } from "./config";
import { walk, buildIndexEntries, buildRuntimeFile } from "./utils";
import { buildBlocks } from "./build-blocks";
import { buildComponents } from "./build-components";
import { Registry, RegistryIndex } from "./types";

async function buildRegistry() {
  console.log("Building registry...");

  const registry: Registry = {};

  const runtimeEntries: string[] = [];

  const indexData: RegistryIndex = {
    core: {},
    motion: {},
    blocks: {},
  };

  const componentFiles = walk(
    path.join(SRC_DIR, CONFIG.sources.components.root),
  );

  buildComponents(componentFiles, registry, runtimeEntries, indexData);

  registry.blocks = buildBlocks();

  const indexEntries = buildIndexEntries(indexData);

  fs.mkdirSync(path.dirname(CONFIG.registry.output), {
    recursive: true,
  });

  fs.mkdirSync(path.dirname(CONFIG.registry.runtimeOutput), {
    recursive: true,
  });

  fs.writeFileSync(CONFIG.registry.output, JSON.stringify(registry, null, 2));

  fs.writeFileSync(
    CONFIG.registry.runtimeOutput,
    buildRuntimeFile(runtimeEntries, indexEntries),
  );

  console.log("Registry built successfully!");
}

buildRegistry().catch(console.error);
