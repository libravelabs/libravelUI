import * as React from "react";
import { SidebarContent } from "@/components/ui/block/sidebar";
import { NavbarContent } from "@/components/ui/block/navbar";

type ContentProps<V extends "header" | "sidebar"> = V extends "sidebar"
  ? React.ComponentProps<typeof SidebarContent>
  : React.ComponentProps<typeof NavbarContent>;

type Props<V extends "header" | "sidebar" = "header"> = ContentProps<V> & {
  variant?: V;
  children?: React.ReactNode;
};

export function AppContent<V extends "header" | "sidebar" = "header">({
  variant = "header" as V,
  children,
  ...props
}: Props<V>) {
  if (variant === "sidebar") {
    return (
      <SidebarContent
        {...(props as React.ComponentProps<typeof SidebarContent>)}
      >
        {children}
      </SidebarContent>
    );
  }

  return (
    <NavbarContent {...(props as React.ComponentProps<typeof NavbarContent>)}>
      {children}
    </NavbarContent>
  );
}
