"use client";

import type {
  FieldErrorProps as FieldErrorPrimitiveProps,
  GroupProps,
  TextProps,
  ValidationResult,
  LabelProps as LabelPrimitiveProps,
} from "react-aria-components";
import {
  FieldError as FieldErrorPrimitive,
  Label as LabelPrimitive,
  Group,
  Text,
} from "react-aria-components";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const fieldStyles = cva(["group grid gap-1 w-full"]);

function Label({ className, ...props }: LabelPrimitiveProps) {
  return (
    <LabelPrimitive
      data-slot="label"
      className={cn(
        "flex items-center w-fit gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

interface FieldProps {
  label?: string;
  placeholder?: string;
  description?: string;
  error?: React.ReactNode | ((validation: ValidationResult) => string);
}

interface DescriptionProps extends TextProps {
  ref?: React.RefObject<HTMLElement>;
}

function Description({ ref, className, ...props }: DescriptionProps) {
  return (
    <Text
      ref={ref}
      {...props}
      slot="description"
      className={cn(
        "text-sm text-muted-foreground group-disabled:opacity-50",
        className,
      )}
    />
  );
}

interface FieldErrorProps extends FieldErrorPrimitiveProps {
  ref?: React.RefObject<HTMLElement>;
  message?: FieldProps["error"];
  slot?: string;
}

function FieldError({
  className,
  ref,
  message,
  children,
  ...props
}: FieldErrorProps) {
  return (
    <FieldErrorPrimitive
      ref={ref}
      {...props}
      className={cn(
        "text-sm text-destructive group-disabled:opacity-50",
        className,
      )}
    >
      {message ?? children}
    </FieldErrorPrimitive>
  );
}

interface FieldGroupProps extends GroupProps, VariantProps<typeof fieldStyles> {
  ref?: React.RefObject<HTMLDivElement>;
}

function FieldGroup({ className, ref, ...props }: FieldGroupProps) {
  return (
    <Group {...props} ref={ref} className={cn(fieldStyles(), className)} />
  );
}

export type { FieldProps, FieldGroupProps, DescriptionProps, FieldErrorProps };
export { Description, Label, FieldError, FieldGroup, fieldStyles };
