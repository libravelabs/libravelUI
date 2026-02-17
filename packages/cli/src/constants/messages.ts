import { BASE_URL } from "./config";

export const MESSAGES = {
  INIT: {
    INTRO: "LibravelUI Initialization",
    FETCHING_CONFIG: "Fetching project configuration...",
    CONFIG_FETCHED: "Configuration fetched successfully!",
    FAILED_FETCH_DATA: "Failed to fetch data",
    THEME_SELECT: "Select your theme:",
    ICON_LIBRARY_SELECT: "Select icon library:",
    CSS_PATH_PROMPT: "Where is your global CSS file located?",
    DEPS_NEEDED: (deps: string) => `Dependencies needed: ${deps}`,
    INSTALL_DEPS_PROMPT: "Would you like to install the required dependencies?",
    INSTALLING_DEPS: (pm: string) => `Installing dependencies using ${pm}...`,
    DEPS_INSTALLED: "Dependencies installed successfully!",
    DEPS_INSTALL_FAILED: "Failed to install dependencies.",
    GENERATING_CONFIG: "Generating configuration...",
    THEME_NOT_FOUND: "Theme not found",
    THEME_SAVED: "Theme and configuration saved!",
    SUCCESS: "Initialization successful! Enjoy building with LibravelUI.",
    FAILED: "Initialization failed",
  },
  ADD: {
    INTRO: "LibravelUI Component Adder",
    FETCHING_REGISTRY: "Fetching component registry...",
    REGISTRY_FETCHED: "Registry fetched successfully!",
    FAILED_FETCH_REGISTRY: "Failed to fetch registry",
    SELECT_COMPONENTS: "Select components to install:",
    NO_COMPONENTS: "No components selected.",
    ALL_PROCESSED: "All components processed.",
    MISSING_DEPS: (deps: string) => `Missing dependencies found: ${deps}`,
    INSTALL_MISSING_DEPS_PROMPT:
      "Would you like to install the missing dependencies?",
    SUCCESS: (installed: string) => `Successfully installed: ${installed}`,
    COMPONENT_NOT_FOUND: (name: string) =>
      `\nWarning: Component "${name}" not found in registry.`,
    INSTALLING: (name: string) => `Installing ${name}...`,
    FILE_EXISTS: (path: string) => `File "${path}" already exists.`,
    OVERWRITE_PROMPT: (path: string) => `Overwrite ${path}?`,
    SKIPPING: (path: string) => `Skipping "${path}"`,
    INSTALLED: (name: string) => `✓ ${name} installed`,
  },
  ERRORS: {
    CONNECTION_FAILED: `Could not connect to LibravelUI server. Make sure it's running on ${BASE_URL}`,
  },
} as const;
