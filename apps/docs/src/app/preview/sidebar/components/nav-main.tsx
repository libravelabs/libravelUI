import { Link } from "@/components/ui/core/link";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/block/sidebar";
import type { NavItem } from "../types/nav";

export function NavMain({ items = [] }: { items: NavItem[] }) {
  const { open } = useSidebar();

  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <Link href={item.href}>
            <SidebarMenuButton tooltip={{ children: item.title }}>
              {item.icon && item.icon}
              {open && <span>{item.title}</span>}
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
