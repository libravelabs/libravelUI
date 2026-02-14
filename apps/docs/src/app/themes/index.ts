import type { ThemeDefinition } from "@/types/theme";
import themesRegistry from "./themes.registry.json";

export const themes = themesRegistry as Record<string, ThemeDefinition>;

export type ThemeName = keyof typeof themes;

export function getTheme(name: string): ThemeDefinition {
  return themes[name];
}
