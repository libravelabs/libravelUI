"use client";

import { ColorSlider } from "@/components/ui/core/colors";

export default function ColorSliderBasic() {
  return (
    <ColorSlider
      label="Fill color"
      channel="alpha"
      defaultValue="hsl(0, 100%, 50%)"
    />
  );
}
