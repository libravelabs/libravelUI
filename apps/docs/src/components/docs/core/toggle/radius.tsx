"use client";

import { Toggle } from "@/components/ui/core/toggle";

export default function ToggleRadiuses() {
  return (
    <div className="flex items-center gap-2">
      <Toggle variant="outline" radius="none">
        None
      </Toggle>
      <Toggle variant="outline" radius="sm">
        Small
      </Toggle>
      <Toggle variant="outline" radius="md">
        Medium
      </Toggle>
      <Toggle variant="outline" radius="lg">
        Large
      </Toggle>
      <Toggle variant="outline" radius="full">
        Full
      </Toggle>
    </div>
  );
}
