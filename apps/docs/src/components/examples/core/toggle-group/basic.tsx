"use client";

import {
  ToggleGroup,
  ToggleGroupProps,
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
