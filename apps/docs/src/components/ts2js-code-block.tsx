"use client";

import * as React from "react";
import { ts2js } from "@/lib/ts2js";
import { DocTabs } from "./doc-tabs";
import { TabsProps } from "./ui/tabs";
import { cn } from "@/lib/utils";
import { PreviewContainer } from "./preview-container";
import { Loader } from "./ui/loader";
import { CodeBlock } from "./code-block";

interface TStoJSCodeBlockProps {
  code: string;
  title?: string;
  isReact?: boolean;
  variant?: TabsProps["variant"];
  loading?: boolean;
  showJS?: boolean;
}

export function TStoJSCodeBlock({
  code,
  title,
  isReact = false,
  variant = "ghost",
  loading = false,
  showJS = true,
}: TStoJSCodeBlockProps) {
  if (loading) {
    return (
      <PreviewContainer hideButtons>
        <Loader />
      </PreviewContainer>
    );
  }

  const tsFileName = title ? `${title}${isReact ? ".tsx" : ".ts"}` : "";
  const jsFileName = title ? `${title}${isReact ? ".jsx" : ".js"}` : "";

  const tsLang = isReact ? "react" : "typescript";
  const jsLang = isReact ? "react" : "javascript";

  let jsCode = "";
  try {
    jsCode = ts2js(code);
  } catch (error) {
    console.warn("[TStoJSCodeBlock] Failed to transpile TS → JS:", error);
  }

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

  return (
    <DocTabs
      variant={variant}
      classNames={{
        content: cn(variant === "underline" && "p-0"),
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
                  variant === "underline" && "shadow-none border-none"
                ),
              }}
            />
          </div>
        ),
      }))}
    />
  );
}
