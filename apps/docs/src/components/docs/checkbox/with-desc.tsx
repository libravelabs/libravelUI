"use client";

import { Checkbox } from "@/components/ui/checkbox";

export default function WithDescriptionCheckbox() {
  return (
    <Checkbox
      label="Enable auto-sync"
      description="Automatically sync every hour"
    />
  );
}
