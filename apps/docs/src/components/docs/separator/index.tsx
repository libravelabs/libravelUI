"use client";

import { Playground } from "@/components/playground";
import { BasicSeparatorBase, BasicSeparatorCode } from "./basic-separator";
import {
  WithTextSeparatorBase,
  WithTextSeparatorCode,
} from "./with-text-separator";

export function BasicSeparator() {
  return (
    <Playground preview={<BasicSeparatorBase />} code={BasicSeparatorCode} />
  );
}

export function WithTextSeparator() {
  return (
    <Playground
      preview={<WithTextSeparatorBase />}
      code={WithTextSeparatorCode}
    />
  );
}
