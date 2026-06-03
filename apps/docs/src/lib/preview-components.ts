import type { ComponentType } from "react";

type PreviewLoader = () => Promise<ComponentType>;

export const previewComponents: Record<string, PreviewLoader> = {
  "navbar-default": () =>
    import("@/app/blocks/navbar/default/app-navbar").then(
      (m) => m.NavbarDefault,
    ),
};
