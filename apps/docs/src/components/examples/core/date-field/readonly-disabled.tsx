"use client";

import {
  getLocalTimeZone,
  now,
  parseZonedDateTime,
} from "@internationalized/date";
import { DateField, DateInput } from "@/components/ui/core/date-field";

export default function ReadonlyAndDisabledDateField() {
  const today = parseZonedDateTime(now(getLocalTimeZone()).toString());

  return (
    <div className="grid gap-4">
      <DateField isReadOnly defaultValue={today}>
        <DateInput />
      </DateField>

      <DateField isDisabled>
        <DateInput />
      </DateField>
    </div>
  );
}
