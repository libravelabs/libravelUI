"use client";

import { ColorPicker } from "@/components/ui/colors";

export function ColorPickerBase() {
  return (
    <ColorPicker
      eyeDropper
      label="Pick a color"
      description="Pick a color you like and it will shown in your homepage"
    />
  );
}

export const ColorPickerCode = `"use client";

import { ColorPicker } from "@/components/ui/color-picker";

export function ColorPickerExample() {
  return (
    <ColorPicker
      eyeDropper
      label="Pick a color"
      description="Pick a color you like and it will shown in your homepage"
    />
  );
}
`;
