"use client";

import { Playground } from "@/components/playground";
import { BasicDatePickerBase, BasicDatePickerCode } from "./basic-date-picker";
import { DateTimePickerBase, DateTimePickerCode } from "./date-time-picker";

export function BasicDatePicker() {
  return (
    <Playground preview={<BasicDatePickerBase />} code={BasicDatePickerCode} />
  );
}

export function DateTimePicker() {
  return (
    <Playground preview={<DateTimePickerBase />} code={DateTimePickerCode} />
  );
}
