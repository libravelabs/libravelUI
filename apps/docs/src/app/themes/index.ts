import { defaultTheme } from "./default";
import { amethyst } from "./amethyst";
import { candy } from "./candy";
import { coffeeBreak } from "./coffeeBreak";
import { nature } from "./nature";
import { monolith } from "./monolith";
import { softmold } from "./softmold";
import { vercel } from "./vercel";
import { orbital } from "./orbital";
import type { ThemeDefinition } from "@/types/theme";

export const themes: Record<string, ThemeDefinition> = {
  default: defaultTheme,
  amethyst,
  candy,
  coffeeBreak,
  nature,
  monolith,
  softmold,
  vercel,
  orbital,
} as const;

export type ThemeName = keyof typeof themes;

export function getTheme(name: ThemeName): ThemeDefinition {
  return themes[name];
}
