"use client";

import { ColorInput } from "@/components/ui/colors";

export function ColorInputBase() {
  return <ColorInput defaultValue="#8cf0cd" />;
}

export const ColorInputCode = `"use client";

import { ColorInput } from "@/components/ui/color-picker";

export function ColorInputExample() {
  return <ColorInput defaultValue="#8cf0cd" />;
}
`;

export function ColorInputPickerBase() {
  return <ColorInput pickMode defaultValue="#8cf0cd" />;
}

export const ColorInputPickerCode = `"use client";
  
  import { ColorInput } from "@/components/ui/color-picker";
  
  export function ColorInputPickerExample() {
    return <ColorInput pickMode defaultValue="#8cf0cd" />;
  }
  `;
