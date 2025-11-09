"use client";

import { TStoJSCodeBlock } from "@/components/ts2js-code-block";
import { fetchSource } from "@/lib/fetch-source";
import React, { useEffect, useState } from "react";
import { TabsProps } from "./ui/core/tabs";

export function ComponentSource({
  comp,
  variant = "underline",
  isReact = true,
}: {
  comp: string;
  variant?: TabsProps["variant"];
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
        const raw = await fetchSource(fullPath);
        setCode(raw?.trim() || "");
      } catch (error) {
        console.error("Failed to fetch component source:", error);
        setCode("");
      } finally {
        setLoading(false);
      }
    };

    loadSource();

    return () => {
      controller.abort();
    };
  }, [comp]);

  return (
    <TStoJSCodeBlock
      isReact={isReact}
      code={code}
      title={`${comp}`}
      variant={variant}
      loading={loading}
    />
  );
}
