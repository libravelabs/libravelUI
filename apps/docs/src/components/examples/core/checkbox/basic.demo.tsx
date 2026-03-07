"use client";

import { Checkbox, type CheckboxProps } from "@/components/ui/core/checkbox";

export default function CheckboxExample({
  size,
  label = "Subscribe newsletter",
  description = "Get the latest updates and news delivered to your inbox.",
  isDisabled,
}: CheckboxProps) {
  return (
    <Checkbox
      size={size}
      label={label}
      description={description}
      isDisabled={isDisabled}
    />
  );
}

export const controls = {
  label: {
    type: "text",
    defaultValue: "Subscribe newsletter",
  },
  description: {
    type: "textarea",
    defaultValue: "Get the latest updates and news delivered to your inbox.",
  },
  size: {
    type: "select",
    options: [
      { label: "Small", value: "sm" },
      { label: "Medium", value: "md" },
      { label: "Large", value: "lg" },
      { label: "Extra Large", value: "xl" },
    ],
    defaultValue: "md",
  },
  isDisabled: {
    label: "DIsabled",
    type: "boolean",
    defaultValue: false,
  },
};
