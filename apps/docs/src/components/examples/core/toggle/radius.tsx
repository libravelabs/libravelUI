"use client";

import { Toggle } from "@/components/ui/core/toggle";

export default function ToggleRadiuses() {
  return (
    <div className="flex items-center gap-2">
      <Toggle tone="outline" radius="none">
        None
      </Toggle>
      <Toggle tone="outline" radius="sm">
        Small
      </Toggle>
      <Toggle tone="outline" radius="md">
        Medium
      </Toggle>
      <Toggle tone="outline" radius="lg">
        Large
      </Toggle>
      <Toggle tone="outline" radius="full">
        Full
      </Toggle>
    </div>
  );
}
