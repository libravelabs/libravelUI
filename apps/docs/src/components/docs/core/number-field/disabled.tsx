"use client";

import { NumberField } from "@/components/ui/core/number-field";

export default function DisabledNumberField() {
  return <NumberField isDisabled defaultValue={100} className="max-w-72" />;
}
