"use client";

import { NavLink } from "@/components/app/nav-link";
import { Button, ButtonProps } from "@/components/ui/core/button";
import { Description } from "@/components/ui/core/field";
import { Heading } from "@/components/ui/core/heading";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import registry from "@/../public/registry.json";

type HeaderCTA = {
  label: React.ReactNode;
  href: string;
  button?: ButtonProps;
};

export type BlocksHeaderProps = {
  title: string;
  description: string;
  cta?: HeaderCTA;
};

export type BlocksLayoutProps = React.ComponentPropsWithoutRef<"div"> & {
  header?: BlocksHeaderProps;
};

export function BaseBlocksLayout({
  header,
  className,
  ...props
}: BlocksLayoutProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {header && (
        <BlocksHeader
          title={header.title}
          description={header.description}
          cta={header.cta}
        />
      )}
      <BlocksNav />

      {props.children}
    </div>
  );
}

export function BlocksHeader({ title, description, cta }: BlocksHeaderProps) {
  return (
    <div className="flex flex-col gap-4">
      <Heading className="text-2xl sm:text-4xl">{title}</Heading>
      <Description className="text-lg max-w-2xl">{description}</Description>
      {cta && (
        <Link href={cta.href} className="w-fit">
          <Button {...cta.button}>{cta.label}</Button>
        </Link>
      )}
    </div>
  );
}

export function BlocksNav() {
  const navLinks = registry.blocks;

  return (
    <div className="border-y bg-popover -mx-10">
      <div className="px-8">
        <div className="flex items-center justify-center gap-x-2 sm:justify-start">
          {navLinks.blocks.map((nav) => (
            <NavLink key={nav.href} href={nav.href}>
              {nav.title}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}
