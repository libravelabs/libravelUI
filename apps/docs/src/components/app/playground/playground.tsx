"use client";

import React, { useMemo, useRef, useLayoutEffect, useState } from "react";
import { registry, type RegistryKey } from "./registry";
import { PlaygroundProvider, usePlayground } from "./playground-context";
import { Controls } from "./controls";
import { Skeleton, SkeletonText } from "@/components/ui/core/skeleton";
import { PreviewContainer } from "@/components/docs/preview-container";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/app/resizable";
import { LegacyPlayground } from "./legacy-playground";
import { playgroundParser } from "./playground-parser";
import { useComponentSource } from "@/hooks/use-component-source";
import { Button, ButtonGroup } from "@/components/ui/core/button";
import { LayoutPanelLeft, RefreshCw, Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { CodeBlock } from "@/components/docs/code-block";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useIsMobile } from "@/hooks/use-mobile";

function usePreviewSize(trigger: unknown) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const update = () => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setSize({ w: Math.round(rect.width), h: Math.round(rect.height) });
      }
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [trigger]);

  return { ref, size };
}

interface PlaygroundContentProps {
  compName: string;
  Component: React.ComponentType;
  section: "core" | "motion";
  orientation: "horizontal" | "vertical";
  template?: (props: string, children: string | null) => string;
}

