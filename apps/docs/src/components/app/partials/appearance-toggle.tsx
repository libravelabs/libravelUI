"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { AnimatedSwitch } from "../../ui/motion/animated-switch";

export function AppearanceToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <AnimatedSwitch
      value={isDark}
      onValueChange={(val) => setTheme(val ? "dark" : "light")}
      onIcon={<Moon />}
      offIcon={<Sun />}
    />
  );
}
