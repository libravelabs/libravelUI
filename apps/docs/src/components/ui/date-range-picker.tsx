"use client";

import type { DateDuration } from "@internationalized/date";
import type { Placement } from "@react-types/overlays";
import {
  DateRangePicker as DateRangePickerPrimitive,
  type DateRangePickerProps as DateRangePickerPrimitiveProps,
  type DateValue,
  type ValidationResult,
} from "react-aria-components";
import { composeTailwindRenderProps } from "@/lib/render-props";
import { DateInput } from "@/components/ui/date-field";
import {
  Description,
  FieldError,
  FieldGroup,
  Label,
} from "@/components/ui/field";
import { CalendarIcon } from "lucide-react";
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RangeCalendar } from "@/components/ui/range-calendar";

interface DateRangePickerProps<T extends DateValue>
  extends DateRangePickerPrimitiveProps<T> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  visibleDuration?: DateDuration;
  pageBehavior?: "visible" | "single";
  placement?: Placement;
}

function DateRangePicker<T extends DateValue>({
  label,
  className,
  description,
  errorMessage,
  placement = "bottom",
  visibleDuration = { months: 1 },
  ...props
}: DateRangePickerProps<T>) {
  return (
    <DateRangePickerPrimitive
      aria-label={props["aria-label"] ?? "range-date-picker"}
      className={composeTailwindRenderProps(
        className,
        "group flex flex-col gap-y-1"
      )}
      {...props}
    >
      {label && <Label>{label}</Label>}
      <FieldGroup className="min-w-72 inset-ring inset-ring-input outline-hidden focus:inset-ring-ring/70 focus:ring-3 focus:ring-ring/20 group-open:inset-ring-ring/70 group-open:ring-3 group-open:ring-ring/20">
        <DateInput slot="start" />
        <span
          aria-hidden="true"
          className="-mx-2 text-foreground group-disabled:text-muted-foreground forced-colors:text-muted-foreground forced-colors:group-disabled:text-muted-foreground"
        >
          –
        </span>
        <DateInput className="me-auto" slot="end" />
        <PopoverTrigger
          asButton
          className="group-disabled:opacity-20 group-disabled:cursor-not-allowed"
        >
          <CalendarIcon />
        </PopoverTrigger>
      </FieldGroup>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
      <PopoverContent
        withArrow={false}
        placement={placement}
        className="p-2 flex min-w-auto max-w-none snap-x justify-center"
        {...props}
      >
        <RangeCalendar visibleDuration={visibleDuration} />
      </PopoverContent>
    </DateRangePickerPrimitive>
  );
}

export type { DateRangePickerProps };
export { DateRangePicker };
