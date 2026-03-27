import type { ComponentPropsWithoutRef } from "react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/block/sidebar";
import type { NavItem } from "../types/nav";

export function NavFooter({
  items,
  className,
  ...props
}: ComponentPropsWithoutRef<typeof SidebarGroup> & {
  items: NavItem[];
}) {
  const { state } = useSidebar();

  return (
    <SidebarGroup
      {...props}
      className={`group-data-[collapsible=icon]:p-0 ${className || ""}`}
    >
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <a
                href={item.href}
                target={item.target}
                rel="noopener noreferrer"
              >
                <SidebarMenuButton>
                  {item.icon && item.icon}
                  {state !== "collapsed" && <span>{item.title}</span>}
                </SidebarMenuButton>
              </a>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
