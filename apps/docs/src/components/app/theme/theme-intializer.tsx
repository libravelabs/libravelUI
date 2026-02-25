"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { getTheme, type ThemeName } from "@/app/themes";
import { applyTheme } from "@/hooks/apply-theme";

const STORAGE_KEY = process.env.THEME_STORAGE as string;

export function ThemeInitializer() {
  const { theme: mode } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    applyStoredTheme(mode);

    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        applyStoredTheme(mode);
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    if (mounted) {
      applyStoredTheme(mode);
    }
  }, [mounted, mode]);

  return null;
}

function applyStoredTheme(mode: string | undefined) {
  const stored = localStorage.getItem(STORAGE_KEY) as ThemeName | null;

  const themeName = stored && getTheme(stored) ? stored : "default";
  const theme = getTheme(themeName);

  const isDark =
    mode === "dark"
      ? true
      : mode === "light"
        ? false
        : window.matchMedia("(prefers-color-scheme: dark)").matches;

  applyTheme(theme, isDark);
}
