"use client";

import dynamic from "next/dynamic";
import { PreviewContainer } from "@/components/docs/preview-container";
import { Loader } from "@/components/ui/core/loader";
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
        loading: () => <Loader />,
      }),
    [section, comp],
  );

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden divide-y">
      <ResizablePanelGroup orientation="horizontal" className="h-full min-h-96">
        <ResizablePanel defaultSize="70%" minSize="30%">
          <div className="relative h-full overflow-hidden rounded-sm">
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
        <ResizablePanel defaultSize="1%" minSize="1%" />
      </ResizablePanelGroup>

      <div className="overflow-auto p-4 text-sm">
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
