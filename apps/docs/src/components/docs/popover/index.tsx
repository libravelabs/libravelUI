"use client";

import { Playground } from "@/components/playground";
import { BasicPopoverBase, BasicPopoverCode } from "./basic-popover";
import { FormPopoverBase, FormPopoverCode } from "./form-popover";
import {
  PopoverPositionsBase,
  PopoverPositionsCode,
} from "./popover-positions";

export function BasicPopover() {
  return <Playground preview={<BasicPopoverBase />} code={BasicPopoverCode} />;
}

export function FormPopover() {
  return <Playground preview={<FormPopoverBase />} code={FormPopoverCode} />;
}

export function PopoverPositions() {
  return (
    <Playground
      preview={<PopoverPositionsBase />}
      code={PopoverPositionsCode}
    />
  );
}
