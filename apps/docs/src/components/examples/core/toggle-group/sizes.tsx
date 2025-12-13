"use client";

import {
  ToggleGroup,
  ToggleItem,
  type ToggleGroupProps,
} from "@/components/ui/core/toggle-group";
import { Bold, Italic, Underline } from "lucide-react";

const sizes = ["sm", "md", "lg", "xl"];

export default function ToggleGroupSizes() {
  return (
    <div className="grid gap-4">
      {sizes.map((size) => (
        <ToggleGroup key={size} size={size as ToggleGroupProps["size"]}>
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
      ))}
    </div>
  );
}
