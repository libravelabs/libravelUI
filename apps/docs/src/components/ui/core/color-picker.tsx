"use client";

import { use } from "react";
import {
  ColorPicker as ColorPickerPrimitive,
  ColorPickerStateContext,
  type ColorPickerProps as ColorPickerPrimitiveProps,
} from "react-aria-components";
import { Button, type ButtonProps } from "@/components/ui/core/button";
import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  type PopoverProps,
} from "@/components/ui/core/popover";
import { cn } from "@/lib/utils";
import { parseColor } from "@react-stately/color";
import { Pipette } from "lucide-react";
import {
  ColorSwatch,
  type ColorSwatchProps,
} from "@/components/ui/core/color-swatch";
import {
  ColorArea,
  type ColorAreaProps,
} from "@/components/ui/core/color-area";
import {
  ColorSlider,
  type ColorSliderProps,
} from "@/components/ui/core/color-slider";
import {
  ColorField,
  type ColorFieldProps,
} from "@/components/ui/core/color-field";
import { Input, type InputProps } from "@/components/ui/core/input";

interface ColorPickerProps extends ColorPickerPrimitiveProps {
  label?: string;
  className?: string;
  children?: React.ReactNode;
  withArrow?: boolean;
  isDisabled?: boolean;
  eyeDropper?: boolean;
  tone?: ButtonProps["tone"];

  popover?: PopoverProps;
  colorSwatch?: ColorSwatchProps;
  colorArea?: ColorAreaProps;
  colorSlider?: ColorSliderProps;
  colorSliderAlpha?: ColorSliderProps;
  colorField?: ColorFieldProps;
  input?: InputProps;
}

function ColorPicker({
  withArrow = false,
  label,
  isDisabled,
  tone = "outline",
  children,
  eyeDropper,
  className,
  popover,
  colorSwatch,
  colorArea,
  colorSlider,
  colorSliderAlpha,
  colorField,
  input,
  ...props
}: ColorPickerProps) {
  return (
    <div
      className={cn("flex flex-col items-start gap-y-1 max-w-3xs", className)}
    >
      <ColorPickerPrimitive {...props}>
        {children ?? (
          <Popover {...popover}>
            <PopoverTrigger
              tone={tone}
              isDisabled={isDisabled}
              iconOnly={!label}
              className={cn(
                "*:data-[slot=color-swatch]:-mx-0.5 w-full px-2.5 *:data-[slot=color-swatch]:size-5",
                "inset-ring inset-ring-input",
                "focus:inset-ring-ring/70 focus:ring-3 focus:ring-ring/20",
                "data-[state=open]:inset-ring-ring/70 data-[state=open]:ring-3 data-[state=open]:ring-ring/20",
                "cursor-pointer disabled:cursor-not-allowed"
              )}
            >
              <ColorSwatch {...colorSwatch} />
              {label && label}
            </PopoverTrigger>
            <PopoverContent className="p-1.5 rounded-xl" withArrow={withArrow}>
              <PopoverBody className="flex flex-col gap-y-1.5 overflow-x-hidden">
                <ColorArea
                  colorSpace="hsb"
                  xChannel="saturation"
                  yChannel="brightness"
                  className="w-auto"
                  {...colorArea}
                />
                <ColorSlider
                  showOutput={false}
                  colorSpace="hsb"
                  channel="hue"
                  {...colorSlider}
                />
                <ColorSlider
                  showOutput={false}
                  channel="alpha"
                  {...colorSliderAlpha}
                />
                <div className="flex items-center gap-1.5">
                  {eyeDropper && <EyeDropper />}
                  <ColorField {...colorField}>
                    <Input {...input} />
                  </ColorField>
                </div>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        )}
      </ColorPickerPrimitive>
    </div>
  );
}

declare global {
  interface Window {
    EyeDropper?: new () => {
      open: () => Promise<{ sRGBHex: string }>;
    };
  }
}

function EyeDropper() {
  const state = use(ColorPickerStateContext)!;

  if (!window.EyeDropper) {
    return "EyeDropper is not supported in your browser.";
  }

  return (
    <Button
      tone="outline"
      aria-label="Eye dropper"
      iconOnly
      onPress={() => {
        const eyeDropper = window.EyeDropper ? new window.EyeDropper() : null;
        eyeDropper
          ?.open()
          .then((result) => state.setColor(parseColor(result.sRGBHex)));
      }}
    >
      <Pipette />
    </Button>
  );
}

export { ColorPicker, EyeDropper, type ColorPickerProps };
