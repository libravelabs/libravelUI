"use client";

import { Palette } from "lucide-react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuHeader,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/core/dropdown-menu";
import { useUiPreferences } from "@/hooks/use-ui-preferences";
import { themes, type ThemeName } from "@/app/themes";
import { RADIUS_MAP } from "@/constants/radius";
import type { RadiusKey } from "@/types/ui-preferences";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { generateThemeCss } from "@/lib/generate-theme-css";
import { getTheme } from "@/app/themes";
import { toast } from "sonner";

export function MobileNavDropdown() {
  const { setTheme, resolvedTheme } = useTheme();
  const themeName = useUiPreferences((s) => s.theme) as ThemeName;
  const setThemeName = useUiPreferences((s) => s.setTheme);
  const radius = useUiPreferences((s) => s.radius);
  const setRadius = useUiPreferences((s) => s.setRadius);
  const isTextured = useUiPreferences((s) => s.isTextured);
  const toggleTextured = useUiPreferences((s) => s.toggleTextured);
  const { copyToClipboard } = useCopyToClipboard();

  const handleCopy = () => {
    const theme = getTheme(themeName);
    if (!theme) {
      toast.error("Theme not found");
      return;
    }
    const css = generateThemeCss(theme, radius);
    copyToClipboard(css);
    toast.success("Theme CSS copied to clipboard!");
  };

  const themeKeys = Object.keys(themes) as ThemeName[];
  const radiusKeys = Object.keys(RADIUS_MAP) as RadiusKey[];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        tone="ghost"
        iconOnly
        aria-label="Customise appearance"
      >
        <Palette className="size-5" />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuHeader separator>Customise</DropdownMenuHeader>

        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Appearance</DropdownMenuSubTrigger>
            <DropdownMenuSubContent
              selectionMode="single"
              selectedKeys={[resolvedTheme ?? "system"]}
              onSelectionChange={(keys) => {
                const key = [...keys][0] as string;
                if (key) setTheme(key);
              }}
            >
              <DropdownMenuItem id="light">Light</DropdownMenuItem>
              <DropdownMenuItem id="dark">Dark</DropdownMenuItem>
              <DropdownMenuItem id="system">System</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>App Theme</DropdownMenuSubTrigger>
            <DropdownMenuSubContent
              selectionMode="single"
              selectedKeys={[themeName]}
              onSelectionChange={(keys) => {
                const key = [...keys][0] as ThemeName;
                if (key) setThemeName(key);
              }}
            >
              {themeKeys.map((name) => (
                <DropdownMenuItem key={name} id={name}>
                  {themes[name].label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Radius</DropdownMenuSubTrigger>
            <DropdownMenuSubContent
              selectionMode="single"
              selectedKeys={[radius]}
              onSelectionChange={(keys) => {
                const key = [...keys][0] as RadiusKey;
                if (key) setRadius(key);
              }}
            >
              {radiusKeys.map((key) => (
                <DropdownMenuItem key={key} id={key}>
                  {key}
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem onAction={toggleTextured}>
            Texture
            <span className="ml-auto text-xs text-muted-foreground">
              {isTextured ? "On" : "Off"}
            </span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem onAction={handleCopy}>
            Copy Theme CSS
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
