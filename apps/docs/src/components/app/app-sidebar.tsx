"use client";

import {
  Sidebar,
  SidebarItem,
  SidebarSection,
  SidebarGroup,
  SidebarSeparator,
  SidebarHeader,
  SidebarBody,
  SidebarFooter,
} from "@/components/ui/blocks/sidebar";
import { Logo } from "@/components/logo";
import { Alert } from "@/components/ui/core/alert";
import { PageTree } from "fumadocs-core/server";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LargeSearchToggle } from "@/components/app/partials/search-toggle";

export function AppSidebar({ pageTree }: { pageTree: PageTree.Root }) {
  const pathName = usePathname();

  return (
    <Sidebar className="fixed top-0 left-0 h-screen z-999">
      <SidebarHeader className="gap-4">
        <Link href="/docs" className="w-fit">
          <Logo />
        </Link>
        <LargeSearchToggle className="w-full" />
      </SidebarHeader>

      <SidebarBody className="gap-3">
        {renderSidebarTree(pageTree.children, pathName)}
      </SidebarBody>

      <SidebarFooter>
        <Alert title="Testing" />
      </SidebarFooter>
    </Sidebar>
  );
}

function renderSidebarTree(items: PageTree.Node[], pathName: string) {
  return items.map((item) => {
    if (item.type === "separator") {
      return (
        <div key={item.$id} className="px-3 pt-3">
          <h3 className="text-xs font-medium text-sidebar-foreground/50">
            {item.name}
          </h3>
        </div>
      );
    }

    if (item.type === "folder") {
      return (
        <div key={item.$id} className="grid gap-3 w-full">
          <SidebarGroup
            stickyHeader
            label={item.name as string}
            icon={item.icon}
            defaultOpen={item.defaultOpen}
            className="[&_h3]:text-xs [&_svg:not([class*='size-'])]:size-3"
          >
            {renderSidebarTree(item.children, pathName)}
          </SidebarGroup>
          <SidebarSeparator />
        </div>
      );
    }

    return (
      <SidebarItem
        key={item.url}
        href={item.url}
        isActive={item.url === pathName}
      >
        {item.icon && item.icon}
        {item.name}
      </SidebarItem>
    );
  });
}
