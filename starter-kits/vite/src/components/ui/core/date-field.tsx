"use client";

import {
  DateField as DateFieldPrimitive,
  DateInput as DateInputPrimitive,
  DateSegment,
  type DateFieldProps as DateFieldPrimitiveProps,
  type DateInputProps as DateInputPrimitiveProps,
  type DateValue,
} from "react-aria-components";
import { fieldStyles } from "@/components/ui/core/field";
import {
  type InputGroupProps,
  inputVariants,
} from "@/components/ui/core/input";
import { cn } from "@/lib/utils";

interface DateFieldProps<
  T extends DateValue,
> extends DateFieldPrimitiveProps<T> {
  classNames?: {
    wrapper?: string | string[];
    group?: string | string[];
  };
}

function DateField<T extends DateValue>({
  classNames,
  ...props
}: DateFieldProps<T>) {
  return (
    <DateFieldPrimitive
      {...props}
      aria-label={props["aria-label"] ?? "date-field"}
      className={cn(
        fieldStyles(),
        "w-fit",
        props.className,
        classNames?.wrapper
      )}
    />
  );
}

interface DateInputProps
  extends
    Omit<DateInputPrimitiveProps, "children">,
    Pick<InputGroupProps, "tone" | "size" | "radius"> {
  classNames?: {
    wrapper?: string | string[];
    input?: string | string[];
  };
}

function DateInput({
  tone,
  size,
  radius,
  className,
  classNames,
  ...props
}: DateInputProps) {
  return (
    <div
      data-input
      className={cn(
        inputVariants({ tone, size, radius }),
        classNames?.wrapper,
        className
      )}
    >
      <DateInputPrimitive
        className={cn(
          "flex-1 min-w-0 bg-transparent outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed px-0",
          classNames?.input
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
    </div>
  );
}

export type { DateFieldProps };
export { DateField, DateInput };
