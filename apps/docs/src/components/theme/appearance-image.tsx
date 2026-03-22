"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { useId } from "react";

type ThemeValue = "light" | "dark" | "system";

type AppearanceTheme = {
  value: ThemeValue;
  label?: string;
  src?: string;
};

type AppearanceImageProps = {
  themes?: AppearanceTheme[];
  images?: Partial<Record<ThemeValue, string>>;
};

export default function AppearanceImage({
  themes,
  images,
}: AppearanceImageProps) {
  const id = useId();
  const { theme, setTheme } = useTheme();

  const defaultThemes: AppearanceTheme[] = [
    {
      value: "light",
      label: "Light",
      src: "/assets/appearance/light-theme.png",
    },
    {
      value: "system",
      label: "System",
      src: "/assets/appearance/system-theme.png",
    },
    {
      value: "dark",
      label: "Dark",
      src: "/assets/appearance/dark-theme.png",
    },
  ];

  const finalThemes: AppearanceTheme[] =
    themes ??
    defaultThemes.map((theme) => ({
      ...theme,
      src: images?.[theme.value] ?? theme.src,
    }));

  return (
    <LayoutGroup id={id}>
      <div className="flex gap-4">
        {finalThemes.map(({ value, src, label }) => (
          <div
            key={value}
            onClick={() => setTheme(value)}
            className="group flex flex-col items-center gap-4 cursor-pointer"
          >
            <div className="relative flex justify-center">
              <motion.img
                src={src || ""}
                alt={value}
                className={cn(
                  "max-w-52 rounded-lg transition ease-in-out hover:opacity-100",
                  theme === value ? "opacity-100" : "opacity-70",
                )}
              />
              <AnimatePresence>
                {theme === value && (
                  <motion.div
                    layoutId="theme-border"
                    className="absolute inset-0 rounded-lg border-3 border-primary"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </AnimatePresence>
              {theme === value && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="bg-primary text-background absolute bottom-2 inline-flex [&_svg]:size-3.5 items-center justify-center rounded-full p-0.5 font-bold"
                >
                  <Check />
                </motion.div>
              )}
            </div>
            <div className="relative flex items-center justify-center">
              {theme === value && (
                <motion.div
                  layoutId="theme-label-bg"
                  className="absolute rounded-lg bg-primary w-full h-full"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                    delay: 0.05,
                  }}
                />
              )}
              <span
                className={cn(
                  "relative z-10 px-4 py-1 capitalize rounded-lg transition-all",
                  theme === value
                    ? "text-primary-foreground"
                    : "text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground",
                )}
              >
                {label || value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </LayoutGroup>
  );
}
