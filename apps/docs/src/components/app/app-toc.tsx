"use client";

import { TOCItems } from "@/components/app/toc/toc";
import { TOCProvider, TOCScrollArea } from "@/components/app/toc";
import type { TOCItemType } from "fumadocs-core/server";

export function AppToc({ toc }: { toc: TOCItemType[] }) {
  return (
    <div className="sticky top-10 hidden lg:flex flex-col w-[260px] max-h-[calc(100vh-6rem)]">
      <TOCProvider toc={toc}>
        <TOCScrollArea className="flex-1">
          <TOCItems />
        </TOCScrollArea>
      </TOCProvider>
    </div>
  );
}
