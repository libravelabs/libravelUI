import type { InertiaLinkProps } from "@inertiajs/react";

export type BreadcrumbItem = {
  label: string;
  href: string;
};

export type NavItem = {
  label: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  link?: InertiaLinkProps;
};
