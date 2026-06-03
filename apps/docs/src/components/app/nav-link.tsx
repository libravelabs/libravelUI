"use client";

import { cn } from "@/lib/utils";
import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";

export function NavLink(props: React.PropsWithChildren<LinkProps>) {
  const pathname = usePathname();

  return (
    <Link
      className={cn(
        "flex items-center gap-x-2.5 px-2 py-3 text-sm/6 [&_svg]:size-4",
        "text-muted-foreground hover:text-foreground",
        pathname === props.href
          ? "text-foreground font-bold"
          : "text-muted-foreground/70",
      )}
      {...props}
    />
  );
}
