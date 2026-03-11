import { Alert } from "@/components/ui/core/alert";
import { Card } from "fumadocs-ui/components/card";
import { AlertTriangle } from "lucide-react";
import { notFound } from "next/navigation";
import { source } from "@/lib/source";
import React from "react";
import { RelatedComponents } from "./related-components";

export interface RequiredBlockProps {
  title?: string;
  message?: string;
  components: string | string[];
  section?: string;
  children?: React.ReactNode;
}

export async function RequiredBlock({
  title = "Required Component",
  message,
  children,
  components,
  section = "core",
}: RequiredBlockProps) {
  const compList = Array.isArray(components) ? components : [components];

  const pages = compList
    .map((slug) => {
      const page = source.getPage(["components", section, slug]);
      if (!page) {
        console.warn(`[RelatedComponents] Page not found for slug: ${slug}`);
        return null;
      }
      return page;
    })
    .filter(Boolean);

  function formatComponentName(name: string) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  return (
    <div>
      <Alert
        tone="warning"
        title={title}
        icon={<AlertTriangle className="size-5" />}
      >
        {children ||
          (message ? (
            message
          ) : (
            <>
              This component depends on{" "}
              {pages.map(
                (page, index) =>
                  page && (
                    <span key={page.url}>
                      <code>{formatComponentName(page.data.title)}</code>
                      {index < pages.length - 2 && ", "}
                      {index === pages.length - 2 && " and "}
                    </span>
                  ),
              )}
              . Make sure you have installed and configured it before using this
              component.
            </>
          ))}
      </Alert>

      <RelatedComponents components={compList} />
    </div>
  );
}
