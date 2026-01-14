"use client";

import * as React from "react";
import { ts2js } from "@/lib/ts2js";
import { DocTabs } from "./doc-tabs";
import { TabsProps } from "./ui/core/tabs";
import { cn } from "@/lib/utils";
import { Loader } from "./ui/core/loader";
import { CodeBlock } from "./code-block";

interface TStoJSCodeBlockProps {
  code: string;
  title?: string;
  isReact?: boolean;
  tone?: TabsProps["tone"];
  width?: TabsProps["width"];
  orientation?: TabsProps["orientation"];
  loading?: boolean;
  showJS?: boolean;
}

export function TStoJSCodeBlock({
  code,
  title,
  isReact = false,
  tone = "ghost",
  width,
  loading = false,
  showJS = true,
  orientation,
}: TStoJSCodeBlockProps) {
  const tsFileName = title ? `${title}${isReact ? ".tsx" : ".ts"}` : "";
  const jsFileName = title ? `${title}${isReact ? ".jsx" : ".js"}` : "";

  const tsLang = isReact ? "react" : "typescript";
  const jsLang = isReact ? "react" : "javascript";

  const [jsCode, setJsCode] = React.useState("");

  React.useEffect(() => {
    if (!showJS) return;

    const transform = async () => {
      try {
        const result = await ts2js(code);
        setJsCode(result);
      } catch (error) {
        console.warn("[TStoJSCodeBlock] Failed to transpile TS → JS:", error);
      }
    };
    transform();
  }, [code, showJS]);

  const tabs = [
    {
      label: (
        <>
          <i className="devicon-typescript-plain colored" aria-hidden="true" />{" "}
          TypeScript
        </>
      ),
      value: "typescript",
      lang: tsLang,
      content: code,
      fileName: tsFileName,
    },
    ...(showJS
      ? [
          {
            label: (
              <>
                <i
                  className="devicon-javascript-plain colored"
                  aria-hidden="true"
                />{" "}
                JavaScript
              </>
            ),
            value: "javascript",
            lang: jsLang,
            content: jsCode,
            fileName: jsFileName,
          },
        ]
      : []),
  ];

  if (loading) {
    return <Loader />;
  }

  return (
    <DocTabs
      orientation={orientation}
      tone={tone}
      width={width}
      classNames={{
        content: cn("bg-transparent p-0"),
      }}
      items={tabs.map(({ label, value, lang, content, fileName }) => ({
        label,
        value,
        content: (
          <div className="relative">
            <CodeBlock
              lang={lang}
              code={content}
              title={fileName}
              classNames={{
                codeblock: cn(
                  tone === "underline" && "shadow-none border-none"
                ),
              }}
            />
          </div>
        ),
      }))}
    />
  );
}
