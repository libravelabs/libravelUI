"use client";

import { NumberField } from "@/components/ui/core/number-field";
import { ChevronUp, ChevronDown } from "lucide-react";

export default function CustomIndicatorNumberField() {
  return (
    <NumberField
      indicator={{
        increment: <ChevronUp className="size-4" />,
        decrement: <ChevronDown className="size-4" />,
      }}
      className="max-w-72"
    />
  );
}
