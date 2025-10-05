"use client";

import { Playground } from "@/components/playground";
import { BasicCheckboxBase, BasicCheckboxCode } from "./basic-checkbox";
import {
  WithDescriptionCheckboxBase,
  WithDescriptionCheckboxCode,
} from "./widh-description-checkbox";
import { CheckboxSizesBase, CheckboxSizesCode } from "./checkbox-sizes";
import { Checkbox } from "@/components/ui/checkbox";
import {
  CustomChildrenCheckboxBase,
  CustomChildrenCheckboxCode,
} from "./custom-children-checkbox";
import {
  ControlledCheckboxBase,
  ControlledCheckboxCode,
} from "./controlled-checkbox";
import { ErrorCheckboxBase, ErrorCheckboxCode } from "./error-checkbox";

export function BasicCheckbox() {
  return (
    <Playground preview={<BasicCheckboxBase />} code={BasicCheckboxCode} />
  );
}

export function WithDescriptionCheckbox() {
  return (
    <Playground
      preview={<WithDescriptionCheckboxBase />}
      code={WithDescriptionCheckboxCode}
    />
  );
}

export function CheckboxSizes() {
  return (
    <Playground preview={<CheckboxSizesBase />} code={CheckboxSizesCode} />
  );
}

export function CustomChildrenCheckbox() {
  return (
    <Playground
      preview={<CustomChildrenCheckboxBase />}
      code={CustomChildrenCheckboxCode}
    />
  );
}

export function ControlledCheckbox() {
  return (
    <Playground
      preview={<ControlledCheckboxBase />}
      code={ControlledCheckboxCode}
    />
  );
}

export function ErrorCheckbox() {
  return (
    <Playground preview={<ErrorCheckboxBase />} code={ErrorCheckboxCode} />
  );
}

export function DisabledCheckbox() {
  return (
    <Playground
      preview={<Checkbox isDisabled label="Subscribe newsletter" />}
      code={`"use client";

import { Checkbox } from "@/components/ui/checkbox";

export function DisabledCheckbox() {
  return <Checkbox isDisabled label="Subscribe newsletter" />
}`}
    />
  );
}
