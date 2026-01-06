"use client";

import {
  DatePicker,
  DatePickerTrigger,
} from "@/components/ui/core/date-picker";
import { Label } from "@/components/ui/core/field";

export default function BasicDatePicker() {
  return (
    <DatePicker
      className="w-72"
      popover={{
        calendar: {
          selectMode: true,
        },
      }}
    >
      <Label>Event date</Label>
      <DatePickerTrigger />
    </DatePicker>
  );
}
