"use client";

import { Slider } from "@/components/ui/core/slider";

export default function TooltipSlider() {
  return <Slider output="tooltip" defaultValue={30} className="max-w-2xs" />;
}
