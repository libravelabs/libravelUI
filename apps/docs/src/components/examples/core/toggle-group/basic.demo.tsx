"use client";

import {
  ToggleGroup,
  type ToggleGroupProps,
  ToggleItem,
} from "@/components/ui/core/toggle-group";
import { Bold, Italic, Underline } from "lucide-react";

export default function BasicToggleGroup({
  selectionMode = "multiple",
  orientation = "horizontal",
  size = "md",
  isDisabled = false,
}: ToggleGroupProps) {
  return (
    <ToggleGroup
      size={size}
      selectionMode={selectionMode}
      orientation={orientation}
      isDisabled={isDisabled}
    >
      <ToggleItem id="bold">
        <Bold />
      </ToggleItem>
      <ToggleItem id="italic">
        <Italic />
      </ToggleItem>
      <ToggleItem id="underline">
        <Underline />
      </ToggleItem>
    </ToggleGroup>
  );
}

export const controls = {
  selectionMode: {
    type: "toggle-group",
    options: [
      { value: "single", label: "Single" },
      { value: "multiple", label: "Multiple" },
    ],
    defaultValue: "single",
    label: "Selection Mode",
  },
  orientation: {
    type: "toggle-group",
    options: [
      { value: "horizontal", label: "Horizontal" },
      { value: "vertical", label: "Vertical" },
    ],
    defaultValue: "horizontal",
    label: "Orientation",
  },
  size: {
    type: "select",
    options: [
      { value: "sm", label: "Small" },
      { value: "md", label: "Medium" },
      { value: "lg", label: "Large" },
      { value: "xl", label: "Extra Large" },
    ],
    defaultValue: "md",
    label: "Size",
  },
  isDisabled: {
    type: "boolean",
    defaultValue: false,
    label: "Disabled",
  },
};
