"use client";

import { Slider } from "@/components/ui/core/slider";

export default function RangeSlider() {
  return (
    <Slider
      defaultValue={[25, 75]}
      label="Distance Range"
      className="max-w-2xs"
    />
  );
}
