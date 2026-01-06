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
import { getDocUrl } from "@/lib/doc-url";
import { ReactAriaIcon } from "@/icons/react-aria";

export type DocItem =
  | string
  | {
      doc: string;
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
      return {
        label: d,
        url: getDocUrl(d),
        icon: undefined,
      };
    }

    return {
      label: d.doc,
      url: getDocUrl(d.doc),
      icon: d.icon,
    };
  });

  if (docsArray.length === 1) {
    const single = docsArray[0];
    return (
      <Link
        href={single.url}
        target="_blank"
        rel="noreferrer"
        className="w-fit"
      >
        <Button tone="outline" className="flex items-center gap-1">
          {renderIcon(single.icon)}
          {single.label}
          <ArrowUpRight size={12} />
        </Button>
      </Link>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button tone="outline" className="w-fit">
          <ReactAriaIcon /> {title} Docs <ArrowUpRight size={14} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col overflow-auto p-1">
        {docsArray.map((item, i) => (
          <a
            key={i}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className={optionVariants()}
          >
            {renderIcon(item.icon)}
            <span>{item.label}</span>
            <ExternalLinkIcon className="ms-auto size-3.5 text-muted-foreground" />
          </a>
        ))}
      </PopoverContent>
    </Popover>
  );
}
