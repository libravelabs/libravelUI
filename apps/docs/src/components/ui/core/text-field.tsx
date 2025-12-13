"use client";

import {
  TextField as TextFieldPrimitive,
  type TextFieldProps as TextFieldPrimitiveProps,
} from "react-aria-components";
import { cn } from "@/lib/utils";
import { fieldStyles } from "@/components/ui/core/field";

function TextField({ className, children, ...props }: TextFieldPrimitiveProps) {
  return (
    <TextFieldPrimitive {...props} className={cn(fieldStyles(), className)}>
      {(values) => (
        <>
          {typeof children === "function"
            ? children(values)
            : children && children}
        </>
      )}
    </TextFieldPrimitive>
  );
}

export { TextField };
