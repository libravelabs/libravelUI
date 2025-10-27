"use client";

import { Checkbox } from "@/components/ui/checkbox";

export default function DisabledCheckbox() {
  return (
    <div className="space-y-2">
      <Checkbox value="1" label="This is a disabled checkbox" isDisabled />
      <Checkbox
        defaultSelected
        label="This is a readOnly checkbox"
        isReadOnly
      />
    </div>
  );
}
