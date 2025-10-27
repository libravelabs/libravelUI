"use client";

import {
  getLocalTimeZone,
  now,
  parseZonedDateTime,
} from "@internationalized/date";
import { DateField } from "@/components/ui/date-field";

export default function ReadonlyAndDisabledDateField() {
  const today = parseZonedDateTime(now(getLocalTimeZone()).toString());

  return (
    <div className="grid gap-4">
      <DateField isReadOnly defaultValue={today} />
      <DateField isDisabled />
    </div>
  );
}
