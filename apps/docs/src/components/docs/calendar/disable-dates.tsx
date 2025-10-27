"use client";

import { getLocalTimeZone, now } from "@internationalized/date";
import { type DateValue } from "react-aria";
import { Calendar } from "@/components/ui/calendar";

export default function DisableDatesCalendar() {
  const today = now(getLocalTimeZone());

  const thisYear = today.year;
  const thisMonth = today.month;

  const disabledDays = [5, 15, 25];

  const isDateUnavailable = (date: DateValue) =>
    date.year === thisYear &&
    date.month === thisMonth &&
    disabledDays.includes(date.day);

  return <Calendar isDateUnavailable={isDateUnavailable} />;
}
