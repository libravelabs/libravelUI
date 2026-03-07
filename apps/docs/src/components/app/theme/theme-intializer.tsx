"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { getTheme, type ThemeName } from "@/app/themes";
import { applyTheme } from "@/hooks/apply-theme";
import { useUiPreferences } from "@/hooks/use-ui-preferences";

export function ThemeInitializer() {
  const { theme: mode } = useTheme();
  const themeName = useUiPreferences((s) => s.theme) as ThemeName;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      applyStoredTheme(mode, themeName);
    }
  }, [mounted, mode, themeName]);

  return null;
}

function applyStoredTheme(mode: string | undefined, themeName: ThemeName) {
  const theme = getTheme(themeName) || getTheme("default");

  const isDark =
    mode === "dark"
      ? true
      : mode === "light"
        ? false
        : window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (theme) {
    applyTheme(theme, isDark);
  }
}
