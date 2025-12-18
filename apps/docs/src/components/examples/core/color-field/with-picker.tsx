"use client";

import { useState } from "react";
import { parseColor } from "react-aria-components";
import { ColorField } from "@/components/ui/core/color-field";
import { Label } from "@/components/ui/core/field";
import { Input } from "@/components/ui/core/input";
import { ColorPicker } from "@/components/ui/core/color-picker";

export default function WithPickerColorField() {
  const [color, setColor] = useState(parseColor("#FFFFFF"));

  return (
    <ColorField value={color} onChange={setColor} className="w-72">
      <Label>Color</Label>
      <Input
        placeholder="#FFFFFF"
        endContent={
          <ColorPicker
            eyeDropper
            value={color}
            onChange={setColor}
            tone="unstyled"
            colorSwatch={{
              className: "size-5 cursor-pointer",
            }}
          />
        }
      />
    </ColorField>
  );
}
