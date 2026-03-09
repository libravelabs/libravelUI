"use client";

import dynamic from "next/dynamic";
import { PreviewContainer } from "@/components/docs/preview-container";
import { Skeleton, SkeletonText } from "@/components/ui/core/skeleton";
import { ComponentSource } from "@/components/docs/component-source";
import { useMemo } from "react";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/app/resizable";
import { useComponentSource } from "@/hooks/use-component-source";
import { CodeBlock } from "@/components/docs/code-block";

interface LegacyPlaygroundProps {
  comp: string;
  section?: string;
}

export function LegacyPlayground({
  comp,
  section = "core",
}: LegacyPlaygroundProps) {
  const { code, loading } = useComponentSource(
    `components/examples/${section}/${comp}`,
  );

  const PreviewComponent = useMemo(
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

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden divide-y w-full max-w-full">
      {loading ? (
        <>
          <div className="h-96 w-full flex items-center justify-center p-8">
            <Skeleton className="h-8 w-32" />
          </div>
          <div className="p-4 bg-muted/20">
            <Skeleton className="h-6 max-w-sm mb-4" />
            <SkeletonText lines={5} className="mb-2" />
          </div>
        </>
      ) : (
        <>
          <ResizablePanelGroup
            orientation="horizontal"
            className="h-full min-h-96 w-full max-w-full"
          >
            <ResizablePanel
              defaultSize="70%"
              minSize="30%"
              className="w-full max-w-full"
            >
              <div className="relative h-full overflow-hidden rounded-sm w-full max-w-full">
                <div className="absolute inset-0 bg-dots pointer-events-none" />
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-card/80 via-card/40 to-transparent" />
                </div>
                <PreviewContainer className="relative h-full px-4 py-2 flex items-center justify-center">
                  <PreviewComponent />
                </PreviewContainer>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel
              defaultSize="1%"
              minSize="1%"
              className="w-full max-w-full"
            />
          </ResizablePanelGroup>

          <div className="overflow-auto p-4 text-sm w-full max-w-full">
            <CodeBlock
              lang="tsx"
              code={code as string}
              className="bg-transparent border-none shadow-none rounded-none w-full max-w-full"
              codeblock={{ allowCopy: true }}
            />
          </div>
        </>
      )}
    </div>
  );
}
