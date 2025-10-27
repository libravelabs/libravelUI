"use client";

import { DateRangePicker } from "@/components/ui/date-range-picker";
import { getLocalTimeZone, today } from "@internationalized/date";

export default function ReadOnlyRequiredDateRangePicker() {
  return (
    <div className="grid gap-8">
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
