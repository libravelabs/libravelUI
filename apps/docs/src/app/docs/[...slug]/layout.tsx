import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";
import { AppSidebar } from "@/components/app/app-sidebar";
import { SidebarTest } from "@/app/(home)/sidebar-test";

export default function Layout({ children }: { children: ReactNode }) {
  const base = baseOptions();

  return (
    <DocsLayout
      tree={source.pageTree}
      {...base}
      sidebar={{
        component: <AppSidebar pageTree={source.pageTree} />,
      }}
    >
      {children}
    </DocsLayout>
  );
}
