"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { DocTabs } from "@/components/doc-tabs";
import { PreviewContainer } from "@/components/preview-container";
import { fetchSource } from "@/lib/fetch-source";
import { Loader } from "@/components/ui/loader";
import { TStoJSCodeBlock } from "./ts2js-code-block";

interface PlaygroundProps {
  comp: string;
}

export function Playground({ comp }: PlaygroundProps) {
  const [source, setSource] = useState<string | null>(null);
  const [code, setCode] = useState<string | null>(null);

  const Demo = dynamic(() => import(`@/components/docs/${comp}`), {
    ssr: false,
    loading: () => <Loader />,
  });

  useEffect(() => {
    const fullPath = `components/docs/${comp}`;

    fetchSource(fullPath).then((raw) => {
      if (!raw) return setSource(null);
      setSource(raw);

      let code = raw.trim();
      code = code.replace(/^["']use client["'];?\s*\n+/m, "");
      code = code.replace(/export\s+default\s+[a-zA-Z0-9_$]+;?$/gm, "");
      code = code.replace(
        /export\s+default\s+function\s+([a-zA-Z0-9_$]+)?\s*\(/,
        "export function Component("
      );
      code = code.replace(/export\s+default\s+[a-zA-Z0-9_$]+/g, "");

      setCode(code);
    });
  }, [comp]);

  if (!code) {
    return (
      <PreviewContainer hideButtons>
        <p className="text-muted-foreground text-sm">Loading source code...</p>
      </PreviewContainer>
    );
  }

  return (
    <DocTabs
      items={[
        {
          label: "Preview",
          value: "preview",
          content: (
            <PreviewContainer>
              <Demo />
            </PreviewContainer>
          ),
        },
        {
          label: "Code",
          value: "code",
          content: <TStoJSCodeBlock code={code} isReact title={comp} />,
        },
      ]}
    />
  );
}
