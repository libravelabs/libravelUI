import { Link } from "@inertiajs/react";
import { LuBookCopy, LuFiles, LuLayoutGrid } from "react-icons/lu";
import {
  Navbar,
  NavbarDrawer,
  NavbarItem,
  NavbarMobile,
  NavbarSection,
  NavbarSpacer,
  NavbarStart,
  NavbarTrigger,
} from "@/components/ui/block/navbar";
import { useCurrentUrl } from "@/hooks/use-current-url";
import { toUrl } from "@/lib/utils";
import { dashboard } from "@/routes";
import type { NavItem } from "@/types";
import { AppLogo } from "@/components/logo";
import { NavUser } from "./nav-user";

const mainNavItems: NavItem[] = [
  {
    label: "Dashboard",
    icon: <LuLayoutGrid />,
    link: {
      href: dashboard().url,
    },
  },
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

export function AppHeader() {
  const { isCurrentUrl } = useCurrentUrl();

  return (
    <>
      <Navbar variant="inset">
        <NavbarStart>
          <Link href={dashboard()} prefetch className="flex items-center">
            <AppLogo />
          </Link>
        </NavbarStart>

        <NavbarSection className="ms-4">
          {mainNavItems.map((item) => (
            <NavbarItem
              key={toUrl(item.label)}
              isActive={isCurrentUrl(toUrl(item.link?.href as string))}
              {...item.link}
            >
              {item.icon && item.icon}
              {item.label}
            </NavbarItem>
          ))}
        </NavbarSection>

        <NavbarSpacer />

        <NavbarSection>
          <NavUser variant="avatar" />
        </NavbarSection>
      </Navbar>

      <NavbarMobile>
        <NavbarTrigger />
        <NavbarSpacer />
        <Link href={dashboard()} prefetch className="flex items-center">
          <AppLogo />
        </Link>
        <NavbarSpacer />
        <div className="ms-auto">
          <NavUser variant="avatar" />
        </div>
      </NavbarMobile>

      <NavbarDrawer>
        <NavbarSection>
          {mainNavItems.map((item) => (
            <NavbarItem
              key={toUrl(item.label)}
              isActive={isCurrentUrl(toUrl(item.link?.href as string))}
              {...item.link}
            >
              {item.icon && item.icon}
              {item.label}
            </NavbarItem>
          ))}
        </NavbarSection>
      </NavbarDrawer>
    </>
  );
}
