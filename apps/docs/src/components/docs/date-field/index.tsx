"use client";

import { Playground } from "@/components/playground";
import { BasicDateFieldBase, BasicDateFieldCode } from "./basic-date-field";
import { DateTimeFieldBase, DateTimeFieldCode } from "./date-time-field";
import {
  StartEndContentDateFieldBase,
  StartEndContentDateFieldCode,
} from "./start-end-content-date-field";
import {
  ValidatedDateFieldBase,
  ValidatedDateFieldCode,
} from "./validated-date-field";
import {
  ReadonlyAndDisabledDateFieldBase,
  ReadonlyAndDisabledDateFieldCode,
} from "./readonly-disabled-date-field";

export function BasicDateField() {
  return (
    <Playground preview={<BasicDateFieldBase />} code={BasicDateFieldCode} />
  );
}

export function DateTimeField() {
  return (
    <Playground preview={<DateTimeFieldBase />} code={DateTimeFieldCode} />
  );
}

export function StartEndContentDateField() {
  return (
    <Playground
      preview={<StartEndContentDateFieldBase />}
      code={StartEndContentDateFieldCode}
    />
  );
}

export function ValidatedDateField() {
  return (
    <Playground
      preview={<ValidatedDateFieldBase />}
      code={ValidatedDateFieldCode}
    />
  );
}

export function ReadonlyAndDisabledDateField() {
  return (
    <Playground
      preview={<ReadonlyAndDisabledDateFieldBase />}
      code={ReadonlyAndDisabledDateFieldCode}
    />
  );
}
