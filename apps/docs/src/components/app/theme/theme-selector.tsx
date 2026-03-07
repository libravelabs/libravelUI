"use client";

import { themes, type ThemeName } from "@/app/themes";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/core/dropdown-menu";
import { Paintbrush } from "lucide-react";

import { useUiPreferences } from "@/hooks/use-ui-preferences";

export function ThemeSelector() {
  const selected = useUiPreferences((s) => s.theme) as ThemeName;
  const setSelected = useUiPreferences((s) => s.setTheme);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        tone="outline"
        className="border-foreground/10"
        iconOnly
      >
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
