"use client";

import {
  ColorSwatchPicker,
  ColorSwatchPickerItem,
} from "@/components/ui/core/color-swatch-picker";

export default function ColorSwatchPickerBasic() {
  return (
    <ColorSwatchPicker>
      <ColorSwatchPickerItem color="#fde68a" />
      <ColorSwatchPickerItem color="#4ade80" />
      <ColorSwatchPickerItem color="#38bdf8" />
      <ColorSwatchPickerItem color="#a78bfa" />
      <ColorSwatchPickerItem color="#f472b6" />
      <ColorSwatchPickerItem color="#60a5fa" />
    </ColorSwatchPicker>
  );
}
