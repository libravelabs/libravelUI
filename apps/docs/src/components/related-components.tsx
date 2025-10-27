import { Card } from "fumadocs-ui/components/card";
import { source } from "@/lib/source";
import React from "react";
import { cn } from "@/lib/utils";

interface RelatedComponentsProps extends React.ComponentProps<"div"> {
  components: string | string[];
}

export async function RelatedComponents({
  components,
  className,
}: RelatedComponentsProps) {
  const slugs = Array.isArray(components) ? components : [components];

  const pages = slugs
    .map((slug) => {
      const page = source.getPage(["components", slug]);
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
        pages.length === 1 ? "grid-cols-1" : "sm:grid-cols-2",
        className
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
