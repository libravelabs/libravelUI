"use client";

import { Playground } from "@/components/playground";
import { ColorAreaBase, ColorAreaCode } from "./color-area";
import { ColorSwatchBase, ColorSwatchCode } from "./color-swatch";
import { ColorSliderBase, ColorSliderCode } from "./color-slider";
import {
  ColorSwatchPickerBase,
  ColorSwatchPickerCode,
} from "./color-swatch-picker";
import { ColorWheelBase, ColorWheelCode } from "./color-wheel";
import {
  ColorInputBase,
  ColorInputCode,
  ColorInputPickerBase,
  ColorInputPickerCode,
} from "./color-input";
import { ColorPickerBase, ColorPickerCode } from "./color-picker";

export function ColorAreaShowcase() {
  return <Playground preview={<ColorAreaBase />} code={ColorAreaCode} />;
}

export function ColorSwatch() {
  return <Playground preview={<ColorSwatchBase />} code={ColorSwatchCode} />;
}

export function ColorSlider() {
  return <Playground preview={<ColorSliderBase />} code={ColorSliderCode} />;
}

export function ColorSwatchPicker() {
  return (
    <Playground
      preview={<ColorSwatchPickerBase />}
      code={ColorSwatchPickerCode}
    />
  );
}

export function ColorWheel() {
  return <Playground preview={<ColorWheelBase />} code={ColorWheelCode} />;
}

export function ColorInput() {
  return <Playground preview={<ColorInputBase />} code={ColorInputCode} />;
}

export function ColorInputPicker() {
  return (
    <Playground
      preview={<ColorInputPickerBase />}
      code={ColorInputPickerCode}
    />
  );
}

export function ColorPicker() {
  return <Playground preview={<ColorPickerBase />} code={ColorPickerCode} />;
}
