"use client";

import {
  getLocalTimeZone,
  now,
  parseZonedDateTime,
} from "@internationalized/date";
import { DateField } from "@/components/ui/date-field";

export function ReadonlyAndDisabledDateFieldBase() {
  const today = parseZonedDateTime(now(getLocalTimeZone()).toString());

  return (
    <div className="grid gap-4">
      <DateField isReadOnly defaultValue={today} />
      <DateField isDisabled />
    </div>
  );
}

export const ReadonlyAndDisabledDateFieldCode = `"use client";

import {
  getLocalTimeZone,
  now,
  parseZonedDateTime,
} from "@internationalized/date";
import { DateField } from "@/components/ui/date-field";

export function ReadonlyAndDisabledDateField() {
  const today = parseZonedDateTime(now(getLocalTimeZone()).toString());

  return (
    <div className="grid gap-4">
      <DateField isReadOnly defaultValue={today} />
      <DateField isDisabled />
    </div>
  );
}
`;
