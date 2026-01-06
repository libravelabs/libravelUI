"use client";

import {
  DateRangePicker,
  DateRangePickerTrigger,
} from "@/components/ui/core/date-range-picker";
import { Label } from "@/components/ui/core/field";
import { getLocalTimeZone, today } from "@internationalized/date";

export default function ReadOnlyRequiredDateRangePicker() {
  return (
    <div className="grid gap-8">
      <DateRangePicker
        isReadOnly
        defaultValue={{
          start: today(getLocalTimeZone()),
          end: today(getLocalTimeZone()).add({ weeks: 2 }),
        }}
      >
        <Label>ReadOnly Date Range Picker</Label>
        <DateRangePickerTrigger />
      </DateRangePicker>

      <DateRangePicker
        isDisabled
        defaultValue={{
          start: today(getLocalTimeZone()),
          end: today(getLocalTimeZone()).add({ weeks: 2 }),
        }}
      >
        <Label>Disabled Date Range Picker</Label>
        <DateRangePickerTrigger />
      </DateRangePicker>
    </div>
  );
}
