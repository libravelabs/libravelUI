"use client";

import { Playground } from "@/components/playground";
import {
  BasicDateRangePickerBase,
  BasicDateRangePickerCode,
} from "./basic-date-range-picker";
import {
  VisibleDurationDateRangePickerBase,
  VisibleDurationDateRangePickerCode,
} from "./visible-duration-date-range-picker";
import {
  ValidatedDateRangePickerBase,
  ValidatedDateRangePickerCode,
} from "./validated-date-range-picker";
import {
  ReadOnlyRequiredDateRangePickerBase,
  ReadOnlyRequiredDateRangePickerCode,
} from "./readonly-required-date-range-picker";

export function BasicDateRangePicker() {
  return (
    <Playground
      preview={<BasicDateRangePickerBase />}
      code={BasicDateRangePickerCode}
    />
  );
}

export function VisibleDurationDateRangePicker() {
  return (
    <Playground
      preview={<VisibleDurationDateRangePickerBase />}
      code={VisibleDurationDateRangePickerCode}
    />
  );
}

export function ValidatedDateRangePicker() {
  return (
    <Playground
      preview={<ValidatedDateRangePickerBase />}
      code={ValidatedDateRangePickerCode}
    />
  );
}

export function ReadOnlyRequiredDateRangePicker() {
  return (
    <Playground
      preview={<ReadOnlyRequiredDateRangePickerBase />}
      code={ReadOnlyRequiredDateRangePickerCode}
    />
  );
}
