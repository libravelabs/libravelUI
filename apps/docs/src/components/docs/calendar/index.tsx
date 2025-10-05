"use client";

import { Playground } from "@/components/playground";
import { Calendar } from "@/components/ui/calendar";
import {
  SelectModeCalendarBase,
  SelectModeCalendarCode,
} from "./select-mode-calendar";
import {
  DisableDatesCalendarBase,
  DisableDatesCalendarCode,
} from "./disable-dates-calendar";
import {
  CustomWeekCalendarBase,
  CustomWeekCalendarCode,
} from "./custom-week-format-calendar";
import { ErrorCalendarBase, ErrorCalendarCode } from "./error-calendar";

export function BasicCalendar() {
  return (
    <Playground
      preview={<Calendar />}
      code={`"use client";

import { Calendar } from "@/components/ui/calendar";

export function BasicCalendar() {
  return <Calendar />;
}
`}
    />
  );
}

export function SelectModeCalendar() {
  return (
    <Playground
      preview={<SelectModeCalendarBase />}
      code={SelectModeCalendarCode}
    />
  );
}

export function DisableDatesCalendar() {
  return (
    <Playground
      preview={<DisableDatesCalendarBase />}
      code={DisableDatesCalendarCode}
    />
  );
}

export function CustomWeekCalendar() {
  return (
    <Playground
      preview={<CustomWeekCalendarBase />}
      code={CustomWeekCalendarCode}
    />
  );
}

export function ErrorCalendar() {
  return (
    <Playground preview={<ErrorCalendarBase />} code={ErrorCalendarCode} />
  );
}
