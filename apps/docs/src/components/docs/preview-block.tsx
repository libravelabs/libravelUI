"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/core/button";
import { RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Loader } from "@/components/ui/core/loader";
import { runtimeRegistry } from "@/generated/runtime-registry";

interface PreviewBlockItem {
  path: string;
  title?: string;
  href?: string;
  className?: string | string[];
}

interface ClassNames {
  grid?: string | string[];
  wrapper?: string | string[];
  comp?: string | string[];
}

interface PreviewBlockProps {
  path: string | PreviewBlockItem | (string | PreviewBlockItem)[];
  cols?: number;
  classNames?: ClassNames;
}

interface PreviewItemProps {
  path: string;
  title?: string;
  href?: string;
  className?: string | string[];
  wrapperClass?: string | string[];
}

function PreviewItem({
  path: rawPath,
  title,
  href,
  className,
  wrapperClass,
}: PreviewItemProps) {
  const [refresh, setRefresh] = useState<{
    key: number;
    rotation: number;
  }>({
    key: 0,
    rotation: 0,
  });

  const path = useMemo(() => {
    return rawPath.replace(/\.(tsx|ts|jsx|js)$/, "").replace(/^\/+|\/+$/g, "");
  }, [rawPath]);

  const handleRefresh = () => {
    setRefresh((prev) => ({
      ...prev,
      key: prev.key + 1,
      rotation: prev.rotation + 360,
    }));
  };

  const registryEntry = runtimeRegistry[path as keyof typeof runtimeRegistry];
  const Demo = useMemo(() => {
    if (!registryEntry) {
      return () => (
        <div className="text-xs text-destructive p-4">Not found: {path}</div>
      );
    }
    return (registryEntry as any).Component || (registryEntry as any);
  }, [registryEntry, path]);

  const displayName = useMemo(() => {
    if (title) return title;
    if ((registryEntry as any)?.name) return (registryEntry as any).name;
    const name = path.split("/").pop() || path;
    return name
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }, [path, title, registryEntry]);

  const finalHref = useMemo(() => {
    if (href) return href;
    if ((registryEntry as any)?.url) return (registryEntry as any).url;
    return `/docs/${path}`;
  }, [path, href, registryEntry]);

  return (
    <div
      className={cn(
        "relative border flex flex-col items-center justify-center w-full sm:max-w-sm min-h-48 rounded-xl overflow-hidden not-prose bg-card",
        wrapperClass,
      )}
    >
      <Button
        onClick={handleRefresh}
        tone="secondary"
        size="xs"
        iconOnly
        aria-label="Refresh preview"
        className="absolute inset-e-2 top-2 z-10"
      >
        <RefreshCw
          className="transition-transform duration-300 size-3"
          style={{ transform: `rotate(${refresh.rotation}deg)` }}
        />
      </Button>

      <div
        key={refresh.key}
        className={cn(
          "flex flex-col items-center justify-center w-full h-full p-6 not-prose",
          className,
        )}
      >
        <React.Suspense fallback={<Loader />}>
          <Demo />
        </React.Suspense>
      </div>

      <Link
        href={finalHref}
        className="w-full p-2 border-t font-mono text-[10px] text-center truncate hover:bg-accent transition-colors ease-linear text-muted-foreground"
      >
        {displayName}
      </Link>
    </div>
  );
}

export function PreviewBlock({
  path: pathProp,
  cols = 3,
  classNames,
}: PreviewBlockProps) {
  const gridColsClass =
    {
      1: "grid-cols-1",
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-4",
      5: "grid-cols-1 sm:grid-cols-2 md:grid-cols-5",
    }[cols] || "grid-cols-1 sm:grid-cols-2 md:grid-cols-3";

  const items = Array.isArray(pathProp) ? pathProp : [pathProp];

  return (
    <div className={cn("grid gap-4", gridColsClass, classNames?.grid)}>
      {items.map((item, idx) => {
        const path = typeof item === "string" ? item : item.path;
        const title = typeof item === "string" ? undefined : item.title;
        const href = typeof item === "string" ? undefined : item.href;
        const className =
          typeof item === "string"
            ? classNames?.comp
            : item.className || classNames?.comp;

        return (
          <PreviewItem
            key={`${path}-${idx}`}
            path={path}
            title={title}
            href={href}
            className={className}
            wrapperClass={classNames?.wrapper}
          />
        );
      })}
    </div>
  );
}
