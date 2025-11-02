"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Monitor, Moon, Sun, type LucideIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { ButtonProps } from "@/components/ui/button";

const themes: {
  label: string;
  value: string;
  icon: LucideIcon;
}[] = [
  {
    label: "Light",
    value: "light",
    icon: Sun,
  },
  {
    label: "Dark",
    value: "dark",
    icon: Moon,
  },
  {
    label: "System",
    value: "system",
    icon: Monitor,
  },
] as const;

export function AppearanceDropdown({
  className,
  variant = "ghost",
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  variant?: ButtonProps["variant"];
}) {
  const { theme, setTheme } = useTheme();
  const currentTheme = themes.find((t) => t.value === theme);
  const CurrentIcon = currentTheme?.icon ?? Monitor;

  return (
    <div className={className} {...props}>
      <DropdownMenu>
        <DropdownMenuTrigger variant={variant} size="icon">
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
                theme === value && "font-semibold"
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
