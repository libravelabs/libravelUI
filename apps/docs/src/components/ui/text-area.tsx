"use client";

import {
  TextArea,
  TextField,
  type TextFieldProps,
} from "react-aria-components";
import {
  Description,
  FieldError,
  fieldVariants,
  Label,
  type FieldProps,
  type FieldGroupProps,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";

type TextareaProps = Omit<TextFieldProps, "className"> &
  FieldProps &
  FieldGroupProps & {
    classNames?: {
      wrapper?: string | string[];
      input?: string | string[];
      description?: string | string[];
      errorState?: string | string[];
    };
  };

function Textarea({
  classNames,
  className,
  placeholder,
  label,
  description,
  error,
  variant,
  radius,
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
          fieldVariants({ variant, radius }),
          "field-sizing-content max-h-96 min-h-16 border border-input px-2.5 py-2 text-base placeholder-muted-foreground shadow-xs outline-hidden transition duration-200 sm:text-sm/6",
          classNames?.input,
          className
        )}
      />
      {!error && description && (
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
