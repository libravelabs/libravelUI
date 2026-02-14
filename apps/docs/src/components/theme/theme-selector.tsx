"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { themes, type ThemeName } from "@/app/themes";
import { getTheme } from "@/app/themes";
import { applyTheme } from "@/hooks/apply-theme";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/core/dropdown-menu";
import { Paintbrush } from "lucide-react";

import { useUiPreferences } from "@/hooks/use-ui-preferences";

const STORAGE_KEY = process.env.THEME_STORAGE as string;

export function ThemeSelector() {
  const { theme: mode } = useTheme();
  const selected = useUiPreferences((s) => s.theme) as ThemeName;
  const setSelected = useUiPreferences((s) => s.setTheme);

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    const stored = localStorage.getItem(STORAGE_KEY) as ThemeName | null;

    if (stored && getTheme(stored)) {
      setSelected(stored);
    }
  }, [setSelected]);

  useEffect(() => {
    if (!hydrated) return;

    const theme = getTheme(selected);

    const isDark =
      mode === "dark"
        ? true
        : mode === "light"
          ? false
          : window.matchMedia("(prefers-color-scheme: dark)").matches;

    applyTheme(theme, isDark);

    localStorage.setItem(STORAGE_KEY, selected);
  }, [selected, mode, hydrated]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger tone="outline" radius="lg" iconOnly size="lg">
        <Paintbrush />
      </DropdownMenuTrigger>

      <DropdownMenuContent placement="end">
        {(Object.keys(themes) as ThemeName[]).map((name) => (
          <DropdownMenuItem
            key={name}
            onClick={() => setSelected(name)}
            className={name === selected ? "bg-accent" : ""}
          >
            {themes[name].label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
