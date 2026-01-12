"use client";

import { Toggle, type ToggleProps } from "@/components/ui/core/toggle";
import { Pin, PinOff } from "lucide-react";

const tones: { value: string; label: string }[] = [
  { value: "default", label: "Default" },
  { value: "destructive", label: "Destructive" },
  { value: "outline", label: "Outline" },
  { value: "secondary", label: "Secondary" },
  { value: "link", label: "Link" },
];

const sizes: { value: string; label: string }[] = [
  { value: "xs", label: "Extra Small" },
  { value: "sm", label: "Small" },
  { value: "default", label: "Default" },
  { value: "lg", label: "Large" },
  { value: "xl", label: "Extra Large" },
  { value: "2xl", label: "2XL" },
];

const radiuses: { value: string; label: string }[] = [
  { value: "none", label: "None" },
  { value: "sm", label: "Small" },
  { value: "md", label: "Medium" },
  { value: "lg", label: "Large" },
  { value: "full", label: "Full" },
];

export default function BasicToggle({
  tone = "default",
  radius = "md",
  size = "default",
  isDisabled = false,
  iconOnly = false,
}: ToggleProps) {
  return (
    <Toggle
      tone={tone}
      radius={radius}
      size={size}
      isDisabled={isDisabled}
      iconOnly={iconOnly}
    >
      {({ isSelected }) => (
        <>
          {iconOnly ? (
            isSelected ? (
              <PinOff />
            ) : (
              <Pin />
            )
          ) : isSelected ? (
            "Diselect"
          ) : (
            "Select"
          )}
        </>
      )}
    </Toggle>
  );
}

export const controls = {
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
    options: radiuses,
    defaultValue: "md",
    label: "Radius",
  },
  iconOnly: {
    type: "boolean",
    defaultValue: false,
    label: "Icon Only",
    mapping: {
      true: {
        children: "{({ isSelected }) => (isSelected ? <PinOff /> : <Pin />)}",
        imports: ['import { Pin, PinOff } from "lucide-react";'],
      },
      false: {
        children: `{({ isSelected }) => (isSelected ? "Diselect" : "Select")}`,
      },
    },
  },
  isDisabled: {
    type: "boolean",
    defaultValue: false,
    label: "Is Disabled",
  },
};
