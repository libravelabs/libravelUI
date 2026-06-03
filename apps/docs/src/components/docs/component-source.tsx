"use client";

import { TStoJSCodeBlock } from "./ts2js-code-block";
import { useComponentCode } from "@/hooks/use-component-source";

export function ComponentSource({
  comp,
  tone = "underline",
  isReact = true,
  title,
}: Pick<
  React.ComponentProps<typeof TStoJSCodeBlock>,
  "title" | "tone" | "isReact"
> & {
  comp: string;
}) {
  const { code, loading } = useComponentCode(comp);

  return (
    <TStoJSCodeBlock
      isReact={isReact}
      code={code}
      title={title ?? comp}
      tone={tone}
      loading={loading}
    />
  );
}
