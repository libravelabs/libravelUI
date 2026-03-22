"use client";

import { cn } from "@/lib/utils";
import { SunMoon, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, LayoutGroup } from "motion/react";
import { type HTMLAttributes } from "react";

export default function AppearanceTab({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const { theme, setTheme } = useTheme();

  const tabs: {
    value: "light" | "dark" | "system";
    icon: React.ReactNode;
    label: string;
  }[] = [
    { value: "light", icon: <Sun />, label: "Light" },
    { value: "dark", icon: <Moon />, label: "Dark" },
    { value: "system", icon: <SunMoon />, label: "System" },
  ];

  return (
    <LayoutGroup>
      <div
        className={cn(
          "inline-flex gap-1 rounded-xl bg-secondary p-1 w-fit relative",
          className,
        )}
        {...props}
      >
        {tabs.map(({ value, icon, label }) => {
          const active = theme === value;
          return (
            <button
              key={value}
              onClick={() => setTheme(value)}
              className={cn(
                "relative flex items-center rounded-lg px-3.5 py-1.5 transition-colors cursor-pointer [&_svg:not([class*='size-'])]:size-4",
                active
                  ? "text-primary-foreground"
                  : "text-foreground/70 hover:text-foreground",
              )}
            >
              {active && (
                <motion.div
                  layoutId="appearance-tab-bg"
                  className="absolute inset-0 bg-primary rounded-lg shadow-xs"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative flex items-center">
                {icon}
                <span className="ml-1.5 text-sm">{label}</span>
              </span>
            </button>
          );
        })}
      </div>
    </LayoutGroup>
  );
}
