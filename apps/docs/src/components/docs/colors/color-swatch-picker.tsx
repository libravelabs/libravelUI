"use client";

import {
  ColorSwatchPicker,
  ColorSwatchPickerItem,
} from "@/components/ui/colors";

export function ColorSwatchPickerBase() {
  return (
    <ColorSwatchPicker
      aria-label="Pick color"
      className="grid grid-cols-3 gap-2 lg:grid-cols-6"
    >
      <ColorSwatchPickerItem color="#fde68a" />
      <ColorSwatchPickerItem color="#4ade80" />
      <ColorSwatchPickerItem color="#38bdf8" />
      <ColorSwatchPickerItem color="#a78bfa" />
      <ColorSwatchPickerItem color="#f472b6" />
      <ColorSwatchPickerItem color="#60a5fa" />
      <ColorSwatchPickerItem color="#fb7185" />
      <ColorSwatchPickerItem color="#34d399" />
      <ColorSwatchPickerItem color="#facc15" />
      <ColorSwatchPickerItem color="#818cf8" />
    </ColorSwatchPicker>
  );
}

export const ColorSwatchPickerCode = `"use client";

import {
  ColorSwatchPicker,
  ColorSwatchPickerItem,
} from "@/components/ui/color-picker";

export function ColorSwatchPickerExample() {
  return (
    <ColorSwatchPicker
      aria-label="Pick color"
      className="grid grid-cols-3 gap-2 lg:grid-cols-6"
    >
      <ColorSwatchPickerItem color="#fde68a" />
      <ColorSwatchPickerItem color="#4ade80" />
      <ColorSwatchPickerItem color="#38bdf8" />
      <ColorSwatchPickerItem color="#a78bfa" />
      <ColorSwatchPickerItem color="#f472b6" />
      <ColorSwatchPickerItem color="#60a5fa" />
      <ColorSwatchPickerItem color="#fb7185" />
      <ColorSwatchPickerItem color="#34d399" />
      <ColorSwatchPickerItem color="#facc15" />
      <ColorSwatchPickerItem color="#818cf8" />
    </ColorSwatchPicker>
  );
}
`;
