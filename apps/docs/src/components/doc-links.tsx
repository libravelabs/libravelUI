import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/core/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "fumadocs-ui/components/ui/popover";
import { ArrowUpRight, ExternalLinkIcon } from "lucide-react";
import { cva } from "class-variance-authority";
import * as icons from "lucide-react";
import { cn } from "@/lib/utils";

export type DocItem =
  | string
  | {
      title?: string;
      url: string;
      icon?: React.ReactNode | string;
    };

interface PageData {
  doc?: DocItem | DocItem[];
  title: string;
}

interface DocLinksProps {
  page: {
    data: PageData;
  };
}

const optionVariants = cva(
  "text-sm p-2 rounded-lg inline-flex items-center gap-2 hover:text-accent-foreground hover:bg-accent [&_svg]:size-4"
);

function renderIcon(icon?: React.ReactNode | string) {
  if (!icon) return <ReactAriaIcon />;
  if (typeof icon === "string" && icon in icons) {
    const LucideIcon = (icons as Record<string, React.ElementType>)[icon];
    return <LucideIcon className="size-4" />;
  }
  if (React.isValidElement(icon)) return icon;
  return <ReactAriaIcon />;
}

export function DocLinks({ page }: DocLinksProps) {
  const { doc, title } = page.data;
  if (!doc) return null;

  const docsArray = (Array.isArray(doc) ? doc : [doc]).map((d) => {
    if (typeof d === "string") {
      return { title: "View Documentation", url: d, icon: undefined };
    }
    return {
      title: d.title ?? "View Documentation",
      url: d.url,
      icon: d.icon,
    };
  });

  if (docsArray.length === 1) {
    const singleDoc = docsArray[0];
    return (
      <Link
        href={singleDoc.url}
        target="_blank"
        rel="noreferrer"
        className="w-fit"
      >
        <Button tone="outline" className="flex items-center gap-1">
          {renderIcon(singleDoc.icon)}
          {singleDoc.title === "View Documentation" ? title : singleDoc.title}
          <ArrowUpRight size={12} />
        </Button>
      </Link>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button tone="outline" className="w-fit">
          <ReactAriaIcon /> {page.data.title} Docs <ArrowUpRight size={14} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col overflow-auto p-1">
        {docsArray.map(({ title: docTitle, url, icon }, i) => (
          <a
            key={i}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={optionVariants()}
          >
            {renderIcon(icon)}
            <span>{docTitle === "View Documentation" ? title : docTitle}</span>
            <ExternalLinkIcon className="text-muted-foreground size-3.5 ms-auto" />
          </a>
        ))}
      </PopoverContent>
    </Popover>
  );
}

export function ReactAriaIcon({ className }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 21"
      data-slot="icon"
      className={cn("size-5", className)}
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M14.667 1.733H22v17.333zm-5.267 0H2v17.334zm2.6 6.4 4.733 10.933h-3.066l-1.4-3.467H8.8z"
      ></path>
    </svg>
  );
}
