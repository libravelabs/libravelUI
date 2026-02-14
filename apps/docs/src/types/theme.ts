import type { ThemeName } from "@/app/themes";

export type ThemeMode = "light" | "dark";

export type CSSVarName = `--${string}`;

export type ThemeVars = Record<CSSVarName, string>;

export interface ThemeDefinition {
  readonly name: string;
  readonly label: string;
  readonly radius: string;
  readonly light: ThemeVars;
  readonly dark: ThemeVars;
  readonly fontUrl?: string[];
}

export type ThemesMap = Record<string, ThemeDefinition>;

export interface ThemeSelectItem {
  label: string;
  id: ThemeName;
}
