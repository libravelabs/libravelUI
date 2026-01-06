"use client";

import { DateField, DateInput } from "@/components/ui/core/date-field";
import { Label } from "@/components/ui/core/field";
import { InputGroup } from "@/components/ui/core/input";
import { Calendar } from "lucide-react";

export default function StartEndContentDateField() {
  return (
    <div className="grid gap-4">
      <DateField>
        <Label>Your Birthday</Label>
        <InputGroup>
          <Calendar />
          <DateInput />
        </InputGroup>
      </DateField>
    </div>
  );
}
