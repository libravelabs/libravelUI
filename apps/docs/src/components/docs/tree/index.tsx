"use client";

import { Playground } from "@/components/playground";
import { BasicTreeBase, BasicTreeCode } from "./basic-tree";
import {
  MultipleSelectionTreeBase,
  MultipleSelectionTreeCode,
} from "./multiple-selection-tree";
import { FolderTreeBase, FolderTreeCode } from "./folder-tree";

export function BasicTree() {
  return <Playground preview={<BasicTreeBase />} code={BasicTreeCode} />;
}

export function MultipleSelectionTree() {
  return (
    <Playground
      preview={<MultipleSelectionTreeBase />}
      code={MultipleSelectionTreeCode}
    />
  );
}

export function FolderTree() {
  return <Playground preview={<FolderTreeBase />} code={FolderTreeCode} />;
}
