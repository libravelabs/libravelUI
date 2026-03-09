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
      <AppSidebar
        pageTree={source.pageTree}
        className="sticky top-0 self-start h-screen"
      />
      <main data-scrollable className="flex-1 min-w-0 w-full max-w-screen">
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
    </SidebarProvider>
  );
}
