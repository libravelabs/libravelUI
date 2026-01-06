"use client";

import {
  DateRangePicker,
  DateRangePickerTrigger,
} from "@/components/ui/core/date-range-picker";

export default function VisibleDurationDateRangePicker() {
  return (
    <DateRangePicker
      popover={{
        calendar: {
          visibleDuration: { months: 3 },
        },
      }}
    >
      <DateRangePickerTrigger />
    </DateRangePicker>
  );
}
