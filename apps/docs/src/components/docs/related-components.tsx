import { Card } from "fumadocs-ui/components/card";
import { source } from "@/lib/source";
import React from "react";
import { cn } from "@/lib/utils";

interface RelatedComponentsProps extends React.ComponentProps<"div"> {
  components: string | string[];
  section?: string;
}

export async function RelatedComponents({
  components,
  section = "core",
  className,
}: RelatedComponentsProps) {
  const slugs = Array.isArray(components) ? components : [components];

  const pages = slugs
    .map((slug) => {
      const page = source.getPage(["components", section, slug]);
      if (!page) {
        console.warn(`[RelatedComponents] Page not found for slug: ${slug}`);
        return null;
      }
      return page;
    })
    .filter(Boolean);

  if (pages.length === 0) return null;

  return (
    <div
      className={cn(
        "my-4 grid gap-3",
        "[&>*:nth-last-child(1):nth-child(3n+1)]:lg:col-span-2 [&>*:nth-last-child(2):nth-child(3n+1)]:lg:col-span-1 [&>*:nth-last-child(1):nth-child(3n+2)]:lg:col-span-1",
        className,
      )}
    >
      {pages.map((page) => (
        <Card key={page!.url} title={page!.data.title} href={page!.url}>
          {page!.data.description}
        </Card>
      ))}
    </div>
  );
}
