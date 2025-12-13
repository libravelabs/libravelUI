import { loadThemeFonts } from "@/lib/load-font";
import type { ThemeDefinition } from "@/types/theme";

export function applyTheme(theme: ThemeDefinition, isDark: boolean) {
  const vars = isDark ? theme.dark : theme.light;
  const root = document.documentElement;

  root.style.removeProperty("--font-sans");
  root.style.removeProperty("--font-serif");
  root.style.removeProperty("--font-mono");

  for (const [key, value] of Object.entries(vars)) {
    root.style.setProperty(key, value);
  }

  loadThemeFonts(theme.fontUrl);
}
