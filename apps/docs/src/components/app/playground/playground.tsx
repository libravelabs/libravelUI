"use client";

import React, { useMemo, useRef, useLayoutEffect, useState } from "react";
import dynamic from "next/dynamic";
import { registry, type RegistryKey } from "./registry";
import { PlaygroundProvider, usePlayground } from "./playground-context";
import { Controls } from "./controls";
import type { ControlsMap } from "./types";
import { Skeleton, SkeletonText } from "@/components/ui/core/skeleton";
import { PreviewContainer } from "@/components/docs/preview-container";
import { playgroundParser } from "./playground-parser";
import { useComponentSource } from "@/hooks/use-component-source";
import { Button, ButtonGroup } from "@/components/ui/core/button";
import { LayoutPanelLeft, RefreshCw, Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { CodeBlock } from "@/components/docs/code-block";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useIsMobile } from "@/hooks/use-mobile";

function Toolbar() {
  const { direction, refresh, handleRefresh, handleDirection } =
    usePlayground();

  return (
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
}

function CodePanel({ code }: { code: string }) {
  const { isCopied, copyToClipboard } = useCopyToClipboard();
  return (
    <>
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
      <div className="bg-card/80 p-1 w-full overflow-hidden">
        <CodeBlock
          lang="tsx"
          code={code}
          className="bg-transparent border-none shadow-none rounded-none"
          codeblock={{ allowCopy: false }}
        />
      </div>
    </>
  );
}

function PlaygroundSkeleton({
  hasControls,
  isMobile,
}: {
  hasControls: boolean;
  isMobile: boolean;
}) {
  const codeSection = (
    <div className="border-t border-border">
      <div className="flex flex-wrap items-center justify-between px-4 py-3 border-b border-border bg-muted/50 gap-2">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-6 w-16" />
      </div>
      <div className="p-4 bg-card/80">
        <SkeletonText lines={4} />
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <div className="bg-card rounded-2xl border border-border overflow-hidden flex flex-col w-full">
        <div className="flex items-center justify-end gap-2 p-3 border-b border-border">
          <Skeleton className="h-8 w-16" />
        </div>
        <div className="h-[350px] flex items-center justify-center p-8 border-b border-border">
          <Skeleton className="h-8 w-32" />
        </div>
        {hasControls && (
          <div className="p-4 bg-card/50 border-b border-border">
            <Skeleton className="h-4 w-32 mb-4" />
            <SkeletonText lines={3} />
          </div>
        )}
        {codeSection}
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden w-full">
      <div className="flex items-center justify-end gap-2 p-3 border-b border-border">
        <Skeleton className="h-8 w-16" />
      </div>
      <div
        className={cn(
          "grid min-h-[480px]",
          hasControls ? "grid-cols-12" : "grid-cols-1",
        )}
      >
        {hasControls && (
          <div className="col-span-3 p-6 bg-card border-r border-border">
            <Skeleton className="h-4 w-32 mb-4" />
            <SkeletonText lines={5} />
          </div>
        )}
        <div
          className={cn(
            "flex items-center justify-center p-8",
            hasControls ? "col-span-9" : "col-span-1",
          )}
        >
          <Skeleton className="h-8 w-32" />
        </div>
      </div>
      {codeSection}
    </div>
  );
}

interface PlaygroundContentProps {
  compName: string;
  Component: React.ComponentType;
  hasControls: boolean;
  section: "core" | "motion";
  template?: (props: string, children: string | null) => string;
}

function PlaygroundContent({
  compName,
  Component,
  hasControls,
  section = "core",
  template,
}: PlaygroundContentProps) {
  const { values, controls, direction, refresh } = usePlayground();
  const { code: sourceCode, loading } = useComponentSource(
    `components/examples/${section}/${compName}`,
  );
  const code = useMemo(
    () =>
      playgroundParser(
        sourceCode || "",
        values as Record<string, string | number | boolean>,
        controls,
        template,
      ),
    [sourceCode, values, controls, template],
  );
  const isMobile = useIsMobile();

  if (loading) {
    return <PlaygroundSkeleton hasControls={hasControls} isMobile={isMobile} />;
  }

  const previewArea = (
    <div className="relative h-full overflow-visible">
      <div className="absolute inset-0 bg-dots pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-card/80 via-card/40 to-transparent pointer-events-none" />
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
      <div className="bg-card rounded-2xl border border-border overflow-hidden flex flex-col w-full">
        <div key={refresh.key} dir={direction} className="flex flex-col w-full">
          <div className="flex items-center justify-end gap-2 p-3 border-b border-border">
            <Toolbar />
          </div>
          <div className="h-[350px] relative border-b border-border overflow-visible">
            {previewArea}
          </div>
          {hasControls && (
            <div className="p-4 bg-card/50 border-b border-border">
              <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-4">
                Component Configuration
              </div>
              <Controls />
            </div>
          )}
        </div>
        <div className="border-t border-border">
          <CodePanel code={code} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden w-full">
      <div key={refresh.key} dir={direction} className="flex flex-col w-full">
        <div className="flex items-center justify-end gap-2 border-b border-border">
          <Toolbar />
        </div>
        <div
          className={cn(
            "grid min-h-[480px]",
            hasControls ? "grid-cols-12" : "grid-cols-1",
          )}
        >
          {hasControls && (
            <div className="col-span-3 border-r border-border overflow-y-auto p-6 bg-card">
              <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-4">
                Component Configuration
              </div>
              <Controls />
            </div>
          )}
          <div
            className={cn(
              "relative",
              hasControls ? "col-span-9" : "col-span-1",
            )}
          >
            {previewArea}
          </div>
        </div>
        <div className="border-t border-border">
          <CodePanel code={code} />
        </div>
      </div>
    </div>
  );
}

function FallbackContent({ comp, section }: { comp: string; section: string }) {
  const { direction, refresh } = usePlayground();
  const { code, loading } = useComponentSource(
    `components/examples/${section}/${comp}`,
  );
  const isMobile = useIsMobile();

  const DynamicComponent = useMemo(
    () =>
      dynamic(() => import(`@/components/examples/${section}/${comp}`), {
        ssr: false,
        loading: () => (
          <div className="flex w-full items-center justify-center p-8">
            <Skeleton className="h-6 w-24" />
          </div>
        ),
      }),
    [section, comp],
  );

  if (loading) {
    return <PlaygroundSkeleton hasControls={false} isMobile={isMobile} />;
  }

  const previewHeight = isMobile ? "h-[350px]" : "min-h-[480px]";

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden w-full">
      <div key={refresh.key} dir={direction} className="flex flex-col w-full">
        <div className="flex items-center justify-end gap-2 p-3 border-b border-border">
          <Toolbar />
        </div>
        <div
          className={cn(
            "relative flex items-center justify-center w-full",
            previewHeight,
          )}
        >
          <div className="absolute inset-0 bg-dots pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-card/80 via-card/40 to-transparent pointer-events-none" />
          <PreviewContainer className="relative z-10 flex w-full items-center justify-center p-8">
            <React.Suspense
              fallback={
                <div className="flex w-full items-center justify-center p-8">
                  <Skeleton className="h-6 w-24" />
                </div>
              }
            >
              <DynamicComponent />
            </React.Suspense>
          </PreviewContainer>
        </div>
      </div>
      <div className="border-t border-border">
        <CodePanel code={code ?? ""} />
      </div>
    </div>
  );
}

interface PlaygroundProps {
  comp: RegistryKey;
  section?: "core" | "motion";
  orientation?: "horizontal" | "vertical";
}

export function Playground({ comp, section = "core" }: PlaygroundProps) {
  const entry = registry[comp];

  if (!entry) {
    return (
      <PlaygroundProvider>
        <FallbackContent comp={comp} section={section} />
      </PlaygroundProvider>
    );
  }

  const controls = (entry as { controls?: ControlsMap }).controls;
  const hasControls = Boolean(controls && Object.keys(controls).length > 0);

  return (
    <PlaygroundProvider controls={controls}>
      <PlaygroundContent
        section={section}
        compName={comp}
        Component={entry.default}
        hasControls={hasControls}
        template={
          (
            entry as {
              template?: (props: string, children: string | null) => string;
            }
          ).template
        }
      />
    </PlaygroundProvider>
  );
}
