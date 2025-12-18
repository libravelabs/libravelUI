"use client";

import { useState } from "react";
import { parseColor } from "@react-stately/color";
import { ColorField } from "@/components/ui/core/color-field";
import { ColorSwatch } from "@/components/ui/core/color-swatch";
import { Label } from "@/components/ui/core/field";
import { Input } from "@/components/ui/core/input";

export default function ControlledColorField() {
  const [color, setColor] = useState(parseColor("#FFFFFF"));

  return (
    <ColorField value={color} onChange={setColor} className="w-72">
      <Label>Color</Label>
      <Input
        placeholder="#FFFFFF"
        endContent={
          <ColorSwatch color={color} className="size-5 rounded-full" />
        }
      />
    </ColorField>
  );
}
