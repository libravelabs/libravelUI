"use client";

import { DateField } from "@/components/ui/core/date-field";
import { Calendar } from "lucide-react";

export default function StartEndContentDateField() {
  return (
    <div className="grid gap-4">
      <DateField startContent={<Calendar />} />
      <DateField endContent={<Calendar />} />
    </div>
  );
}
