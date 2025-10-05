"use client";

import { Calendar } from "@/components/ui/calendar";

export function SelectModeCalendarBase() {
  return <Calendar selectMode />;
}

export const SelectModeCalendarCode = `"use client";

import { Calendar } from "@/components/ui/calendar";

export function SelectModeCalendar() {
  return <Calendar selectMode />;
}
`;
