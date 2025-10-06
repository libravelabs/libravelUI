"use client";

import { ColorSwatch } from "@/components/ui/colors";

export function ColorSwatchBase() {
  return <ColorSwatch color="#8cf0cd" />;
}

export const ColorSwatchCode = `"use client";

import { ColorSwatch } from "@/components/ui/color-picker";

export function ColorSwatchExample() {
  return <ColorSwatch color="#8cf0cd" />;
}
`;
