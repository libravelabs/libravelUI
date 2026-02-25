"use client";

import { Input, type InputProps } from "@/components/ui/core/input";

const tones: { value: string; label: string }[] = [
  { value: "default", label: "Default" },
  { value: "destructive", label: "Destructive" },
  { value: "ghost", label: "Ghost" },
  { value: "line", label: "Line" },
];

const sizes: { value: string; label: string }[] = [
  { value: "sm", label: "Small" },
  { value: "default", label: "Default" },
  { value: "lg", label: "Large" },
  { value: "xl", label: "Extra Large" },
];

const radii: { value: string; label: string }[] = [
  { value: "none", label: "None" },
  { value: "sm", label: "Small" },
  { value: "md", label: "Medium" },
  { value: "lg", label: "Large" },
  { value: "full", label: "Full" },
];

export default function BasicInput({
  tone = "default",
  size = "default",
  radius = "md",
  isDisabled = false,
  isLoading = false,
  placeholder = "Enter text...",
}: InputProps) {
  return (
    <Input
      tone={tone}
      size={size}
      radius={radius}
      isDisabled={isDisabled}
      isLoading={isLoading}
      placeholder={placeholder}
      className="w-72"
    />
  );
}

export const controls = {
  placeholder: {
    type: "text",
    defaultValue: "Enter text...",
    label: "Placeholder",
    showDefault: true,
  },
  tone: {
    type: "select",
    options: tones,
    defaultValue: "default",
    label: "Tone",
  },
  size: {
    type: "select",
    options: sizes,
    defaultValue: "default",
    label: "Size",
  },
  radius: {
    type: "select",
    options: radii,
    defaultValue: "md",
    label: "Radius",
  },
  isDisabled: {
    type: "boolean",
    defaultValue: false,
    label: "Disabled",
  },
  isLoading: {
    type: "boolean",
    defaultValue: false,
    label: "Loading",
  },
};
