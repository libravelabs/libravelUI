import fs from "fs";
import path from "path";
import { themes } from "../app/themes";

const OUTPUT_PATH = path.join(process.cwd(), "public/theme.json");

async function buildThemes() {
  console.log("Building theme registry...");

  const registry: any[] = Object.entries(themes).map(([name, definition]) => ({
    name,
    label: name.charAt(0).toUpperCase() + name.slice(1),
    cssVars: {
      light: definition.light,
      dark: definition.dark,
    },
  }));

  const outputDir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(registry, null, 2));
  console.log(`Theme registry built with ${registry.length} themes.`);
}

buildThemes().catch((err) => {
  console.error(err);
  process.exit(1);
});
