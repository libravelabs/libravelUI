"use client";

import {
  Sidebar,
  SidebarItem,
  SidebarGroup,
  SidebarSeparator,
  SidebarHeader,
  SidebarBody,
  SidebarFooter,
  SidebarTrigger,
} from "./sidebar";
import { AppLogo } from "@/components/app/logo";
import { Alert } from "@/components/ui/core/alert";
import type { PageTree } from "fumadocs-core/server";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LargeSearchToggle } from "@/components/app/search/search-toggle";
import { cn } from "@/lib/utils";

export function AppSidebar({ pageTree }: { pageTree: PageTree.Root }) {
  const pathName = usePathname();

  return (
    <Sidebar className="h-screen sticky top-0">
      <SidebarHeader className="gap-4">
        <div className="flex items-center justify-between">
          <Link href="/docs" className="w-fit">
            <AppLogo />
          </Link>
          <SidebarTrigger className="md:hidden" />
        </div>
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
  depth: number,
) {
  return items.map((item) => {
    const isNested = depth > 0;

    const Wrapper = ({ children }: { children: React.ReactNode }) => (
      <div className={cn("relative grid gap-2 w-full", isNested && "ps-4")}>
        {isNested && (
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
        {children}
      </div>
    );

    if (item.type === "separator") {
      return (
        <div key={item.$id} className={cn("px-3 pt-2", isNested && "ps-7")}>
          <h3 className="text-xs font-medium text-sidebar-foreground/50">
            {item.name}
          </h3>
        </div>
      );
    }

    if (item.type === "folder") {
      const folderUrl = item.index?.url ?? null;

      return (
        <Wrapper key={item.$id}>
          <SidebarGroup
            stickyHeader
            label={String(
              folderUrl ? (
                <Link href={folderUrl} className="truncate hover:underline">
                  {item.name}
                </Link>
              ) : (
                item.name
              ),
            )}
            icon={item.icon}
            defaultOpen={item.defaultOpen}
            className="relative [&_h3]:text-xs [&_svg:not([class*='size-'])]:size-3 [&_svg[fill^='#']]:fill-foreground"
            classNames={{
              stickyHeader: `z-${10 + depth}`,
            }}
          >
            {renderSidebarTree(item.children, pathName, depth + 1)}
          </SidebarGroup>

          {depth === 0 && <SidebarSeparator />}
        </Wrapper>
      );
    }

    return (
      <Wrapper key={item.url}>
        <SidebarItem
          href={item.url}
          isActive={item.url === pathName}
          icon={item.icon}
        >
          {item.name}
        </SidebarItem>
      </Wrapper>
    );
  });
}

function getFolderUrl(folder: PageTree.Folder): string | null {
  if (folder.index && folder.index.type === "page") {
    return folder.index.url;
  }

  return null;
}
