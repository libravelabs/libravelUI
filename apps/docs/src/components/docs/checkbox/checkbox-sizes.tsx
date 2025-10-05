"use client";

import { Checkbox } from "@/components/ui/checkbox";

export function CheckboxSizesBase() {
  return (
    <div className="space-y-2">
      <Checkbox value="sm" size="sm" label="Small" />
      <Checkbox value="md" size="md" label="Medium (default)" />
      <Checkbox value="lg" size="lg" label="Large" />
      <Checkbox value="xl" size="xl" label="Extra large" />
    </div>
  );
}

export const CheckboxSizesCode = `"use client";

import { Checkbox } from "@/components/ui/checkbox";

export function CheckboxSizes() {
  return (
    <div className="space-y-2">
      <Checkbox value="sm" size="sm" label="Small" />
      <Checkbox value="md" size="md" label="Medium (default)" />
      <Checkbox value="lg" size="lg" label="Large" />
      <Checkbox value="xl" size="xl" label="Extra large" />
    </div>
  );
}
`;
