"use client";

import { RangeCalendar } from "@/components/ui/range-calendar";

export default function BasicRangeCalendar() {
  return (
    <RangeCalendar
      label="Select a range across 4 months"
      visibleDuration={{ months: 4 }}
      initialYear={1945}
      initialMonth={8}
    />
  );
}
