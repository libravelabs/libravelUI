"use client";

import dynamic from "next/dynamic";
import { DocTabs } from "@/components/doc-tabs";
import { PreviewContainer } from "@/components/preview-container";
import { Loader } from "@/components/ui/core/loader";
import { ComponentSource } from "@/components/component-source";

import { PlaygroundProvider } from "@/components/playground-context";

import { useMemo } from "react";

interface PlaygroundProps {
  comp: string;
  demo?: string;
  section?: string;
}

export function Playground({ comp, demo, section = "core" }: PlaygroundProps) {
  const Demo = useMemo(
    () =>
      dynamic(
        () => import(`@/components/examples/${section}/${demo || comp}`),
        {
          ssr: false,
          loading: () => <Loader />,
        }
      ),
    [section, demo, comp]
  );

  return (
    <PlaygroundProvider>
      <DocTabs
        classNames={{
          wrapper: "bg-muted p-1 gap-0",
          tabList: "p-0 px-2",
          content: "p-0",
        }}
        items={[
          {
            label: "Preview",
            value: "preview",
            content: (
              <PreviewContainer hideButtons={!comp}>
                {comp ? <Demo /> : <Loader />}
              </PreviewContainer>
            ),
          },
          {
            label: "Code",
            value: "code",
            content: (
              <ComponentSource
                comp={`components/examples/${section}/${comp}`}
                tone="ghost"
              />
            ),
          },
        ]}
      />
    </PlaygroundProvider>
  );
}
