"use client";

import { RangeCalendar } from "@/components/ui/core/range-calendar";

export default function PrefilledRangeCalendar() {
  return (
    <RangeCalendar
      label="Pre-filled Range (Sept 2025)"
      initialYear={2025}
      initialMonth={9}
      rangeDate={{ start: "2025-09-10", end: "2025-09-20" }}
    />
  );
}
