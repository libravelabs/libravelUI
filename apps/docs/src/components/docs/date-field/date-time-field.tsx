"use client";

import { useState } from "react";
import {
  getLocalTimeZone,
  now,
  parseZonedDateTime,
} from "@internationalized/date";
import { DateField } from "@/components/ui/date-field";

export function DateTimeFieldBase() {
  const today = parseZonedDateTime(now(getLocalTimeZone()).toString());
  const [value, setValue] = useState(today);

  return (
    <DateField
      hideTimeZone
      value={value}
      onChange={(newValue) => setValue(newValue!)}
      hourCycle={24}
      label="Event date"
    />
  );
}

export const DateTimeFieldCode = `"use client";

import { useState } from "react";
import {
  getLocalTimeZone,
  now,
  parseZonedDateTime,
} from "@internationalized/date";
import { DateField } from "@/components/ui/date-field";

export function DateTimeFieldBase() {
  const today = parseZonedDateTime(now(getLocalTimeZone()).toString());
  const [value, setValue] = useState(today);

  return (
    <DateField
      hideTimeZone
      value={value}
      onChange={(newValue) => setValue(newValue!)}
      hourCycle={24}
      label="Event date"
    />
  );
}
`;
