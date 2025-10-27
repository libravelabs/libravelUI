"use client";

import { ColorPicker } from "@/components/ui/colors";

export default function ColorPickerBasic() {
  return (
    <ColorPicker
      eyeDropper
      label="Pick a color"
      description="Pick a color you like and it will shown in your homepage"
    />
  );
}
