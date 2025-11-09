"use client";

import { DateRangePicker } from "@/components/ui/core/date-range-picker";

export default function VisibleDurationDateRangePicker() {
  return <DateRangePicker visibleDuration={{ months: 3 }} />;
}
