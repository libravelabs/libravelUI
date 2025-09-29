"use client";

import { PreviewContainer } from "./PreviewContainer";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import { DocTabs } from "./doc-tabs";
import * as React from "react";

interface PlaygroundProps {
  preview: React.ReactElement;
  lang?: string;
  code: string;
}

export function Playground({ preview, lang = "tsx", code }: PlaygroundProps) {
  return (
    <DocTabs
      items={[
        {
          label: "Preview",
          value: "preview",
          content: <PreviewContainer>{preview}</PreviewContainer>,
        },
        {
          label: "Code",
          value: "code",
          content: <DynamicCodeBlock lang={lang} code={code} />,
        },
      ]}
    />
  );
}
