"use client";

import { Slider, type SliderProps } from "@/components/ui/core/slider";

export default function BasicSlider({
  orientation = "horizontal",
  isDisabled = false,
  step = 1,
  output = "inline",
}: SliderProps) {
  return (
    <Slider
      label="Opacity"
      defaultValue={[50]}
      orientation={orientation}
      isDisabled={isDisabled}
      step={step}
      output={output}
      className={orientation === "vertical" ? "h-64" : "w-full max-w-sm"}
    />
  );
}

export const controls = {
  orientation: {
    type: "toggle-group",
    options: [
      { value: "horizontal", label: "Horizontal" },
      { value: "vertical", label: "Vertical" },
    ],
    defaultValue: "horizontal",
    label: "Orientation",
  },
  output: {
    type: "select",
    options: [
      { value: "inline", label: "Inline" },
      { value: "tooltip", label: "Tooltip" },
      { value: "none", label: "None" },
    ],
    defaultValue: "inline",
    label: "Output",
  },
  isDisabled: {
    type: "boolean",
    defaultValue: false,
    label: "Disabled",
  },
  step: {
    type: "number",
    defaultValue: 1,
    label: "Step",
  },
};
