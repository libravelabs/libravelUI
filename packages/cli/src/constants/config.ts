export const DEFAULT_CSS_PATH = "app/globals.css";
export const CONFIG_PATH = "components.json";
export const BASE_URL = "https:///ui.libravelabs.com";
export const THEMES_API = `${BASE_URL}/theme.json`;
export const REGISTRY_URL = `${BASE_URL}/registry.json`;

export const CRITICAL_DIRS = ["lib/", "hooks/"];

export const CORE_DEPENDENCIES = [
  "react-aria-components",
  "tw-animate-css",
  "tailwindcss-react-aria-components",
  "motion",
];

export const AUTO_INSTALL_COMPONENTS = [];

export const REGISTRY_PATH_PREFIXES = {
  COMPONENTS_UI: "components/ui/",
  COMPONENTS: "components/",
  LIB_UTILS: "lib/utils",
  LIB: "lib/",
  HOOKS: "hooks/",
} as const;

export const REGISTRY_VALID_TYPES = ["registry:ui", "registry:block"];

export const STARTERS = {
  repo: "libravelabs/libravelUI/starter-kits",
  next: "next-js",
  vite: "vite",
} as const;

export type Framework = typeof STARTERS.next | typeof STARTERS.vite;

export const FRAMEWORK_LABELS: Record<Framework, string> = {
  [STARTERS.next]: "Next.js",
  [STARTERS.vite]: "Vite",
} as const;
