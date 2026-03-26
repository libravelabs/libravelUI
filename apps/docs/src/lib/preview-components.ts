import type { ComponentType } from "react";

type PreviewLoader = () => Promise<ComponentType>;

export const previewComponents: Record<string, PreviewLoader> = {
  "navbar-default": () =>
    import("@/components/examples/block/navbar/navbar-default").then(
      (m) => m.NavbarDefault,
    ),
};
