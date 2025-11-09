"use client";

import { Toggle } from "@/components/ui/core/toggle";

export default function ToggleVariants() {
  return (
    <div className="flex items-center gap-2">
      <Toggle>
        {({ isSelected }) => <>{isSelected ? "Diselect" : "Select"}</>}
      </Toggle>
      <Toggle variant="outline">
        {({ isSelected }) => <>{isSelected ? "Diselect" : "Select"}</>}
      </Toggle>
    </div>
  );
}
