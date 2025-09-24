"use client";

import {
  TextArea,
  TextField,
  type TextFieldProps,
} from "react-aria-components";
import { Description, FieldError, type FieldProps } from "./field";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface TextareaProps extends Omit<TextFieldProps, "className">, FieldProps {
  classNames?: {
    wrapper?: string | string[];
    input?: string | string[];
    description?: string | string[];
    errorState?: string | string[];
  };
}

function Textarea({
  classNames,
  placeholder,
  label,
  description,
  error,
  ...props
}: TextareaProps) {
  return (
    <TextField
      {...props}
      className={cn(
        "group flex flex-col gap-y-1 *:data-[slot=label]:font-medium",
        classNames?.wrapper
      )}
    >
      {label && <Label>{label}</Label>}
      <TextArea
        placeholder={placeholder}
        className={cn(
          "field-sizing-content max-h-96 min-h-16 w-full min-w-72 rounded-lg border border-input px-2.5 py-2 text-base placeholder-muted-foreground shadow-xs outline-hidden transition duration-200 sm:text-sm/6",
          "focus:border-ring/70 focus:ring-3 focus:ring-ring/20",
          "focus:invalid:border-destructive/70 focus:invalid:ring-3 focus:invalid:ring-destructive/20",
          classNames?.input
        )}
      />
      {description && (
        <Description className={cn("max-w-72", classNames?.description)}>
          {description}
        </Description>
      )}
      <FieldError error={error} className={cn(classNames?.errorState)} />
    </TextField>
  );
}

export type { TextareaProps };
export { Textarea };
