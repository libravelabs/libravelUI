import { LinkProps } from "@/components/ui/core/link";

export type BreadcrumbItem = {
  title: string;
  href: string;
};

export type NavItem = {
  title: string;
  href: NonNullable<LinkProps["href"]>;
  target?: "_self" | "_blank";
  icon?: React.ReactNode;
  isActive?: boolean;
};
