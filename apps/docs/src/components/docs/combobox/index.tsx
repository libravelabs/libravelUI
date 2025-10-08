"use client";

import { Playground } from "@/components/playground";
import BasicComboboxBase, { BasicComboboxCode } from "./basic-combobox";
import { GroupedComboBoxBase, GroupedComboBoxCode } from "./grouped-combobox";

export function BasicCombobox() {
  return (
    <Playground preview={<BasicComboboxBase />} code={BasicComboboxCode} />
  );
}

export function GroupedComboBox() {
  return (
    <Playground preview={<GroupedComboBoxBase />} code={GroupedComboBoxCode} />
  );
}
