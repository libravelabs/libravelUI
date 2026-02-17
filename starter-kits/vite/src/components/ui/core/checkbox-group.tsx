"use client";

import type { CheckboxGroupProps as CheckboxGroupPrimitiveProps } from "react-aria-components";
import { CheckboxGroup as CheckboxGroupPrimitive } from "react-aria-components";
import { cn } from "@/lib/utils";
import {
  FieldError,
  Description,
  Label,
  type FieldProps,
} from "@/components/ui/core/field";

type CheckboxGroupProps = CheckboxGroupPrimitiveProps & {
  label?: string;
  description?: string;
  error?: FieldProps["error"];
};

function CheckboxGroup({
  className,
  children,
  description,
  label,
  error,
  ...props
}: CheckboxGroupProps) {
  return (
    <CheckboxGroupPrimitive
      {...props}
      aria-label={props["aria-label"] ?? "checkbox-group"}
      className={cn(
        "flex flex-col gap-3 has-[[slot=description]]:gap-6 has-[[slot=description]]:**:data-[slot=label]:font-medium **:[[slot=description]]:block",
        className,
      )}
    >
      {(values) => (
        <>
          <div>
            {label && <Label>{label}</Label>}
            {description && <Description>{description}</Description>}
          </div>
          {typeof children === "function" ? children(values) : children}
          <FieldError message={error} />
        </>
      )}
    </CheckboxGroupPrimitive>
  );
}

export type { CheckboxGroupProps };
export { CheckboxGroup };
