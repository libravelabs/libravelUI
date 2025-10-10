"use client";

import { DateField } from "@/components/ui/date-field";
import { Calendar } from "lucide-react";

export function StartEndContentDateFieldBase() {
  return (
    <div className="grid gap-4">
      <DateField startContent={<Calendar />} />
      <DateField endContent={<Calendar />} />
    </div>
  );
}

export const StartEndContentDateFieldCode = `"use client";

import { DateField } from "@/components/ui/date-field";
import { Calendar } from "lucide-react";

export function StartEndContentDateField() {
  return (
    <div className="grid gap-4">
      <DateField startContent={<Calendar />} />
      <DateField endContent={<Calendar />} />
    </div>
  );
}
`;
