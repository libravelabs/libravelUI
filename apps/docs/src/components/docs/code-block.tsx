"use client";

import { cn } from "@/lib/utils";
import { type CodeBlockProps } from "fumadocs-ui/components/codeblock";
import {
  DynamicCodeBlock,
  type DynamicCodeblockProps,
} from "fumadocs-ui/components/dynamic-codeblock";

export function CodeBlock({
  className,
  classNames,
  icon,
  coloredIcon = false,
  ...props
}: DynamicCodeblockProps &
  CodeBlockProps & {
    coloredIcon?: boolean;
    classNames?: {
      dynamicCodeBlock?: CodeBlockProps["className"];
      codeblock?: CodeBlockProps["className"];
    };
  }) {
  const normalizedLang = props.lang?.toLowerCase() ?? "";

  const iconClass = icon ?? (
    <i
      className={`devicon-${normalizedLang}-plain ${coloredIcon && "colored"}`}
      aria-hidden="true"
    />
  );

  return (
    <DynamicCodeBlock
      {...props}
      codeblock={{
        "data-line-numbers": true,
        icon: iconClass,
        title: props.title,
        className: cn(className ?? classNames?.codeblock),
        ...props.codeblock,
      }}
    />
  );
}
