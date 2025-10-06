"use client";

import { ColorSlider } from "@/components/ui/colors";

export function ColorSliderBase() {
  return (
    <ColorSlider
      label="Fill color"
      channel="alpha"
      defaultValue="hsl(0, 100%, 50%)"
    />
  );
}

export const ColorSliderCode = `"use client";

import { ColorSlider } from "@/components/ui/color-picker";

export function ColorSliderExample() {
  return (
    <ColorSlider
      label="Fill color"
      channel="alpha"
      defaultValue="hsl(0, 100%, 50%)"
    />
  );
}
`;
