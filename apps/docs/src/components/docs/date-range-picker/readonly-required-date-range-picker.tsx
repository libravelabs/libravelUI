"use client";

import { DateRangePicker } from "@/components/ui/date-range-picker";
import { getLocalTimeZone, today } from "@internationalized/date";

export function ReadOnlyRequiredDateRangePickerBase() {
  return (
    <div className="grid gap-2">
      <DateRangePicker
        isReadOnly
        label="ReadOnly Date Range Picker"
        defaultValue={{
          start: today(getLocalTimeZone()),
          end: today(getLocalTimeZone()).add({ weeks: 2 }),
        }}
      />
      <DateRangePicker isDisabled label="Disabled Date Range Picker" />
    </div>
  );
}

export const ReadOnlyRequiredDateRangePickerCode = `"use client";

import { DateRangePicker } from "@/components/ui/date-range-picker";
import { getLocalTimeZone, today } from "@internationalized/date";

export function ReadOnlyRequiredDateRangePicker() {
  return (
    <div className="grid gap-2">
      <DateRangePicker
        isReadOnly
        label="ReadOnly Date Range Picker"
        defaultValue={{
          start: today(getLocalTimeZone()),
          end: today(getLocalTimeZone()).add({ weeks: 2 }),
        }}
      />
      <DateRangePicker isDisabled label="Disabled Date Range Picker" />
    </div>
  );
}
`;
