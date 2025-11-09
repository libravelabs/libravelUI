"use client";

import { Slider } from "@/components/ui/core/slider";
import { useState } from "react";

export default function VerticalSlider() {
  const [lights, setLights] = useState({
    warm: 30,
    neutral: 60,
    cool: 90,
  });

  const handleSliderChange = (name: keyof typeof lights, value: number) => {
    setLights((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex justify-center gap-4 *:w-6">
      <Slider
        output="tooltip"
        aria-label="Warm Light"
        value={lights.warm}
        onChange={(v) => handleSliderChange("warm", v as number)}
        orientation="vertical"
      />
      <Slider
        output="tooltip"
        aria-label="Neutral Light"
        value={lights.neutral}
        onChange={(v) => handleSliderChange("neutral", v as number)}
        orientation="vertical"
      />
      <Slider
        output="tooltip"
        aria-label="Cool Light"
        value={lights.cool}
        onChange={(v) => handleSliderChange("cool", v as number)}
        orientation="vertical"
      />
    </div>
  );
}
