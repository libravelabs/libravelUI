import { LuLayoutGrid, LuBookCopy, LuFiles } from "react-icons/lu";
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
  SidebarItem,
} from "@/components/ui/block/sidebar";
import { cn, toUrl } from "@/lib/utils";
import { Avatar } from "@/components/ui/core/avatar";
import { NavUser } from "./nav-user";
import { NavFooter } from "./nav-footer";
import { dashboard } from "@/routes";
import type { NavItem } from "@/types";
import { useCurrentUrl } from "@/hooks/use-current-url";

const mainNavItems: NavItem[] = [
  {
    label: "Dashboard",
    icon: <LuLayoutGrid />,
    link: {
      href: dashboard(),
    },
  },
];

const footerNavItems: NavItem[] = [
  {
    label: "Repository",
    icon: <LuBookCopy />,
    link: {
      href: "https://github.com/libravelabs/libravelUI/",
      target: "_blank",
    },
  },
  {
    label: "Docs",
    icon: <LuFiles />,
    link: {
      href: "https://ui.libravelabs.com/docs",
      target: "_blank",
    },
  },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const { isCurrentUrl } = useCurrentUrl();

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <div
          className={cn("flex items-center gap-3", !open && "justify-center")}
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
        {mainNavItems.map((item) => (
          <SidebarItem
            key={item.label}
            isActive={isCurrentUrl(toUrl(item.link?.href as string))}
            {...item.link}
          >
            {item.icon && <span className="size-4 shrink-0">{item.icon}</span>}

            <span>{item.label}</span>
          </SidebarItem>
        ))}
      </SidebarBody>

      <SidebarFooter>
        <NavFooter items={footerNavItems} className="mt-auto" />
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
