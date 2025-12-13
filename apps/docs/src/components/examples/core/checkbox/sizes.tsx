"use client";

import { Checkbox } from "@/components/ui/core/checkbox";

export default function CheckboxSizes() {
  return (
    <div className="space-y-2">
      <Checkbox value="sm" size="sm" label="Small" />
      <Checkbox value="md" size="md" label="Medium (default)" />
      <Checkbox value="lg" size="lg" label="Large" />
      <Checkbox value="xl" size="xl" label="Extra large" />
    </div>
  );
}
