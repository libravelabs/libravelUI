import { DocsLayout } from "fumadocs-ui/layouts/notebook";
import type { ReactNode } from "react";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";

import Image from "next/image";

export default function Layout({ children }: { children: ReactNode }) {
  const base = baseOptions();

  return (
    <DocsLayout
      tree={source.pageTree}
      {...base}
      nav={{
        ...base.nav,
        title: (
          <div className="flex items-center justify-center gap-2 font-semibold text-sm">
            <Image src="/favicon.ico" alt="libravelUI" width={17} height={17} />
            libravelUI
          </div>
        ),
      }}
      sidebar={{
        defaultOpenLevel: 1,
        tabs: {
          transform(option, node) {
            const meta = source.getNodeMeta(node);
            if (!meta) return option;

            return {
              ...option,
              icon: (
                <div
                  className="rounded-md border bg-linear-to-t from-fd-background/80 p-1 [&_svg]:size-5"
                  style={{
                    color: `hsl(var(--${meta.file.dirname}-color))`,
                    backgroundColor: `hsl(var(--${meta.file.dirname}-color)/.3)`,
                  }}
                >
                  {node.icon}
                </div>
              ),
            };
          },
        },
      }}
    >
      {children}
    </DocsLayout>
  );
}
