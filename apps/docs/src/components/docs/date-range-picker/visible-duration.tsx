"use client";

import { DateRangePicker } from "@/components/ui/date-range-picker";

export default function VisibleDurationDateRangePicker() {
  return <DateRangePicker visibleDuration={{ months: 3 }} />;
}
