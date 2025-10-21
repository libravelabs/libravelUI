"use client";

import { DateRangePicker } from "@/components/ui/date-range-picker";

export function VisibleDurationDateRangePickerBase() {
  return <DateRangePicker visibleDuration={{ months: 3 }} />;
}

export const VisibleDurationDateRangePickerCode = `"use client";

import { DateRangePicker } from "@/components/ui/date-range-picker";

export function VisibleDurationDateRangePicker() {
  return <DateRangePicker visibleDuration={{ months: 3 }} />;
}
`;
