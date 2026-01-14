"use client";

import { Button, type ButtonProps } from "@/components/ui/core/button";
import { ArrowRight } from "lucide-react";

const tones: { value: string; label: string }[] = [
  { value: "default", label: "Default" },
  { value: "secondary", label: "Secondary" },
  { value: "destructive", label: "Destructive" },
  { value: "outline", label: "Outline" },
  { value: "ghost", label: "Ghost" },
  { value: "link", label: "Link" },
  { value: "unstyled", label: "Unstyled" },
];

const radius: { value: string; label: string }[] = [
  { value: "none", label: "None" },
  { value: "sm", label: "Small" },
  { value: "md", label: "Medium" },
  { value: "lg", label: "Large" },
  { value: "full", label: "Full" },
];

const sizes: { value: string; label: string }[] = [
  { value: "xs", label: "Extra Small" },
  { value: "sm", label: "Small" },
  { value: "default", label: "Default" },
  { value: "lg", label: "Large" },
  { value: "xl", label: "Extra Large" },
  { value: "2xl", label: "2XL" },
];

export default function BasicButton({
  tone = "default",
  size = "default",
  radius = "md",
  iconOnly = false,
  isDisabled = false,
  isPending = false,
  children = "Click Me!",
}: ButtonProps) {
  return (
    <Button
      tone={tone}
      size={size}
      radius={radius}
      iconOnly={iconOnly}
      isDisabled={isDisabled}
      isPending={isPending}
    >
      {iconOnly ? <ArrowRight /> : children}
    </Button>
  );
}

export const controls = {
  children: {
    type: "text",
    defaultValue: "Click Me!",
    label: "Children",
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
    options: radius,
    defaultValue: "md",
    label: "Radius",
  },
  iconOnly: {
    type: "boolean",
    defaultValue: false,
    label: "Icon Only",
    mapping: {
      true: {
        imports: ['import { ArrowRight } from "lucide-react";'],
        children: "<ArrowRight />",
      },
    },
  },
  isDisabled: {
    type: "boolean",
    defaultValue: false,
    label: "Disabled",
  },
  isPending: {
    type: "boolean",
    defaultValue: false,
    label: "Pending (Loading)",
  },
};
