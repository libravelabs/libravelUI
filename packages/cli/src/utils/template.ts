export const getThemeTemplate = (
  lightVars: Record<string, string>,
  darkVars: Record<string, string>,
  radius: string,
  fontUrls: string[] = [],
) => {
  const formatVars = (vars: Record<string, string>, indent = "  ") => {
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
      .map(([k, v]) => {
        let value = v;
        if (k.includes("font-")) {
          value = v
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
        return `${indent}${k}: ${value};`;
      })
      .join("\n");
  };

  const fontImports = fontUrls
    .map((url) => `@import url("${url}");`)
    .join("\n");

  const cssHeader = `${fontImports}${fontImports ? "\n\n" : ""}@import "tailwindcss";

@layer base {
  *,
  ::after,
  ::before,
  ::backdrop,
  ::file-selector-button {
    border-color: var(--color-border, currentColor);
  }

  * {
    @apply border-border outline-ring/50;
  }

  body {
    @apply bg-background text-foreground;
    font-family: var(--font-sans);
  }
}

@utility scrollbar-hidden {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
}`;

  return `${cssHeader}

@custom-variant dark (&:is(.dark *));

:root {
${formatVars(lightVars)}
  --radius: ${radius};
}

.dark {
${formatVars(darkVars)}
}

@theme inline {
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

  --animate-marquee: marquee 30s linear infinite;
  --animate-marqueeY: marqueeY 200s linear infinite;
}

@keyframes marquee {
  0% { transform: translateX(0%); }
  100% { transform: translateX(calc(-100% - var(--gap))); }
}

@keyframes marqueeY {
  0% { transform: translateY(0%); }
  100% { transform: translateY(calc(-100% - var(--gap))); }
}
`;
};
