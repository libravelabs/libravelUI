"use client";

import {
  getLocalTimeZone,
  now,
  parseZonedDateTime,
} from "@internationalized/date";
import { useState } from "react";

import { DatePicker } from "@/components/ui/core/date-picker";

export default function DateTimePicker() {
  const today = parseZonedDateTime(now(getLocalTimeZone()).toString());
  const [value, setValue] = useState(today);

  return (
    <DatePicker
      hideTimeZone
      hourCycle={24}
      className="max-w-xs"
      value={value}
      onChange={(newValue) => setValue(newValue!)}
      label="Event date"
    />
  );
}
