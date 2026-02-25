import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";
import { AppSidebar } from "@/components/app/app-sidebar";

export default function Layout({ children }: { children: ReactNode }) {
  const base = baseOptions();

  return (
    <div
      className="flex min-h-svh w-full overflow-hidden"
      style={
        {
          "--fd-sidebar-width": "20rem" /* approx 2 cols */,
          "--fd-toc-width": "18rem" /* approx 2 cols */,
          "--fd-content-width": "min(850px, 60vw)" /* approx 8 cols */,
        } as React.CSSProperties
      }
    >
      <AppSidebar pageTree={source.pageTree} />
      <main className="flex-1 min-w-0 overflow-y-auto h-screen">
        <DocsLayout
          tree={source.pageTree}
          {...base}
          sidebar={{
            enabled: false,
          }}
        >
          {children}
        </DocsLayout>
      </main>
    </div>
  );
}
