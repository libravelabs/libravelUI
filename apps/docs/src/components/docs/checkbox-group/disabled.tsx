"use client";

import { CheckboxGroup } from "@/components/ui/checkbox-group";
import { Checkbox } from "@/components/ui/checkbox";

export default function DisabledCheckBox() {
  return (
    <CheckboxGroup label="Choose your favorite fruits" isDisabled>
      <Checkbox value="apple" label="Apple" />
      <Checkbox value="banana" label="Banana" />
      <Checkbox value="cherry" label="Cherry" />
    </CheckboxGroup>
  );
}
