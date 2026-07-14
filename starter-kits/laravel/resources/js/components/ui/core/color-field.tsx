"use client";

import type { ColorFieldProps } from "react-aria-components";
import { ColorField as ColorFieldPrimitive } from "react-aria-components";
import { cn } from "@/lib/utils";
import { fieldStyles } from "@/components/ui/core/field";

function ColorField({ className, ...props }: ColorFieldProps) {
  return (
    <ColorFieldPrimitive
      {...props}
      aria-label={props["aria-label"] ?? "Color field"}
      data-slot="control"
      className={cn(fieldStyles(), className)}
    />
  );
}

export { ColorField, type ColorFieldProps };
