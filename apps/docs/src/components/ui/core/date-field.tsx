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
import {
  Description,
  FieldError,
  FieldGroup,
  Label,
} from "@/components/ui/core/field";
import { cn } from "@/lib/utils";

interface DateFieldProps<T extends DateValue>
  extends DateFieldPrimitiveProps<T> {
  label?: string;
  description?: string;
  error?: string | ((validation: ValidationResult) => string);
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  classNames?: {
    wrapper?: string | string[];
    label?: string | string[];
    group?: string | string[];
    startContent?: string | string[];
    endContent?: string | string[];
    description?: string | string[];
    error?: string | string[];
  };
}

function DateField<T extends DateValue>({
  startContent,
  endContent,
  label,
  description,
  error,
  classNames,
  ...props
}: DateFieldProps<T>) {
  return (
    <DateFieldPrimitive
      {...props}
      aria-label={props["aria-label"] ?? label ?? "date-field"}
      className={cn(
        props.className,
        classNames?.wrapper,
        "group flex flex-col gap-y-1"
      )}
    >
      {label && <Label className={cn(classNames?.label)}>{label}</Label>}
      <FieldGroup className={cn(classNames?.group)}>
        {startContent && typeof startContent === "string" ? (
          <span
            className={cn(
              classNames?.startContent,
              "me-2 text-muted-foreground"
            )}
          >
            {startContent}
          </span>
        ) : startContent ? (
          <div
            className={cn(
              "content me-2 flex items-center",
              classNames?.startContent
            )}
          >
            {startContent}
          </div>
        ) : null}
        <DateInput />
        {endContent && typeof endContent === "string" ? (
          <span
            className={cn(classNames?.endContent, "ms-2 text-muted-foreground")}
          >
            {endContent}
          </span>
        ) : endContent ? (
          <div
            className={cn(
              "content me-2 flex items-center",
              classNames?.endContent
            )}
          >
            {endContent}
          </div>
        ) : null}
      </FieldGroup>
      {description && (
        <Description className={cn(classNames?.description)}>
          {description}
        </Description>
      )}
      <FieldError className={cn(classNames?.error)}>{error}</FieldError>
    </DateFieldPrimitive>
  );
}

function DateInput({ className, ...props }: Omit<DateInputProps, "children">) {
  return (
    <DateInputPrimitive
      className={cn(
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
