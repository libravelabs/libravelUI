"use client";

import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";

export function Anatomy({ code }: { code: string }) {
  return <DynamicCodeBlock code={code} lang="tsx" />;
}
