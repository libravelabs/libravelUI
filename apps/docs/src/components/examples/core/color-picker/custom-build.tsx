"use client";

import { parseColor } from "@react-stately/color";
import { useState } from "react";
import { Button } from "@/components/ui/core/button";
import { ColorArea } from "@/components/ui/core/color-area";
import { ColorField } from "@/components/ui/core/color-field";
import { ColorPicker } from "@/components/ui/core/color-picker";
import { ColorSlider } from "@/components/ui/core/color-slider";
import { ColorSwatch } from "@/components/ui/core/color-swatch";
import { ColorThumb } from "@/components/ui/core/color-thumb";
import { Input } from "@/components/ui/core/input";
import {
  Popover,
  PopoverBody,
  PopoverContent,
} from "@/components/ui/core/popover";

export default function CustomBuildColorPicker() {
  const [color, setColor] = useState(parseColor("#155DFC"));

  return (
    <ColorPicker value={color} onChange={setColor}>
      <Popover>
        <Button tone="outline" data-slot="control">
          <ColorSwatch className="size-5" />
          Select color
        </Button>
        <PopoverContent>
          <PopoverBody className="grid gap-2 overflow-x-hidden">
            <ColorArea
              colorSpace="rgb"
              xChannel="red"
              yChannel="green"
              xName="red"
              yName="green"
            />
            <ColorSlider colorSpace="hsb" channel="hue">
              <ColorThumb />
            </ColorSlider>
            <ColorField aria-label="Color">
              <Input />
            </ColorField>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </ColorPicker>
  );
}
