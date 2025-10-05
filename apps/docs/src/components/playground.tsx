"use client";

import { PreviewContainer } from "./preview-container";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import { DocTabs } from "./doc-tabs";
import * as React from "react";

interface PlaygroundProps {
  preview: React.ReactElement;
  lang?: string;
  code: string;
}

export function Playground({ preview, lang = "tsx", code }: PlaygroundProps) {
  if (!preview) {
    return <DynamicCodeBlock lang={lang} code={code} />;
  }

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
