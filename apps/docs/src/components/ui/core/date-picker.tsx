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
  Label,
} from "@/components/ui/core/field";
import { PopoverContent, PopoverTrigger } from "@/components/ui/core/popover";
import { CalendarIcon } from "lucide-react";

interface DatePickerProps<T extends DateValue>
  extends DatePickerPrimitiveProps<T>,
    Pick<PopoverProps, "placement">,
    Omit<FieldProps, "placeholder"> {
  range?: boolean;
  visibleDuration?: DateDuration;
  pageBehavior?: "visible" | "single";
}

function DatePicker<T extends DateValue>({
  label,
  className,
  description,
  error,
  placement,
  ...props
}: DatePickerProps<T>) {
  return (
    <DatePickerPrimitive
      aria-label={props["aria-label"] ?? "date-picker"}
      className={cn("group grid gap-2", className)}
      {...props}
    >
      {label && <Label>{label}</Label>}
      <FieldGroup className="inset-ring inset-ring-input outline-hidden focus:inset-ring-ring/70 focus:ring-3 focus:ring-ring/20 group-open:inset-ring-ring/70 group-open:ring-3 group-open:ring-ring/20">
        <DateInput className="w-full" />
        <PopoverTrigger
          plain
          className="group-disabled:opacity-20 group-disabled:cursor-not-allowed"
        >
          <CalendarIcon className="text-muted-foreground" />
        </PopoverTrigger>
      </FieldGroup>
      {!error && description && <Description>{description}</Description>}
      {error && <FieldError className="-mt-1">{error}</FieldError>}

      <PopoverContent
        withArrow={false}
        placement={placement}
        className="p-2 flex min-w-auto max-w-none w-auto snap-x justify-center"
        {...props}
      >
        <Calendar className="border-0" />
      </PopoverContent>
    </DatePickerPrimitive>
  );
}
export type { DatePickerProps };
export { DatePicker };
