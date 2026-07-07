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

export function AppSidebar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <Sidebar
      variant="float"
      onMouseOver={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <SidebarHeader>
        <div
          className={cn(
            "flex items-center gap-3 px-2 py-1 w-full",
            !open && "justify-center",
          )}
        >
          <Avatar initials="A" shape="square" size="sm" />

          {open && (
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">Acme Inc.</p>
              <p className="truncate text-xs text-muted-foreground">
                Workspace
              </p>
            </div>
          )}
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
        <div
          className={cn(
            "flex items-center gap-3 px-2 py-1",
            !open && "justify-center",
          )}
        >
          <UserMenu open={open} />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
