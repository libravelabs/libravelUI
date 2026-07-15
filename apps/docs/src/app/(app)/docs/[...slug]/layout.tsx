import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";

export default function Layout({ children }: { children: ReactNode }) {
  const base = baseOptions();

  return (
    <DocsLayout
      {...base}
      data-scrollable
      containerProps={{
        className: "md:!flex-row md:!pl-0 md:!pl-0 md:!w-full md:!mx-0",
      }}
      sidebar={{
        className:
          "md:!sticky md:!top-0 md:!h-screen md:!shrink-0 md:!overflow-y-auto !bg-background",
      }}
    >
      <div className="w-full md:max-w-[calc(100vw-20rem)]">{children}</div>
    </DocsLayout>
  );
}
