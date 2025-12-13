"use client";

import * as React from "react";
import {
  ColorArea as ColorAreaPrimitive,
  composeRenderProps,
  ColorThumb as ColorThumbPrimitive,
  ColorSlider as ColorSliderPrimitive,
  ColorSwatch as ColorSwatchPrimitive,
  ColorSwatchPickerItem as ColorSwatchPickerItemPrimitive,
  ColorSwatchPicker as ColorSwatchPickerPrimitive,
  ColorWheel as ColorWheelPrimitive,
  ColorPicker as ColorPickerPrimitive,
  ColorPickerStateContext,
  ColorWheelTrack,
  SliderOutput,
  SliderTrack,
  ColorField,
  type ColorSliderProps as ColorSliderPrimitiveProps,
  type ColorThumbProps,
  type ColorAreaProps,
  type ColorSwatchProps,
  type ColorSwatchPickerItemProps,
  type ColorSwatchPickerProps,
  type ColorWheelProps as ColorWheelPrimitiveProps,
  type ColorFieldProps as ColorFieldPrimitiveProps,
  type ColorPickerProps as ColorPickerPrimitiveProps,
} from "react-aria-components";
import { cn } from "@/lib/utils";
import { parseColor, type Color } from "@react-stately/color";
import { Description, Label } from "@/components/ui/core/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/core/popover";
import { Button, type ButtonProps } from "@/components/ui/core/button";
import { Pipette } from "lucide-react";
import { ColorArea } from "./color-area";

const defaultColor = parseColor("rgb(140, 92, 255)");

function ColorThumb({ className, ...props }: ColorThumbProps) {
  return (
    <ColorThumbPrimitive
      {...props}
      style={({ defaultStyle, isDisabled }) => ({
        ...defaultStyle,
        backgroundColor: isDisabled ? undefined : defaultStyle.backgroundColor,
      })}
      className={composeRenderProps(
        className,
        (className, { isFocusVisible, isDragging, isDisabled }) =>
          cn(
            "cursor-pointer top-[50%] start-[50%] size-6 rounded-full border-2 border-white [box-shadow:0_0_0_1px_black,_inset_0_0_0_1px_black]",
            isFocusVisible && "size-8",
            isDragging && "bg-muted-foreground",
            isDisabled &&
              "opacity-50 forced-colors:border-border forced-colors:bg-border",
            className
          )
      )}
    />
  );
}

function ColorSwatch({ className, ...props }: ColorSwatchProps) {
  return (
    <ColorSwatchPrimitive
      data-slot="color-swatch"
      aria-label={props["aria-label"] ?? "Color swatch"}
      className={cn(
        "inset-ring-1 inset-ring-foreground/10 size-8 shrink-0 rounded-lg",
        className
      )}
      {...props}
    />
  );
}

interface ColorSliderProps extends ColorSliderPrimitiveProps {
  label?: string;
  showOutput?: boolean;
}

function ColorSlider({
  showOutput = true,
  label,
  className,
  ...props
}: ColorSliderProps) {
  return (
    <ColorSliderPrimitive
      {...props}
      data-slot="color-slider"
      className={composeRenderProps(
        className,
        (className, { orientation, isDisabled }) =>
          cn(
            "group relative",
            orientation === "horizontal" &&
              "grid min-w-56 grid-cols-[1fr_auto]",
            orientation === "vertical" &&
              "flex flex-col items-center justify-center",
            isDisabled && "opacity-50 forced-colors:bg-[GrayText]",
            className
          )
      )}
    >
      <div className="flex items-center">
        {label && <Label className="text-sm [grid-area:label]">{label}</Label>}
        {showOutput && (
          <SliderOutput className="text-sm [grid-area:output] data-[orientation=horizontal]:ml-auto" />
        )}
      </div>
      <SliderTrack
        className={cn([
          "group col-span-2 rounded-lg",
          "orientation-horizontal:h-6 orientation-horizontal:w-full",
          "orientation-vertical:-translate-x-[50%] orientation-vertical:ml-[50%] orientation-vertical:h-56 orientation-vertical:w-6",
          "disabled:opacity-50 disabled:forced-colors:bg-[GrayText]",
        ])}
        style={({ defaultStyle, isDisabled }) => ({
          ...defaultStyle,
          background: isDisabled
            ? undefined
            : `${defaultStyle.background}, repeating-conic-gradient(#CCC 0% 25%, white 0% 50%) 50% / 16px 16px`,
        })}
      >
        <ColorThumb />
      </SliderTrack>
    </ColorSliderPrimitive>
  );
}

