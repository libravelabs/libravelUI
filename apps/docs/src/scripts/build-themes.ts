import fs from "fs";
import path from "path";
import { ThemeDefinition } from "../types/theme";

const THEMES_DIR = path.join(process.cwd(), "src/app/themes");
const REGISTRY_PATH = path.join(THEMES_DIR, "themes.registry.json");
const PUBLIC_OUTPUT_PATH = path.join(process.cwd(), "public/theme.json");

async function buildThemes() {
  console.log("Building theme registries...");

  const files = fs
    .readdirSync(THEMES_DIR)
    .filter((f) => f.endsWith(".json") && f !== "themes.registry.json");
  const themes: Record<string, ThemeDefinition> = {};

  files.forEach((file) => {
    const filePath = path.join(THEMES_DIR, file);
    const content = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    themes[content.name] = content;
  });

  fs.writeFileSync(REGISTRY_PATH, JSON.stringify(themes, null, 2));

  const publicRegistry = Object.entries(themes).map(
    ([name, definition]: [string, ThemeDefinition]) => ({
      name,
      label: definition.label,
      radius: definition.radius,
      fontUrl: definition.fontUrl,
      cssVars: {
        light: definition.light,
        dark: definition.dark,
      },
    }),
  );

  const publicOutputDir = path.dirname(PUBLIC_OUTPUT_PATH);
  if (!fs.existsSync(publicOutputDir)) {
    fs.mkdirSync(publicOutputDir, { recursive: true });
  }

  fs.writeFileSync(PUBLIC_OUTPUT_PATH, JSON.stringify(publicRegistry, null, 2));

  console.log(
    `Theme registries built with ${Object.keys(themes).length} themes.`,
  );
}

buildThemes().catch((err) => {
  console.error(err);
  process.exit(1);
});
