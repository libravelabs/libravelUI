"use client";

import React, { useMemo } from "react";
import { runtimeRegistry } from "@/generated/runtime-registry";
import { PlaygroundProvider, usePlayground } from "./playground-context";
import { Controls } from "./controls";
import { CodeBlock } from "@/components/docs/code-block";
import { PreviewContainer } from "@/components/docs/preview-container";
import { Skeleton, SkeletonText } from "@/components/ui/core/skeleton";
import { Button, ButtonGroup } from "@/components/ui/core/button";
import { LayoutPanelLeft, RefreshCw, Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { useComponentSource } from "@/hooks/use-component-source";
import { playgroundParser } from "./playground-parser";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Tabs,
  TabList,
  TabTrigger,
  TabContent,
} from "@/components/ui/core/tabs";
import type { ControlsMap, PlaygroundProps } from "./types";

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

interface PlaygroundContentProps extends PlaygroundProps {
  resolvedPath: string;
}

interface PlaygroundContentProps extends PlaygroundProps {
  resolvedPath: string;
  hideToolbar?: boolean;
}

function PlaygroundContent({
  resolvedPath,
  Component: ComponentProp,
  controls: controlsProp,
  template,
  orientation: orientationProp,
  hideToolbar,
}: PlaygroundContentProps) {
  const {
    values,
    direction,
    refresh,
    controls: contextControls,
  } = usePlayground();
  const { code: sourceCode, loading } = useComponentSource(resolvedPath);
  const isMobile = useIsMobile();

  const registryEntry =
    runtimeRegistry[resolvedPath as keyof typeof runtimeRegistry];

  const Component = useMemo(() => {
    if (ComponentProp) return ComponentProp;
    if (!registryEntry) return null;
    return (registryEntry as any).Component || (registryEntry as any);
  }, [ComponentProp, registryEntry]);

  const controls = controlsProp || contextControls;

  const orientation = orientationProp || (isMobile ? "vertical" : "horizontal");

  const code = useMemo(
    () =>
      playgroundParser(
        sourceCode || "",
        values as Record<string, string | number | boolean>,
        controls,
        resolvedPath,
        template,
      ),
    [sourceCode, values, controls, resolvedPath, template],
  );

  const hasControls = Boolean(controls && Object.keys(controls).length > 0);

  if (loading) {
    return <PlaygroundSkeleton hasControls={hasControls} isMobile={isMobile} />;
  }

  const previewArea = Component ? (
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
  ) : null;

  if (orientation === "vertical" || !Component) {
    return (
      <div className="bg-card rounded-2xl border border-border overflow-hidden flex flex-col w-full">
        <div key={refresh.key} dir={direction} className="flex flex-col w-full">
          {!hideToolbar && (
            <div className="flex items-center justify-end gap-2 p-3 border-b border-border">
              <Toolbar />
            </div>
          )}

          {Component && (
            <div className="h-[350px] relative border-b border-border overflow-visible">
              {previewArea}
            </div>
          )}

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
        {!hideToolbar && (
          <div className="flex items-center justify-end gap-2 border-b border-border p-3">
            <Toolbar />
          </div>
        )}

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

function resolveRegistryKey(comp: string) {
  if (!comp) return "";

  const normalized = comp
    .replace(/\.(tsx|ts|jsx|js)$/, "")
    .replace(/^\/+|\/+$/g, "");

  if (runtimeRegistry[normalized as keyof typeof runtimeRegistry])
    return normalized;

  const keys = Object.keys(runtimeRegistry);
  if (keys.includes(normalized)) return normalized;

  const match = keys.find(
    (key) =>
      key.endsWith(normalized) || key.endsWith(normalized.replace(".demo", "")),
  );
  return match || normalized;
}

export function Playground(props: PlaygroundProps) {
  const { path, controls: controlsProp } = props;
  const [activeTab, setActiveTab] = React.useState<string>(() => {
    if (Array.isArray(path)) return path[0] || "";
    return path || "";
  });
  const [autoControls, setAutoControls] = React.useState<
    ControlsMap | undefined
  >(undefined);

  const resolvedPath = useMemo(
    () => resolveRegistryKey(activeTab),
    [activeTab],
  );

  React.useEffect(() => {
    if (controlsProp) {
      setAutoControls(undefined);
      return;
    }

    const registryEntry =
      runtimeRegistry[resolvedPath as keyof typeof runtimeRegistry];

    if (registryEntry && (registryEntry as any).module) {
      (registryEntry as any).module().then((mod: any) => {
        setAutoControls(mod.controls || {});
      });
    } else {
      setAutoControls({});
    }
  }, [resolvedPath, controlsProp]);

  const controls = controlsProp || autoControls || {};

  if (Array.isArray(path)) {
    return (
      <PlaygroundProvider controls={controls}>
        <Tabs
          selectedKey={activeTab}
          onSelectionChange={(key) => setActiveTab(key as string)}
          width="full"
          className="bg-card rounded-2xl border border-border overflow-hidden w-full flex flex-col"
        >
          <div className="flex items-center justify-between border-b border-border p-1 px-3 min-h-[57px]">
            <TabList
              className="border-none bg-transparent p-0 gap-1 h-auto"
              tone="ghost"
              size="sm"
            >
              {path.map((p) => {
                const name = p.split("/").pop() || p;
                return (
                  <TabTrigger
                    key={p}
                    id={p}
                    className="selected:bg-muted selected:text-foreground text-muted-foreground px-3 py-1.5 h-8 text-xs font-medium rounded-lg"
                  >
                    {name}
                  </TabTrigger>
                );
              })}
            </TabList>
            <div className="flex items-center gap-2">
              <Toolbar />
            </div>
          </div>
          {path.map((p) => {
            const resolved = resolveRegistryKey(p);
            return (
              <TabContent
                key={p}
                id={p}
                className="p-0 border-none outline-none"
              >
                <PlaygroundContent
                  {...props}
                  path={p}
                  resolvedPath={resolved}
                  hideToolbar
                />
              </TabContent>
            );
          })}
        </Tabs>
      </PlaygroundProvider>
    );
  }

  return (
    <PlaygroundProvider controls={controls}>
      <PlaygroundContent {...props} resolvedPath={resolvedPath} />
    </PlaygroundProvider>
  );
}
