"use client";

import dynamic from "next/dynamic";
import { PreviewContainer } from "@/components/preview-container";
import { Loader } from "@/components/ui/core/loader";
import { ComponentSource } from "@/components/component-source";
import {
  PlaygroundProvider,
  usePlayground,
} from "@/components/playground-context";
import { useMemo } from "react";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/app/resizable";

interface PlaygroundProps {
  comp: string;
  demo?: string;
  section?: string;
}

function PreviewWithControls({
  Component,
}: {
  Component: React.ComponentType;
}) {
  const { controls } = usePlayground() || {};
  return <Component {...controls} />;
}

export function Playground({ comp, demo, section = "core" }: PlaygroundProps) {
  const PreviewComponent = useMemo(
    () =>
      dynamic(() => import(`@/components/examples/${section}/${comp}`), {
        ssr: false,
        loading: () => <Loader />,
      }),
    [section, comp]
  );

  const ControlsComponent = useMemo(
    () =>
      demo
        ? dynamic(() => import(`@/components/examples/${section}/${demo}`), {
            ssr: false,
            loading: () => <Loader />,
          })
        : null,
    [section, demo]
  );

  return (
    <PlaygroundProvider>
      <div className="bg-card rounded-2xl border border-border overflow-hidden divide-y">
        <ResizablePanelGroup
          orientation="horizontal"
          className="h-full min-h-96"
        >
          <ResizablePanel defaultSize="70%" minSize="30%">
            <div className="relative h-full overflow-hidden rounded-sm">
              <div className="absolute inset-0 bg-dots pointer-events-none" />

              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-card/80 via-card/40 to-transparent" />
                {ControlsComponent && (
                  <div className="absolute inset-y-0 right-0 w-1/4 bg-linear-to-l from-card/80 via-card/40 to-transparent" />
                )}
              </div>

              <PreviewContainer
                hideButtons={!comp}
                className="relative h-full px-4 py-2 flex items-center justify-center"
              >
                <PreviewWithControls Component={PreviewComponent} />
              </PreviewContainer>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {ControlsComponent ? (
            <ResizablePanel defaultSize="30%">
              <div className="flex h-full w-full flex-col items-end overflow-y-auto p-4">
                <div className="w-full max-w-2xs">
                  <ControlsComponent />
                </div>
              </div>
            </ResizablePanel>
          ) : (
            <ResizablePanel defaultSize="1%" />
          )}
        </ResizablePanelGroup>

        <div className="overflow-auto p-4 text-sm">
          <ComponentSource comp={`components/examples/${section}/${comp}`} />
        </div>
      </div>
    </PlaygroundProvider>
  );
}
