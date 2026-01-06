import { loader } from "fumadocs-core/source";
import { docs } from "@/.source";
import { Badge } from "@/components/ui/core/badge";
import { IconRegistry } from "@/lib/icon-registry";
import * as CustomIcons from "@/icons";

const iconRegistry = new IconRegistry(Object.values(CustomIcons));

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
    return iconRegistry.resolve(icon);
  },
});
