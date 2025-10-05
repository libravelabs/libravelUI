"use client";

import { Calendar } from "@/components/ui/calendar";

export function CustomWeekCalendarBase() {
  return <Calendar firstDayOfWeek="fri" />;
}

export const CustomWeekCalendarCode = `"use client";

import { Calendar } from "@/components/ui/calendar";

export function CustomWeekCalendar() {
  return <Calendar firstDayOfWeek="fri" />;
}
`;
