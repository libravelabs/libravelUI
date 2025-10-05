"use client";

import { Playground } from "@/components/playground";
import {
  BasicCheckboxGroupBase,
  BasicCheckboxGroupCode,
} from "./basic-checkbox-group";
import {
  ValidateCheckboxGroupBase,
  ValidateCheckboxGroupCode,
} from "./validate-checkbox-group";
import {
  IndeterminateCheckboxGroupBase,
  IndeterminateCheckboxGroupCode,
} from "./indeterminate-checkbox-group";
import {
  ControlledCheckboxGroupBase,
  ControlledCheckboxGroupCode,
} from "./controlled-checkbox-group";
import {
  DisabledCheckBoxBase,
  DisabledCheckBoxCode,
} from "./disabled-checkbox-group";

export function BasicCheckboxGroup() {
  return (
    <Playground
      preview={<BasicCheckboxGroupBase />}
      code={BasicCheckboxGroupCode}
    />
  );
}

export function ValidateCheckboxGroup() {
  return (
    <Playground
      preview={<ValidateCheckboxGroupBase />}
      code={ValidateCheckboxGroupCode}
    />
  );
}

export function IndeterminateCheckboxGroup() {
  return (
    <Playground
      preview={<IndeterminateCheckboxGroupBase />}
      code={IndeterminateCheckboxGroupCode}
    />
  );
}

export function ControlledCheckboxGroup() {
  return (
    <Playground
      preview={<ControlledCheckboxGroupBase />}
      code={ControlledCheckboxGroupCode}
    />
  );
}

export function DisabledCheckboxGroup() {
  return (
    <Playground
      preview={<DisabledCheckBoxBase />}
      code={DisabledCheckBoxCode}
    />
  );
}
