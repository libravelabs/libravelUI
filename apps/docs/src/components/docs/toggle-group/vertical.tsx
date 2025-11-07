"use client";

import { ToggleGroup, ToggleItem } from "@/components/ui/toggle-group";
import { Bold, Italic, Underline } from "lucide-react";

export default function VerticalToggleGroup() {
  return (
    <ToggleGroup orientation="vertical">
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