function PlaygroundContent({
  compName,
  Component,
  section = "core",
  orientation,
  template,
}: PlaygroundContentProps) {
  const {
    values,
    controls,
    direction,
    refresh,
    handleRefresh,
    handleDirection,
  } = usePlayground();

  const { code: sourceCode, loading } = useComponentSource(
    `components/examples/${section}/${compName}`,
  );

  const code = useMemo(() => {
    return playgroundParser(
      sourceCode || "",
      values as Record<string, string | number | boolean>,
      controls,
      template,
    );
  }, [sourceCode, values, controls, template]);

  const { ref: previewRef, size } = usePreviewSize(refresh.key);
  const { isCopied, copyToClipboard } = useCopyToClipboard();
  const isMobile = useIsMobile();

  if (loading) {
    if (isMobile) {
      return (
        <div className="bg-card rounded-2xl border border-border overflow-hidden flex flex-col w-full max-w-full">
          <div className="flex items-center justify-end gap-2 p-3 border-b border-border">
            <Skeleton className="h-8 w-16" />
          </div>
          <div className="h-[350px] relative border-b border-border overflow-hidden flex items-center justify-center p-8">
            <Skeleton className="h-8 w-32" />
          </div>
          <div className="p-4 bg-card/50 border-b border-border overflow-hidden">
            <Skeleton className="h-4 w-32 mb-4" />
            <SkeletonText lines={3} />
          </div>
          <div className="w-full max-w-full overflow-hidden">
            <div className="flex flex-wrap items-center justify-between px-4 py-3 border-b border-border bg-muted/50 gap-2">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-6 w-16" />
            </div>
            <div className="p-4 bg-card/80">
              <SkeletonText lines={4} />
            </div>
          </div>
        </div>
      );
    }

    if (orientation === "vertical") {
      return (
        <div className="bg-card rounded-2xl border border-border overflow-hidden divide-y w-full max-w-full">
          <div className="w-full max-w-full">
            <div className="flex items-center justify-end gap-2 p-4 border-b">
              <Skeleton className="h-8 w-16" />
            </div>
            <div className="flex h-96 w-full max-w-full">
              <div className="w-[75%] flex flex-col items-center justify-center border-r p-8">
                <Skeleton className="h-8 w-32" />
              </div>
              <div className="w-[25%] p-4 bg-card/50">
                <Skeleton className="h-4 w-32 mb-4" />
                <SkeletonText lines={4} />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between px-4 py-3 border-b border-border bg-muted/50 gap-2">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-6 w-16" />
          </div>
          <div className="p-4 bg-card/80">
            <SkeletonText lines={5} />
          </div>
        </div>
      );
    }

    return (
      <section className="relative w-full max-w-full">
        <div className="bg-card rounded-2xl border border-border overflow-hidden w-full max-w-full">
          <div className="flex min-h-[480px]">
            <div className="w-[22%] p-6 bg-card border-r border-border">
              <Skeleton className="h-4 w-32 mb-4" />
              <SkeletonText lines={5} />
            </div>
            <div className="w-[50%] flex items-center justify-center p-8">
              <Skeleton className="h-8 w-32" />
            </div>
            <div className="w-[28%] border-l border-border bg-card/80 flex flex-col">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/50">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-6 w-16" />
              </div>
              <div className="p-4">
                <SkeletonText lines={6} />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const toolbar = (
    <ButtonGroup>
      <Button
        tone="outline"
        className="bg-secondary/20 border-2"
        iconOnly
        onClick={handleDirection}
      >
        <LayoutPanelLeft
          className={cn(
            "size-4 text-foreground/60 transition-transform",
            direction === "rtl" && "rotate-180",
          )}
        />
      </Button>
      <Button
        onClick={handleRefresh}
        tone="outline"
        className="bg-secondary/20 border-2"
        iconOnly
      >
        <RefreshCw
          className="size-4 text-foreground/60 transition-transform duration-500"
          style={{ transform: `rotate(${refresh.rotation}deg)` }}
        />
      </Button>
    </ButtonGroup>
  );

  const preview = (
    <div className="relative h-full overflow-hidden" ref={previewRef}>
      <div className="absolute inset-0 bg-dots pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-card/80 via-card/40 to-transparent pointer-events-none" />
      {orientation === "horizontal" && (
        <div className="absolute right-4 top-4 z-10 flex items-center gap-2">
          {size && (
            <div className="rounded-full bg-card px-3 py-1 text-xs text-foreground/60">
              W: {size.w}px &nbsp; H: {size.h}px
            </div>
          )}
          {toolbar}
        </div>
      )}
      <PreviewContainer className="relative flex h-full items-center justify-center">
        <React.Suspense
          fallback={
            <div className="flex w-full items-center justify-center p-8">
              <Skeleton className="h-6 w-24" />
            </div>
          }
        >
          <Component {...values} />
        </React.Suspense>
      </PreviewContainer>
    </div>
  );

  if (isMobile) {
    return (
      <div className="bg-card rounded-2xl border border-border overflow-hidden flex flex-col w-full max-w-full">
        <div
          key={refresh.key}
          dir={direction}
          className="flex flex-col w-full max-w-full"
        >
          <div className="flex items-center justify-end gap-2 p-3 border-b border-border">
            {toolbar}
          </div>
          <div className="h-[350px] relative border-b border-border overflow-hidden">
            {preview}
          </div>
          <div className="p-4 bg-card/50 border-b border-border overflow-hidden">
            <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-4">
              Component Configuration
            </div>
            <Controls />
          </div>
        </div>
        <div className="w-full max-w-full overflow-hidden">
          <div className="flex flex-wrap items-center justify-between px-4 py-3 border-b border-border bg-muted/50 gap-2">
            <span className="text-xs font-mono text-muted-foreground">
              Usage
            </span>
            <Button
              tone="outline"
              size="sm"
              className="text-[10px] uppercase tracking-wide font-medium text-primary gap-1.5"
              onClick={() => copyToClipboard(code)}
            >
              {isCopied ? (
                <Check className="size-3" />
              ) : (
                <Copy className="size-3" />
              )}
              {isCopied ? "Copied" : "Copy"}
            </Button>
          </div>
          <div className="bg-card/80 p-1 w-full max-w-full overflow-hidden">
            <CodeBlock
              lang="tsx"
              code={code}
              className="bg-transparent border-none shadow-none rounded-none"
              codeblock={{ allowCopy: false }}
            />
          </div>
        </div>
      </div>
    );
  }

  if (orientation === "vertical") {
    return (
      <div className="bg-card rounded-2xl border border-border overflow-hidden divide-y w-full max-w-full">
        <div key={refresh.key} dir={direction} className="w-full max-w-full">
          <div className="flex items-center justify-end gap-2 p-4 border-b">
            {toolbar}
          </div>
          <ResizablePanelGroup
            orientation="horizontal"
            className="h-full min-h-96 w-full max-w-full"
          >
            <ResizablePanel
              defaultSize="75%"
              minSize="30%"
              className="w-full max-w-full"
            >
              {preview}
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel
              defaultSize="30%"
              minSize="1%"
              className="w-full max-w-full"
            >
              <div className="h-full overflow-y-auto p-4 bg-card/50">
                <Controls />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
        <div className="flex flex-wrap items-center justify-between px-4 py-3 border-b border-border bg-muted/50 gap-2">
          <span className="text-xs font-mono text-muted-foreground">Usage</span>
          <Button
            tone="outline"
            size="sm"
            className="text-[10px] uppercase tracking-wide font-medium text-primary gap-1.5"
            onClick={() => copyToClipboard(code)}
          >
            {isCopied ? (
              <Check className="size-3" />
            ) : (
              <Copy className="size-3" />
            )}
            {isCopied ? "Copied" : "Copy"}
          </Button>
        </div>
        <div className="h-full bg-card/80 p-1 w-full max-w-full overflow-hidden">
          <CodeBlock
            lang="tsx"
            code={code}
            className="bg-transparent border-none shadow-none rounded-none"
            codeblock={{ allowCopy: false }}
          />
        </div>
      </div>
    );
  }

  return (
    <section className="relative w-full max-w-full">
      <div className="bg-card rounded-2xl border border-border overflow-hidden w-full max-w-full">
        <div
          key={refresh.key}
          dir={direction}
          className="h-full w-full max-w-full"
        >
          <ResizablePanelGroup
            orientation="horizontal"
            className="min-h-[480px]"
          >
            <ResizablePanel defaultSize="22%" minSize="18%">
              <div className="p-6 bg-card">
                <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-4">
                  Component Configuration
                </div>
                <Controls />
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize="50%" minSize="30%">
              {preview}
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize="28%" minSize="20%">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/50">
                <span className="text-xs font-mono text-muted-foreground">
                  Usage
                </span>
                <Button
                  tone="outline"
                  size="sm"
                  className="text-[10px] uppercase tracking-wide font-medium text-primary gap-1.5"
                  onClick={() => copyToClipboard(code)}
                >
                  {isCopied ? (
                    <Check className="size-3" />
                  ) : (
                    <Copy className="size-3" />
                  )}
                  {isCopied ? "Copied" : "Copy"}
                </Button>
              </div>
              <div className="h-full bg-card/80 p-1">
                <CodeBlock
                  lang="tsx"
                  code={code}
                  className="bg-transparent border-none shadow-none rounded-none"
                  codeblock={{ allowCopy: false }}
                />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </section>
  );
}

interface PlaygroundProps {
  comp: RegistryKey;
  section?: "core" | "motion";
  orientation?: "horizontal" | "vertical";
}

export function Playground({
  comp,
  section = "core",
  orientation = "vertical",
}: PlaygroundProps) {
  const Component = registry[comp as RegistryKey];

  if (!Component) {
    return <LegacyPlayground comp={comp} section={section} />;
  }

  return (
    <PlaygroundProvider controls={Component.controls as any}>
      <PlaygroundContent
        section={section}
        compName={comp}
        Component={Component.default}
        orientation={orientation}
        template={
          (
            Component as {
              template: (props: string, children: string | null) => string;
            }
          ).template
        }
      />
    </PlaygroundProvider>
  );
}