function ColorSwatchPicker({
  children,
  className,
  layout = "grid",
  ...props
}: ColorSwatchPickerProps) {
  return (
    <ColorSwatchPickerPrimitive
      layout={layout}
      className={cn("flex gap-1", className)}
      {...props}
    >
      {children}
    </ColorSwatchPickerPrimitive>
  );
}

function ColorSwatchPickerItem({
  className,
  children,
  ...props
}: ColorSwatchPickerItemProps) {
  return (
    <ColorSwatchPickerItemPrimitive
      className={cn(
        "cursor-pointer relative overflow-hidden rounded-sm outline-hidden disabled:opacity-50",
        className
      )}
      {...props}
    >
      {(values) => (
        <>
          {!children ? (
            <>
              <ColorSwatch
                className={cn(
                  (values.isSelected || values.isFocused || values.isPressed) &&
                    "border-2 border-foreground size-5",
                  values.isDisabled && "opacity-50"
                )}
              />
              {(values.isSelected || values.isFocused || values.isPressed) && (
                <span
                  aria-hidden
                  className="absolute left-1 top-1 size-1 rounded-full bg-foreground"
                />
              )}
            </>
          ) : typeof children === "function" ? (
            children(values)
          ) : (
            children
          )}
        </>
      )}
    </ColorSwatchPickerItemPrimitive>
  );
}

type ColorWheelProps = Omit<
  ColorWheelPrimitiveProps,
  "outerRadius" | "innerRadius"
>;

function ColorWheel(props: ColorWheelProps) {
  return (
    <ColorWheelPrimitive
      aria-label={props["aria-label"] ?? "Color-Wheel"}
      outerRadius={100}
      innerRadius={74}
      {...props}
    >
      <ColorWheelTrack
        className="disabled:bg-muted/75 forced-colors:disabled:bg-[GrayText]"
        style={({ defaultStyle, isDisabled }) => ({
          ...defaultStyle,
          background: isDisabled
            ? undefined
            : `${defaultStyle.background}, repeating-conic-gradient(#CCC 0% 25%, white 0% 50%) 50% / 16px 16px`,
        })}
      />
      <ColorThumb />
    </ColorWheelPrimitive>
  );
}

interface ColorPickerProps extends ColorPickerPrimitiveProps {
  label?: string;
  className?: string;
  children?: React.ReactNode;
  withArrow?: boolean;
  isDisabled?: boolean;
  description?: string;
  eyeDropper?: boolean;
  tone?: ButtonProps["tone"];
}

function ColorPicker({
  withArrow = false,
  label,
  isDisabled,
  tone = "outline",
  children,
  description,
  eyeDropper,
  className,
  ...props
}: ColorPickerProps) {
  return (
    <div
      className={cn("flex flex-col items-start gap-y-1 max-w-3xs", className)}
    >
      <ColorPickerPrimitive {...props}>
        <Popover>
          <PopoverTrigger
            tone={tone}
            isDisabled={isDisabled}
            size={label ? "default" : "icon"}
            className={cn(
              "*:data-[slot=color-swatch]:-mx-0.5 w-full px-2.5 *:data-[slot=color-swatch]:size-5",
              "inset-ring inset-ring-input",
              "focus:inset-ring-ring/70 focus:ring-3 focus:ring-ring/20",
              "data-[state=open]:inset-ring-ring/70 data-[state=open]:ring-3 data-[state=open]:ring-ring/20",
              "cursor-pointer disabled:cursor-not-allowed"
            )}
          >
            <ColorSwatch />
            {label && label}
          </PopoverTrigger>
          <PopoverContent className="p-1.5 rounded-xl" withArrow={withArrow}>
            <div className="flex flex-col gap-y-1.5">
              {children || (
                <>
                  <ColorArea
                    colorSpace="hsb"
                    xChannel="saturation"
                    yChannel="brightness"
                    className="w-auto"
                  />
                  <ColorSlider
                    showOutput={false}
                    colorSpace="hsb"
                    channel="hue"
                  />
                  <div className="flex items-center gap-1.5">
                    {eyeDropper && <EyeDropper />}
                    <ColorInput aria-label="Hex" preview={false} />
                  </div>
                </>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </ColorPickerPrimitive>
      {description && <Description>{description}</Description>}
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
  const state = React.use(ColorPickerStateContext)!;

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

export {
  ColorArea,
  ColorThumb,
  ColorSwatch,
  defaultColor,
  ColorSlider,
  ColorSwatchPicker,
  ColorSwatchPickerItem,
  ColorWheel,
  ColorPicker,
  EyeDropper,
};

export type { ColorWheelProps, ColorSliderProps, ColorPickerProps };
