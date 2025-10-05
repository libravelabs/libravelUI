"use client";

import { Playground } from "@/components/playground";
import { BasicButtonBase, BasicButtonCode } from "./basic-button";
import { ButtonVariantsBase, ButtonVariantsCode } from "./button-variants";
import { ButtonSizesBase, ButtonSizesCode } from "./button-sizes";
import { ButtonRadiusBase, ButtonRadiusCode } from "./button-radius";
import { WithIconButtonBase, WithIconButtonCode } from "./with-icon-button";
import { LoadingButtonBase, LoadingButtonCode } from "./loading-button";
import { DisabledButtonBase, DisabledButtonCode } from "./disabled-button";

export function BasicButton() {
  return <Playground preview={<BasicButtonBase />} code={BasicButtonCode} />;
}

export function ButtonVariants() {
  return (
    <Playground preview={<ButtonVariantsBase />} code={ButtonVariantsCode} />
  );
}

export function ButtonSizes() {
  return <Playground preview={<ButtonSizesBase />} code={ButtonSizesCode} />;
}

export function ButtonRadius() {
  return <Playground preview={<ButtonRadiusBase />} code={ButtonRadiusCode} />;
}

export function WithIconButton() {
  return (
    <Playground preview={<WithIconButtonBase />} code={WithIconButtonCode} />
  );
}

export function LoadingButton() {
  return (
    <Playground preview={<LoadingButtonBase />} code={LoadingButtonCode} />
  );
}

export function DisabledButton() {
  return (
    <Playground preview={<DisabledButtonBase />} code={DisabledButtonCode} />
  );
}
