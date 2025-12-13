import React from "react";
import { loader } from "fumadocs-core/source";
import { docs } from "@/.source";
import { icons } from "lucide-react";
import { createElement } from "react";
import { Badge } from "@/components/ui/core/badge";
import { ReactAriaIcon } from "@/components/doc-links";

// See https://fumadocs.vercel.app/docs/headless/source-api for more info
export const source = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
  pageTree: {
    attachFile(node, file) {
      if (!file?.data) return node;

      const data = file.data;

      if (data.new)
        node.name = (
          <>
            {node.name}
            <Badge tone="secondary">New</Badge>
          </>
        );
      else if (data.pro)
        node.name = (
          <>
            {node.name}
            <Badge tone="secondary">Pro</Badge>
          </>
        );
      else if (data.soon)
        node.name = (
          <>
            {node.name}
            <Badge tone="secondary">Soon</Badge>
          </>
        );

      return node;
    },
  },
  icon(icon) {
    return icon ? (iconMap[icon as keyof typeof iconMap] ?? null) : null;
  },
});

const iconMap: Record<string, React.ReactNode> = {
  Aria: <ReactAriaIcon />,
  ...Object.fromEntries(
    Object.keys(icons).map((key) => [
      key,
      createElement(icons[key as keyof typeof icons]),
    ])
  ),
};
