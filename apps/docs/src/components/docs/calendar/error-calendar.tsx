"use client";

import { Calendar } from "@/components/ui/calendar";
import { isWeekend, getLocalTimeZone, today } from "@internationalized/date";
import { useState } from "react";
import { useLocale, type DateValue } from "react-aria-components";

function getNextWeekend(date: DateValue): DateValue {
  const day = date.toDate(getLocalTimeZone()).getDay();

  if (day === 6 || day === 0) {
    return date;
  }

  const daysUntilSaturday = 6 - day;
  return date.add({ days: daysUntilSaturday });
}

export function ErrorCalendarBase() {
  const { locale } = useLocale();
  const initialDate = getNextWeekend(today(getLocalTimeZone()));
  const [date, setDate] = useState<DateValue>(initialDate);
  const isInvalid = isWeekend(date, locale);

  return (
    <Calendar
      aria-label="Appointment date"
      value={date}
      onChange={setDate}
      isInvalid={isInvalid}
      errorMessage={isInvalid ? "We are closed on weekends" : undefined}
      defaultValue={initialDate}
    />
  );
}

export const ErrorCalendarCode = `"use client";

import { Calendar } from "@/components/ui/calendar";
import { isWeekend, getLocalTimeZone, today } from "@internationalized/date";
import { useState } from "react";
import { useLocale, type DateValue } from "react-aria-components";

function getNextWeekend(date: DateValue): DateValue {
  const day = date.toDate(getLocalTimeZone()).getDay();

  if (day === 6 || day === 0) {
    return date;
  }

  const daysUntilSaturday = 6 - day;
  return date.add({ days: daysUntilSaturday });
}

export function ErrorCalendarBase() {
  const { locale } = useLocale();
  const initialDate = getNextWeekend(today(getLocalTimeZone()));
  const [date, setDate] = useState<DateValue>(initialDate);
  const isInvalid = isWeekend(date, locale);

  return (
    <Calendar
      aria-label="Appointment date"
      value={date}
      onChange={setDate}
      isInvalid={isInvalid}
      errorMessage={isInvalid ? "We are closed on weekends" : undefined}
      defaultValue={initialDate}
    />
  );
}
`;
