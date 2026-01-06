"use client";

import {
  getLocalTimeZone,
  now,
  parseZonedDateTime,
} from "@internationalized/date";
import { useState } from "react";
import {
  DatePicker,
  DatePickerTrigger,
} from "@/components/ui/core/date-picker";
import { Label } from "@/components/ui/core/field";

export default function DateTimePicker() {
  const today = parseZonedDateTime(now(getLocalTimeZone()).toString());
  const [value, setValue] = useState(today);

  return (
    <DatePicker
      hideTimeZone
      hourCycle={24}
      className="w-72"
      value={value}
      onChange={(newValue) => setValue(newValue!)}
    >
      <Label>Event date</Label>
      <DatePickerTrigger />
    </DatePicker>
  );
}
