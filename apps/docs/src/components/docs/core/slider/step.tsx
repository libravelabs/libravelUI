"use client";

import { Slider } from "@/components/ui/core/slider";

export default function StepSlider() {
  return (
    <Slider
      step={10}
      description="Step in 10"
      label="Progress tracking"
      className="max-w-2xs"
    />
  );
}
