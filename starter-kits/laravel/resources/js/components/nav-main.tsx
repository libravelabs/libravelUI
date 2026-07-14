import { Link } from "@inertiajs/react";
import {
  SidebarBody,
  SidebarItem,
  useSidebar,
} from "@/components/ui/block/sidebar";
import { useCurrentUrl } from "@/hooks/use-current-url";
import type { NavItem } from "@/types";
import { cn, toUrl } from "@/lib/utils";

export function NavMain({
  items = [],
  ...props
}: React.ComponentProps<typeof SidebarBody> & { items: NavItem[] }) {
  const { isCurrentUrl } = useCurrentUrl();
  const { open } = useSidebar();

  return (
    <SidebarBody
      {...props}
      className={cn("group-data-[collapsible=icon]:p-0", props.className)}
    >
      {items.map((item) => (
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
  );
}
