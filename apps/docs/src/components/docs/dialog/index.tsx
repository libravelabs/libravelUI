"use client";

import { useState } from "react";
import { Playground } from "@/components/playground";
import { BasicDialogBase, BasicDialogCode } from "./basic-dialog";
import { DialogSizesBase, getDialogSizesCode } from "./dialog-sizes";

export function BasicDialog() {
  return <Playground preview={<BasicDialogBase />} code={BasicDialogCode} />;
}

export function DialogSizes() {
  const [size, setSize] = useState<
    "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full"
  >("md");

  return (
    <Playground
      preview={<DialogSizesBase size={size} onSizeChange={setSize} />}
      code={getDialogSizesCode(size)}
    />
  );
}
