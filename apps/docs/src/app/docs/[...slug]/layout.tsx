import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";
import { AppSidebar } from "@/components/app/app-sidebar";
import { SidebarProvider } from "@/components/app/sidebar";

export default function Layout({ children }: { children: ReactNode }) {
  const base = baseOptions();

  return (
    <SidebarProvider>
      <div className="flex min-h-svh w-full overflow-hidden">
        <AppSidebar pageTree={source.pageTree} />
        <main
          data-scrollable
          className="flex-1 min-w-0 w-full max-w-screen overflow-y-auto h-screen"
        >
          <DocsLayout
            {...base}
            tree={source.pageTree}
            sidebar={{
              enabled: false,
            }}
          >
            {children}
          </DocsLayout>
        </main>
      </div>
    </SidebarProvider>
  );
}
