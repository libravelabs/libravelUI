import { Link } from "@/components/ui/core/link";
import { LayoutGrid, BookCopy, Files } from "lucide-react";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/block/sidebar";
import { NavFooter } from "./nav-footer";
import type { NavItem } from "../types/nav";
import { AppLogo, AppLogoIcon } from "@/components/app/logo";

const mainNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "#",
    icon: <LayoutGrid />,
  },
];

const footerNavItems: NavItem[] = [
  {
    title: "Repository",
    href: "https://github.com/libravelabs/libravelUI/",
    icon: <BookCopy />,
    target: "_blank",
  },
  {
    title: "Docs",
    href: "https://ui.libravelabs.com/docs",
    icon: <Files />,
    target: "_blank",
  },
];

export function AppSidebar({ ...props }) {
  const { state } = useSidebar();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        {state === "collapsed" ? <AppLogoIcon /> : <AppLogo />}
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="#" className="w-fit">
              <SidebarMenuButton className="w-fit gap-1 hover:bg-transparent"></SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <NavMain items={mainNavItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavFooter items={footerNavItems} className="mt-auto" />
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
