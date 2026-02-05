import { select, text, spinner, intro, outro } from "@clack/prompts";
import fs from "fs-extra";
import path from "path";
import picocolors from "picocolors";
import { getThemeTemplate } from "./template";

import { DEFAULT_CSS_PATH, CONFIG_PATH, THEMES_API } from "./constants";

export async function init() {
  intro(picocolors.cyan("LibravelUI Initialization"));

  const s = spinner();
  s.start("Fetching available themes...");

  let themes: any[] = [];
  try {
    const response = await fetch(THEMES_API);
    if (!response.ok) throw new Error("Failed to fetch themes");
    themes = await response.json();
    s.stop("Themes fetched successfully!");
  } catch (err) {
    s.stop(
      picocolors.red(
        "Could not connect to LibravelUI server. Make sure it's running on localhost:3000",
      ),
    );
    return;
  }

  const themeName = await select({
    message: "Select your theme:",
    options: themes.map((t) => ({ value: t.name, label: t.label })),
  });

  if (typeof themeName !== "string") return;

  const cssPath = await text({
    message: "Where is your global CSS file located?",
    placeholder: DEFAULT_CSS_PATH,
    initialValue: DEFAULT_CSS_PATH,
  });

  if (typeof cssPath !== "string") return;

  s.start("Generating theme and configuration...");

  try {
    const selectedTheme = themes.find((t) => t.name === themeName);
    if (!selectedTheme) throw new Error("Theme not found");

    const cssContent = getThemeTemplate(
      selectedTheme.cssVars.light,
      selectedTheme.cssVars.dark,
    );

    await fs.ensureDir(path.dirname(cssPath));
    await fs.writeFile(cssPath, cssContent);

    const config = {
      theme: themeName,
      cssPath: cssPath,
    };
    await fs.ensureDir(path.dirname(CONFIG_PATH));
    await fs.writeJSON(CONFIG_PATH, config, { spaces: 2 });

    s.stop("Theme and configuration saved!");
    outro(
      picocolors.green(
        "Initialization successful! Enjoy building with LibravelUI.",
      ),
    );
  } catch (err) {
    s.stop(picocolors.red("Initialization failed"));
    console.error(err);
  }
}
