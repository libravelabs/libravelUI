"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/core/dropdown-menu";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { type HTMLAttributes, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { ButtonProps } from "@/components/ui/core/button";

const themes = [
  { label: "Light", value: "light", icon: Sun },
  { label: "Dark", value: "dark", icon: Moon },
  { label: "System", value: "system", icon: Monitor },
] as const;

export function AppearanceDropdown({
  className,
  tone = "ghost",
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  tone?: ButtonProps["tone"];
}) {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className={className} {...props}>
        <DropdownMenu>
          <DropdownMenuTrigger tone={tone} iconOnly>
            <Monitor />
          </DropdownMenuTrigger>
        </DropdownMenu>
      </div>
    );
  }

  const currentTheme = themes.find((t) => t.value === theme) ?? themes[2];
  const CurrentIcon = currentTheme.icon;

  return (
    <div className={className} {...props}>
      <DropdownMenu>
        <DropdownMenuTrigger tone={tone} iconOnly>
          <CurrentIcon />
          <span className="sr-only">Toggle theme</span>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          {themes.map(({ label, value, icon: Icon }) => (
            <DropdownMenuItem
              key={value}
              onClick={() => setTheme(value)}
              className={cn(
                "cursor-pointer",
                theme === value && "font-semibold",
              )}
            >
              <Icon data-slot="indicator" />
              <span className="ms-2">{label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
