"use client";

import { NumberField, NumberInput } from "@/components/ui/core/number-field";
import { ChevronUp, ChevronDown } from "lucide-react";

export default function CustomIndicatorNumberField() {
  return (
    <NumberField className="max-w-72">
      <NumberInput
        indicator={{
          increment: <ChevronUp className="size-4" />,
          decrement: <ChevronDown className="size-4" />,
        }}
      />
    </NumberField>
  );
}
