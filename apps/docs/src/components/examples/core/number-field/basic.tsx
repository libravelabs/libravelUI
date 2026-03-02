"use client";

import { NumberField, NumberInput } from "@/components/ui/core/number-field";

export default function BasicNumberField() {
  return (
    <NumberField defaultValue={0} className="w-72">
      <NumberInput />
    </NumberField>
  );
}
