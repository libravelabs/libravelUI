"use client";

import {
  DateField as DateFieldPrimitive,
  type DateFieldProps as DateFieldPrimitiveProps,
  DateInput as DateInputPrimitive,
  type DateInputProps,
  DateSegment,
  type DateValue,
  type ValidationResult,
} from "react-aria-components";
import { composeTailwindRenderProps } from "@/lib/primitive";
import { Description, FieldError, FieldGroup, Label } from "./field";
import { cn } from "@/lib/utils";

interface DateFieldProps<T extends DateValue>
  extends DateFieldPrimitiveProps<T> {
  label?: string;
  description?: string;
  error?: string | ((validation: ValidationResult) => string);
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
}

function DateField<T extends DateValue>({
  startContent,
  endContent,
  label,
  description,
  error,
  ...props
}: DateFieldProps<T>) {
  return (
    <DateFieldPrimitive
      {...props}
      aria-label={props["aria-label"] ?? label ?? "date-field"}
      className={composeTailwindRenderProps(
        props.className,
        "group flex flex-col gap-y-1"
      )}
    >
      {label && <Label>{label}</Label>}
      <FieldGroup>
        {startContent && typeof startContent === "string" ? (
          <span className="ms-2 text-muted-foreground">{startContent}</span>
        ) : (
          startContent
        )}
        <DateInput />
        {endContent ? (
          typeof endContent === "string" ? (
            <span className="me-2 text-muted-foreground">{endContent}</span>
          ) : (
            endContent
          )
        ) : null}
      </FieldGroup>
      {description && <Description>{description}</Description>}
      <FieldError>{error}</FieldError>
    </DateFieldPrimitive>
  );
}

function DateInput({ className, ...props }: Omit<DateInputProps, "children">) {
  return (
    <DateInputPrimitive
      className={composeTailwindRenderProps(
        className,
        "px-3 py-2 text-base text-foreground placeholder-muted-foreground outline-hidden sm:px-2.5 sm:py-1.5 sm:text-sm/6"
      )}
      {...props}
    >
      {(segment) => (
        <DateSegment
          segment={segment}
          className={cn(
            "inline shrink-0 rounded px-1.5 type-literal:px-0 text-foreground tracking-wider caret-transparent outline-0 forced-color-adjust-none data-placeholder:not-data-focused:text-muted-foreground sm:p-0.5 sm:py-0.5 sm:text-sm forced-colors:text-[ButtonText]",
            "focus:bg-accent focus:text-accent-foreground focus:data-invalid:bg-destructive focus:data-invalid:text-destructive-foreground forced-colors:focus:bg-[Highlight] forced-colors:focus:text-[HighlightText]",
            "disabled:opacity-50 forced-colors:disabled:text-[GrayText]"
          )}
        />
      )}
    </DateInputPrimitive>
  );
}

export type { DateFieldProps };
export { DateField, DateInput };
