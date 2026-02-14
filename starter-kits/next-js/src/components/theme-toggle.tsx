"use client";

import * as React from "react";
import { useTheme } from "@/components/theme/theme-provider";
import { Button } from "@/components/ui/core/button";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button tone="outline" iconOnly>
        <Sun />
      </Button>
    );
  }

  return (
    <Button
      tone="outline"
      iconOnly
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </Button>
  );
}
