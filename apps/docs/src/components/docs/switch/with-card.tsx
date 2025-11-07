"use client";

import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function WithCardSwitch() {
  const { theme, setTheme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  const isDark = currentTheme === "dark";

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Theme Switcher</CardTitle>
        <CardDescription>
          is a switch between light and dark themes to customize your
          experience.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center gap-2">
        <Sun className="size-5" />
        <Switch isSelected={isDark} onChange={handleToggle} />
        <Moon className="size-5" />
      </CardContent>
    </Card>
  );
}
