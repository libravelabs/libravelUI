import type { ThemeDefinition } from "@/types/theme";
import { RADIUS_MAP } from "@/constants/radius";
import type { RadiusKey } from "@/types/ui-preferences";

export function generateThemeCss(
  theme: ThemeDefinition,
  radiusKey: RadiusKey,
): string {
  const radiusValue = RADIUS_MAP[radiusKey];

  const generateVars = (vars: Record<string, string>) => {
    const genericFonts = [
      "sans-serif",
      "serif",
      "monospace",
      "cursive",
      "fantasy",
      "system-ui",
      "ui-sans-serif",
      "ui-serif",
      "ui-monospace",
      "ui-rounded",
      "math",
      "emoji",
      "fangsong",
    ];

    return Object.entries(vars)
      .map(([key, value]) => {
        let finalValue = value;
        if (key.includes("font-")) {
          finalValue = value
            .split(",")
            .map((part) => {
              const trimmed = part.trim();
              if (
                trimmed.startsWith('"') ||
                trimmed.startsWith("'") ||
                genericFonts.includes(trimmed.toLowerCase())
              ) {
                return trimmed;
              }
              return `"${trimmed}"`;
            })
            .join(", ");
        }
        return `  ${key}: ${finalValue};`;
      })
      .join("\n");
  };

  const fontImports = (theme.fontUrl || [])
    .map((url: string) => `@import url("${url}");`)
    .join("\n");

  const cssRoot = `:root {
${generateVars(theme.light)}
  --radius: ${radiusValue};
}`;

  const cssDark = `.dark {
${generateVars(theme.dark)}
}`;

  const tailwindTheme = `@theme inline {
  --font-sans: var(--font-sans);
  --font-serif: var(--font-serif);
  --font-mono: var(--font-mono);

  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);

  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}`;

  return `${fontImports}${fontImports ? "\n\n" : ""}${cssRoot}\n\n${cssDark}\n\n${tailwindTheme}`;
}
