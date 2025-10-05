"use client";

import { Checkbox } from "@/components/ui/checkbox";

export function CustomChildrenCheckboxBase() {
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

export const CustomChildrenCheckboxCode = `"use client";

import { Checkbox } from "@/components/ui/checkbox";

export function CustomChildrenCheckbox() {
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
`;
