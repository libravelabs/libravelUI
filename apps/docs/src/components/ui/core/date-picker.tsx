"use client";

import type { DateDuration } from "@internationalized/date";
import {
  DatePicker as DatePickerPrimitive,
  type DatePickerProps as DatePickerPrimitiveProps,
  type DateValue,
  type PopoverProps,
} from "react-aria-components";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/core/calendar";
import { DateInput } from "@/components/ui/core/date-field";
import {
  Description,
  FieldError,
  FieldGroup,
  type FieldProps,
  fieldStyles,
  Label,
} from "@/components/ui/core/field";
import {
  PopoverContent,
  PopoverContentProps,
  PopoverTrigger,
} from "@/components/ui/core/popover";
import { CalendarIcon } from "lucide-react";
import { inputVariants } from "./input";

interface DatePickerProps<T extends DateValue>
  extends
    DatePickerPrimitiveProps<T>,
    Pick<PopoverProps, "placement">,
    Omit<FieldProps, "placeholder"> {
  range?: boolean;
  visibleDuration?: DateDuration;
  pageBehavior?: "visible" | "single";
  popover?: PopoverContentProps;
}

function DatePicker<T extends DateValue>({
  className,
  placement,
  children,
  popover,
  ...props
}: DatePickerProps<T>) {
  return (
    <DatePickerPrimitive
      aria-label={props["aria-label"] ?? "date-picker"}
      className={cn(fieldStyles(), className)}
      {...props}
    >
      {(values) => (
        <>
          {typeof children === "function" ? children(values) : children}
          <DatePickerOverlay {...popover} />
        </>
      )}
    </DatePickerPrimitive>
  );
}

function DatePickerOverlay({
  placement = "bottom",
  ...props
}: PopoverContentProps) {
  return (
    <PopoverContent
      withArrow={false}
      placement={placement}
      className="p-2 flex min-w-auto max-w-none w-auto snap-x justify-center"
      {...props}
    >
      <Calendar className="border-0" />
    </PopoverContent>
  );
}

function DatePickerTrigger({ ...props }: PopoverContentProps) {
  return (
    <div className={cn(inputVariants(), "flex items-center gap-2")}>
      <DateInput className="w-full" />
      <PopoverTrigger
        tone="unstyled"
        className="group-disabled:opacity-20 group-disabled:cursor-not-allowed"
      >
        <CalendarIcon className="text-muted-foreground" />
      </PopoverTrigger>
    </div>
  );
}

export type { DatePickerProps };
export { DatePicker, DatePickerTrigger };
