"use client";

import { TStoJSCodeBlock } from "@/components/ts2js-code-block";
import { fetchSource, type SourceResponse } from "@/lib/fetch-source";
import React, { useEffect, useState } from "react";
import { TabsProps } from "./ui/core/tabs";

export function ComponentSource({
  comp,
  tone = "underline",
  width,
  isReact = true,
}: {
  comp: string;
  tone?: TabsProps["tone"];
  width?: TabsProps["width"];
  isReact?: boolean;
}) {
  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const controller = new AbortController();

    const loadSource = async () => {
      setLoading(true);

      try {
        const fullPath = `${comp}`;
        const res: SourceResponse | null = await fetchSource(fullPath);

        if (!res || !res.files?.length) {
          setCode("");
          return;
        }

        const expected = `${comp}.tsx`;
        const main = res.files.find((f) => f.name === expected) ?? res.files[0];

        setCode(main.code || main.content);
      } catch (error) {
        console.error("Failed to fetch component source:", error);
        setCode("");
      } finally {
        setLoading(false);
      }
    };

    loadSource();

    return () => controller.abort();
  }, [comp]);

  return (
    <TStoJSCodeBlock
      isReact={isReact}
      code={code}
      title={comp}
      tone={tone}
      loading={loading}
      width={width}
    />
  );
}
