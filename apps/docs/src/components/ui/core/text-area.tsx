"use client";

import {
  TextArea,
  type TextAreaProps as TextAreaPrimitiveProps,
} from "react-aria-components";
import { inputVariants, type InputProps } from "@/components/ui/core/input";
import { cn } from "@/lib/utils";

type TextareaProps = TextAreaPrimitiveProps & InputProps;

function Textarea({ className, variant, radius, ...props }: TextareaProps) {
  return (
    <TextArea
      className={cn(
        inputVariants({ variant, radius }),
        "field-sizing-content max-h-96 min-h-16 overflow-y-auto border border-input px-2.5 py-2 text-base placeholder-muted-foreground shadow-xs outline-hidden transition duration-200 sm:text-sm/6",
        className
      )}
      {...props}
    />
  );
}

export type { TextareaProps };
export { Textarea };
