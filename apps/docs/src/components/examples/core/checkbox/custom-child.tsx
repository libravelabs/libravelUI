"use client";

import { Checkbox } from "@/components/ui/core/checkbox";

export default function CustomChildrenCheckbox() {
  return (
    <Checkbox>
      <div className="flex flex-col">
        <span className="font-medium">Custom Node</span>
        <span className="text-xs text-muted-foreground">
          You can pass arbitrary JSX instead of label/description
        </span>
      </div>
    </Checkbox>
  );
}
