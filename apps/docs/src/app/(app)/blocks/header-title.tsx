"use client";

import { usePathname } from "next/navigation";
import { twJoin } from "tailwind-merge";
import {
  Header,
  HeaderDescription,
  HeaderInner,
  HeaderTitle,
} from "@/components/app/header";
import { Link, type LinkProps } from "@/components/ui/core/link";

export function BlocksHeader() {
  return (
    <div>
      <Header>
        <HeaderInner>
          <HeaderTitle>Blocks</HeaderTitle>
          <HeaderDescription className="mb-6">
            Clean and modern blocks you can copy and paste into your apps,
            compatible with any React framework, open source and free forever
          </HeaderDescription>
        </HeaderInner>
      </Header>
      <div className="border-y bg-popover px-8">
        <div className="flex items-center justify-center gap-x-2 sm:justify-start">
          <NavLink href="/blocks">Featured</NavLink>
          <NavLink href="/blocks/sidebar">Sidebar</NavLink>
          <NavLink href="/blocks/navbar">Navbar</NavLink>
          <NavLink href="/blocks/auth">Auth</NavLink>
          <NavLink href="/blocks/chart">Charts</NavLink>
        </div>
      </div>
    </div>
  );
}

function NavLink(props: LinkProps) {
  const pathname = usePathname();

  return (
    <Link
      className={twJoin(
        "inline-flex items-center gap-x-2.5 px-2 py-3 text-sm/6 *:data-[slot=icon]:size-4 *:data-[slot=icon]:shrink-0",
        "text-muted-foreground hover:text-foreground",
        pathname === props.href ? "text-foreground" : "text-muted-foreground",
      )}
      {...props}
    />
  );
}
