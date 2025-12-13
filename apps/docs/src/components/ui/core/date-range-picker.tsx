"use client";

import type { DateDuration } from "@internationalized/date";
import {
  DateRangePicker as DateRangePickerPrimitive,
  PopoverProps,
  type DateRangePickerProps as DateRangePickerPrimitiveProps,
  type DateValue,
  type ValidationResult,
} from "react-aria-components";
import { cn } from "@/lib/utils";
import { DateInput } from "@/components/ui/core/date-field";
import {
  Description,
  FieldError,
  FieldGroup,
  Label,
  type FieldProps,
} from "@/components/ui/core/field";
import { CalendarIcon } from "lucide-react";
import { PopoverContent, PopoverTrigger } from "@/components/ui/core/popover";
import { RangeCalendar } from "@/components/ui/core/range-calendar";

interface DateRangePickerProps<T extends DateValue>
  extends DateRangePickerPrimitiveProps<T>, Omit<FieldProps, "placeholder"> {
  visibleDuration?: DateDuration;
  pageBehavior?: "visible" | "single";
  placement?: PopoverProps["placement"];
}

function DateRangePicker<T extends DateValue>({
  label,
  className,
  description,
  error,
  placement = "bottom",
  visibleDuration = { months: 1 },
  ...props
}: DateRangePickerProps<T>) {
  return (
    <DateRangePickerPrimitive
      aria-label={props["aria-label"] ?? "range-date-picker"}
      className={cn(className, "group flex flex-col gap-y-1")}
      {...props}
    >
      {label && <Label>{label}</Label>}
      <FieldGroup className="inset-ring inset-ring-input outline-hidden focus:inset-ring-ring/70 focus:ring-3 focus:ring-ring/20 group-open:inset-ring-ring/70 group-open:ring-3 group-open:ring-ring/20">
        <DateInput slot="start" />
        <span
          aria-hidden="true"
          className="-mx-2 text-foreground group-disabled:text-muted-foreground forced-colors:text-muted-foreground forced-colors:group-disabled:text-muted-foreground"
        >
          –
        </span>
        <DateInput slot="end" />
        <PopoverTrigger
          tone="unstyled"
          className="group-disabled:opacity-20 group-disabled:cursor-not-allowed"
        >
          <CalendarIcon className="ms-auto text-muted-foreground" />
        </PopoverTrigger>
      </FieldGroup>
      {description && <Description>{description}</Description>}
      {error && <FieldError>{error}</FieldError>}
      <PopoverContent
        withArrow={false}
        placement={placement}
        className="p-2 flex min-w-auto max-w-none w-auto snap-x justify-center"
        {...props}
      >
        <RangeCalendar visibleDuration={visibleDuration} className="border-0" />
      </PopoverContent>
    </DateRangePickerPrimitive>
  );
}

export type { DateRangePickerProps };
export { DateRangePicker };
