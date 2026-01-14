"use client";

import React, { useMemo } from "react";
import { registry, type RegistryKey } from "./registry";
import { PlaygroundProvider, usePlayground } from "./playground-context";
import { Controls } from "./controls";

import { PreviewContainer } from "@/components/preview-container";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/app/resizable";
import { TStoJSCodeBlock } from "@/components/ts2js-code-block";
import { LegacyPlayground } from "./legacy-playground";
import { playgroundParser } from "./playground-parser";
import { useComponentSource } from "@/hooks/use-component-source";
import { Button, ButtonGroup } from "@/components/ui/core/button";
import { LayoutPanelLeft, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlaygroundContentProps {
  compName: string;
  Component: React.ComponentType;
  section: "core" | "motion";
}

function PlaygroundContent({
  compName,
  Component,
  section = "core",
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
    `components/examples/${section}/${compName}`
  );

  const code = useMemo(() => {
    return playgroundParser(sourceCode || "", values, controls);
  }, [sourceCode, values, controls]);

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden divide-y">
      <div key={refresh.key} dir={direction}>
        <div className="flex items-center justify-end gap-2 p-4">
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
                  direction === "rtl" && "rotate-180"
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
        </div>
        <ResizablePanelGroup
          orientation="horizontal"
          className="h-full min-h-96"
        >
          <ResizablePanel defaultSize="75%" minSize="30%">
            <div className="relative h-full overflow-hidden rounded-sm">
              <div className="absolute inset-0 bg-dots pointer-events-none" />
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-card/80 via-card/40 to-transparent" />
              </div>

              <PreviewContainer className="relative h-full px-4 py-2 flex items-center justify-center">
                <Component {...values} />
              </PreviewContainer>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize="30%" minSize="1%">
            <div className="h-full overflow-y-auto p-4 bg-card/50">
              <Controls />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      <div className="overflow-auto p-4 text-sm">
        <TStoJSCodeBlock
          isReact
          title={compName}
          code={code}
          loading={loading}
        />
      </div>
    </div>
  );
}

interface PlaygroundProps {
  comp: RegistryKey;
  section?: "core" | "motion";
}

export function Playground({ comp, section = "core" }: PlaygroundProps) {
  const Component = registry[comp as RegistryKey];

  if (!Component) {
    return <LegacyPlayground comp={comp} section={section} />;
  }

  return (
    <PlaygroundProvider controls={Component.controls}>
      <PlaygroundContent
        section={section}
        compName={comp}
        Component={Component.default}
      />
    </PlaygroundProvider>
  );
}
