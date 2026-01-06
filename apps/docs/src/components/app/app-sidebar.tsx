"use client";

import {
  Sidebar,
  SidebarItem,
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
import { cn } from "@/lib/utils";

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

      <SidebarBody className="gap-0">
        {renderSidebarTree(pageTree.children, pathName, 0)}
      </SidebarBody>

      <SidebarFooter>
        <Alert title="Testing" />
      </SidebarFooter>
    </Sidebar>
  );
}

function renderSidebarTree(
  items: PageTree.Node[],
  pathName: string,
  depth: number
) {
  return items.map((item) => {
    if (item.type === "separator") {
      return (
        <div key={item.$id} className="px-3 pt-2">
          <h3 className="text-xs font-medium text-sidebar-foreground/50">
            {item.name}
          </h3>
        </div>
      );
    }

    if (item.type === "folder") {
      const isNestedFolder = depth > 0;

      return (
        <div
          key={item.$id}
          className={cn(
            "relative grid gap-2 mt-2 w-full",
            isNestedFolder && "ps-4 mt-0"
          )}
        >
          {isNestedFolder && (
            <>
              <span
                aria-hidden
                className="pointer-events-none absolute left-1 top-0 bottom-0 w-px bg-sidebar-border"
              />
              <span
                aria-hidden
                className="absolute left-1 z-10 top-[14px] h-px w-3 bg-sidebar-border"
              />
            </>
          )}

          <SidebarGroup
            stickyHeader
            label={item.name as string}
            icon={item.icon}
            defaultOpen={item.defaultOpen}
            className={cn(
              "relative [&_h3]:text-xs [&_svg:not([class*='size-'])]:size-3 [&_svg[fill^='#']]:fill-foreground"
            )}
            classNames={{
              stickyHeader: `z-${10 + depth}`,
            }}
          >
            {renderSidebarTree(item.children, pathName, depth + 1)}
          </SidebarGroup>

          {!isNestedFolder && <SidebarSeparator />}
        </div>
      );
    }

    return (
      <div key={item.url} className="my-1">
        <SidebarItem
          href={item.url}
          isActive={item.url === pathName}
          icon={item.icon}
        >
          {item.name}
        </SidebarItem>
      </div>
    );
  });
}
