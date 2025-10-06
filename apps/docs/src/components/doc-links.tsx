import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ArrowUpRight, ExternalLinkIcon } from "lucide-react";
import { cva } from "class-variance-authority";

type DocItem = string | { title?: string; url: string };

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
  "text-sm p-2 rounded-lg inline-flex items-center gap-2 hover:text-fd-accent-foreground hover:bg-fd-accent [&_svg]:size-4"
);

export function DocLinks({ page }: DocLinksProps) {
  const { doc, title } = page.data;

  if (!doc) return null;

  const docsArray: { title: string; url: string }[] = Array.isArray(doc)
    ? doc.map((d) =>
        typeof d === "string"
          ? { title: "View Documentation", url: d }
          : { title: d.title ?? "View Documentation", url: d.url }
      )
    : typeof doc === "string"
    ? [{ title: "View Documentation", url: doc }]
    : [{ title: doc.title ?? "View Documentation", url: doc.url }];

  if (docsArray.length === 1) {
    const singleDoc = docsArray[0];

    return (
      <Link
        href={singleDoc.url}
        target="_blank"
        rel="noreferrer"
        className="w-fit"
      >
        <Button variant="outline" className="flex items-center gap-1">
          <ReactAriaIcon />{" "}
          {singleDoc.title === "View Documentation" ? title : singleDoc.title}
          <ArrowUpRight size={12} />
        </Button>
      </Link>
    );
  }

  return (
    <Popover>
      <PopoverTrigger
        variant="outline"
        className="flex items-center gap-1 w-fit"
      >
        <ReactAriaIcon /> {page.data.title} Docs <ArrowUpRight size={14} />
      </PopoverTrigger>
      <PopoverContent className="flex flex-col overflow-auto p-1">
        {docsArray.map(({ title: docTitle, url }, i) => (
          <a
            key={i}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={optionVariants()}
          >
            <span>{docTitle === "View Documentation" ? title : docTitle}</span>
            <ExternalLinkIcon className="text-fd-muted-foreground size-3.5 ms-auto" />
          </a>
        ))}
      </PopoverContent>
    </Popover>
  );
}

export function ReactAriaIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 21"
      data-slot="icon"
      className="size-5"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M14.667 1.733H22v17.333zm-5.267 0H2v17.334zm2.6 6.4 4.733 10.933h-3.066l-1.4-3.467H8.8z"
      ></path>
    </svg>
  );
}
