"use client";

import { CheckboxGroup } from "@/components/ui/checkbox-group";
import { Checkbox } from "@/components/ui/checkbox";

export default function IndeterminateCheckboxGroup() {
  return (
    <CheckboxGroup label="Post Visibility Settings">
      <Checkbox value="all" label="Select All" isIndeterminate isReadOnly />
      <Checkbox value="friends" label="Visible to Friends" />
      <Checkbox value="followers" label="Visible to Followers" />
      <Checkbox value="public" label="Visible to Public" />
    </CheckboxGroup>
  );
}
