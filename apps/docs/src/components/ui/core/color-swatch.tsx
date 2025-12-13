"use client";

import * as React from "react";
import {
  ColorSwatch as ColorSwatchPrimitive,
  type ColorSwatchProps,
} from "react-aria-components";
import { cn } from "@/lib/utils";

function ColorSwatch({ className, ...props }: ColorSwatchProps) {
  return (
    <ColorSwatchPrimitive
      data-slot="color-swatch"
      aria-label={props["aria-label"] ?? "Color swatch"}
      className={cn(
        "inset-ring-1 inset-ring-foreground/20 size-[calc(var(--color-swatch-size)+--spacing(1))] shrink-0 [--color-swatch-size:--spacing(9)] sm:size-(--color-swatch-size) rounded-lg",
        className
      )}
      {...props}
    />
  );
}

export { ColorSwatch };
