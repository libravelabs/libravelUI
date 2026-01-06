"use client";

import { DateField, DateInput } from "@/components/ui/core/date-field";
import { Description, Label } from "@/components/ui/core/field";

export default function BasicDateField() {
  return (
    <DateField>
      <Label>Your Birthday</Label>
      <DateInput />
      <Description>Enter your birthday</Description>
    </DateField>
  );
}
