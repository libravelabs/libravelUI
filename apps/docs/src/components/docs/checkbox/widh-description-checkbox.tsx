"use client";

import { Checkbox } from "@/components/ui/checkbox";

export function WithDescriptionCheckboxBase() {
  return (
    <Checkbox
      label="Enable auto-sync"
      description="Automatically sync every hour"
    />
  );
}

export const WithDescriptionCheckboxCode = `"use client";

import { Checkbox } from "@/components/ui/checkbox";

export function WithDescriptionCheckbox() {
  return (
    <Checkbox
      label="Enable auto-sync"
      description="Automatically sync every hour"
    />
  );
}
`;
