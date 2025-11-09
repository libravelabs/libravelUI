"use client";

import dynamic from "next/dynamic";
import { Loader } from "@/components/ui/core/loader";
import { cn } from "@/lib/utils";
import Link from "next/link";

type CompItem =
  | string
  | {
      name: string;
      className?: string;
      file?: string;
    };

type PreviewBlockProps = {
  comp: CompItem | CompItem[];
  section: string;
  file?: string;
  cols?: number;
  classNames?: {
    grid?: string | string[];
    wrapper?: string | string[];
    comp?: string | string[];
  };
};

export function PreviewBlock({
  comp,
  section,
  file,
  cols = 3,
  classNames,
}: PreviewBlockProps) {
  const basePath = `@/components/docs/${section}`;

  const RenderDemo = (item: CompItem) => {
    const name = typeof item === "string" ? item : item.name;
    const itemFile =
      typeof item === "string" ? file : item.file || file || "index";
    const className =
      typeof item === "string" ? "" : item.className || classNames?.comp;

    const finalPath = `${basePath}/${name}/${itemFile}`;

    const Demo = dynamic(
      () =>
        import(`${finalPath}`).catch(() => ({
          default: () => (
            <div className="text-sm text-destructive">
              Component not found: {finalPath}
            </div>
          ),
        })),
      {
        ssr: false,
        loading: () => <Loader />,
      }
    );

    return (
      <div
        key={finalPath}
        className={cn(
          "relative border flex flex-col items-center justify-center w-full sm:max-w-sm min-h-48 rounded-xl overflow-hidden not-prose",
          classNames?.wrapper
        )}
      >
        <div
          data-content
          className={cn(
            "flex flex-col items-center justify-center w-full h-full scale-85",
            className
          )}
        >
          <Demo />
        </div>

        <Link
          href={`/docs/components/${section}/${name}`}
          className="w-full p-2 border-t font-mono text-sm text-center truncate hover:bg-accent transition-colors ease-linear"
        >
          {name
            .split("-")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" ")}
        </Link>
      </div>
    );
  };

  if (Array.isArray(comp)) {
    const gridColsClass =
      {
        1: "grid-cols-1",
        2: "grid-cols-1 sm:grid-cols-2",
        3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
        4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-4",
        5: "grid-cols-1 sm:grid-cols-2 md:grid-cols-5",
      }[cols] || "grid-cols-1 sm:grid-cols-2 md:grid-cols-3";

    return (
      <div className={cn("grid gap-4", gridColsClass, classNames?.grid)}>
        {comp.map((c) => RenderDemo(c))}
      </div>
    );
  }

  return RenderDemo(comp);
}
