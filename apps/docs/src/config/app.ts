export const app = {
  name: "LibravelUI",
  url: "https://ui.libravelabs.com",
  description:
    "Accessible React component library to copy, customize, and own your UI. Built for Next.js, Vite, and Laravel.",
  author: {
    username: "libravelabs",
    name: "libravelabs",
    url: "https://github.com/libravelabs",
  },
  links: {
    twitter: "https://x.com/libravelabs",
    github: "https://github.com/libravelabs/libravelUI",
    discord: "https://discord.gg/libravelabs",
  },
  repo: {
    url: "https://github.com/libravelabs/libravelUI",
    currentVersion: "1.x",
    repoStars: "0",
  },
  cli: {
    version: "latest",
    command: "libravel@latest",
  },
  get cliCommand() {
    return `${this.cli.command}@${this.cli.version}`;
  },
  libravel: "npx @libravelui@latest",
  editorThemes: {
    light: "github-light",
    dark: "github-dark",
  },
};

export type SiteConfig = typeof app;

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "oklch(0.1 0.01 240)",
};
