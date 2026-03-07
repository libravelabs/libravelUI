"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Button } from "@/components/ui/core/button";
import { RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Loader } from "@/components/ui/core/loader";

interface CompItem {
  name: string;
  className?: string | string[];
  file?: string;
}

interface ClassNames {
  grid?: string | string[];
  wrapper?: string | string[];
  comp?: string | string[];
}

interface PreviewBlockProps {
  comp: string | CompItem | (string | CompItem)[];
  section: string;
  file?: string;
  classNames?: ClassNames;
}

interface PreviewItemProps {
  section: string;
  name: string;
  file: string;
  className?: string | string[];
  wrapperClass?: string | string[];
}

function PreviewItem({
  section,
  name,
  file,
  className,
  wrapperClass,
}: PreviewItemProps) {
  const [refresh, setRefresh] = useState<{ key: number; rotation: number }>({
    key: 0,
    rotation: 0,
  });

  const handleRefresh = () => {
    setRefresh((prev) => ({
      key: prev.key + 1,
      rotation: prev.rotation + 360,
    }));
  };

  const finalPath = `@/components/examples/${section}/${name}/${file}`;
  const Demo = dynamic(
    () =>
      import(finalPath).catch(() => ({
        default: () => (
          <div className="text-sm text-destructive">
            Component not found: {finalPath}
          </div>
        ),
      })),
    {
      ssr: false,
      loading: () => <Loader />,
    },
  );

  return (
    <div
      className={cn(
        "relative border flex flex-col items-center justify-center w-full sm:max-w-sm min-h-48 rounded-xl overflow-hidden not-prose",
        wrapperClass,
      )}
    >
      <Button
        onClick={handleRefresh}
        tone="secondary"
        size="xs"
        iconOnly
        aria-label="Refresh preview"
        className="absolute end-2 top-2"
      >
        <RefreshCw
          className="transition-transform duration-300"
          style={{ transform: `rotate(${refresh.rotation}deg)` }}
        />
      </Button>

      <div
        key={refresh.key}
        data-content
        className={cn(
          "flex flex-col items-center justify-center w-full h-full scale-85 not-prose",
          className,
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
}

export function PreviewBlock({
  comp,
  section,
  file = "index",
  classNames,
}: PreviewBlockProps) {
  const comps = Array.isArray(comp) ? comp : [comp];

  return (
    <div
      className={cn(
        "grid [&>*:nth-last-child(1):nth-child(3n+1)]:lg:col-span-3 [&>*:nth-last-child(2):nth-child(3n+1)]:lg:col-span-1 [&>*:nth-last-child(1):nth-child(3n+2)]:lg:col-span-2 gap-4",
        classNames?.grid,
      )}
    >
      {comps.map((c) => {
        const name = typeof c === "string" ? c : c.name;
        const itemFile = typeof c === "string" ? file : c.file || file;
        const className =
          typeof c === "string" ? "" : c.className || classNames?.comp;

        return (
          <PreviewItem
            key={`${section}-${name}`}
            section={section}
            name={name}
            file={itemFile}
            className={className}
            wrapperClass={classNames?.wrapper}
          />
        );
      })}
    </div>
  );
}
