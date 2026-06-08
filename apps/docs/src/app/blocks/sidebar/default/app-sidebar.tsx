"use client";

import {
  ChartColumnIcon,
  CheckSquareIcon,
  FolderKanbanIcon,
  LayoutDashboardIcon,
  SettingsIcon,
} from "lucide-react";
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
  SidebarItem,
} from "@/components/ui/block/sidebar";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/core/avatar";
import { UserMenu } from "./user-menu";

const navigationItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboardIcon,
    active: true,
  },
  {
    label: "Projects",
    icon: FolderKanbanIcon,
    active: false,
  },
  {
    label: "Tasks",
    icon: CheckSquareIcon,
    active: false,
  },
  {
    label: "Analytics",
    icon: ChartColumnIcon,
    active: false,
  },
  {
    label: "Settings",
    icon: SettingsIcon,
    active: false,
  },
] as const;

export function AppSidebar() {
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader>
        <div className="flex items-center gap-3 px-2 py-1">
          <Avatar initials="A" shape="square" size="sm" />

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">Acme Inc.</p>
            <p className="truncate text-xs text-muted-foreground">Workspace</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarBody>
        {navigationItems.map((item) => (
          <SidebarItem key={item.label}>
            <item.icon className="size-4 shrink-0" />

            <span>{item.label}</span>
          </SidebarItem>
        ))}
      </SidebarBody>

      <SidebarFooter>
        <div className="flex items-center gap-3 px-2 py-1">
          <UserMenu />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
