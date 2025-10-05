"use client";

import { Checkbox } from "@/components/ui/checkbox";

export function BasicCheckboxBase() {
  return (
    <div className="space-y-2">
      <Checkbox value="1" label="Subscribe newsletter" />
      <Checkbox defaultSelected label="I agree of the user agreement" />
    </div>
  );
}

export const BasicCheckboxCode = `"use client";

import { Checkbox } from "@/components/ui/checkbox";

export function BasicCheckbox() {
  return (
    <div className="space-y-2">
      <Checkbox value="1" label="Subscribe newsletter" />
      <Checkbox defaultSelected label="I agree of the user agreement" />
    </div>
  );
}
`;
