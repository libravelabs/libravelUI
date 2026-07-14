"use client";

import {
  DatePicker as DatePickerPrimitive,
  type DatePickerProps as DatePickerPrimitiveProps,
  type DateValue,
} from "react-aria-components";
import { cn } from "@/lib/utils";
import { Calendar, type CalendarProps } from "@/components/ui/core/calendar";
import { DateInput } from "@/components/ui/core/date-field";
import { type FieldProps, fieldStyles } from "@/components/ui/core/field";
import {
  PopoverContent,
  PopoverTrigger,
  type PopoverContentProps,
} from "@/components/ui/core/popover";
import { CalendarIcon } from "lucide-react";
import { InputGroup } from "@/components/ui/core/input";

interface DatePickerOverlayProps<T extends DateValue> extends Omit<
  PopoverContentProps,
  "children"
> {
  range?: boolean;
  calendar?: CalendarProps<T>;
}

interface DatePickerProps<T extends DateValue>
  extends DatePickerPrimitiveProps<T>, Omit<FieldProps, "placeholder"> {
  range?: boolean;
  pageBehavior?: "visible" | "single";
  popover?: DatePickerOverlayProps<T>;
}

function DatePicker<T extends DateValue>({
  className,
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
          <DatePickerOverlay<T> {...popover} />
        </>
      )}
    </DatePickerPrimitive>
  );
}

function DatePickerOverlay<T extends DateValue>({
  placement = "bottom",
  calendar,
  ...props
}: DatePickerOverlayProps<T>) {
  return (
    <PopoverContent
      placement={placement}
      className={cn("flex min-w-auto max-w-none snap-x justify-center")}
      {...props}
    >
      <Calendar {...calendar} className="border-0 p-0" />
    </PopoverContent>
  );
}

function DatePickerTrigger() {
  return (
    <InputGroup>
      <DateInput className="w-full" />
      <PopoverTrigger
        data-fullsize-ele
        tone="unstyled"
        className="group-disabled:opacity-20 group-disabled:cursor-not-allowed"
      >
        <CalendarIcon className="text-muted-foreground" />
      </PopoverTrigger>
    </InputGroup>
  );
}

export type { DatePickerProps, DatePickerOverlayProps };
export { DatePicker, DatePickerTrigger };
