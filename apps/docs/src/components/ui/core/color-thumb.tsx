"use client";

import * as React from "react";
import {
  composeRenderProps,
  ColorThumb as ColorThumbPrimitive,
  type ColorThumbProps,
} from "react-aria-components";
import { cn } from "@/lib/utils";

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

export { ColorThumb };
