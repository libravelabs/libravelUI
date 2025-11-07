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
        "group relative flex flex-col gap-y-1 *:data-[slot=label]:font-medium w-full",
        className,
        classNames?.wrapper
      )}
    >
      {label && (
        <Label className="absolute bottom-full start-0 mb-1">{label}</Label>
      )}
      <TextArea
        placeholder={placeholder}
        className={cn(
          fieldVariants({ variant, radius }),
          "field-sizing-content max-h-96 min-h-16 border border-input px-2.5 py-2 text-base placeholder-muted-foreground shadow-xs outline-hidden transition duration-200 sm:text-sm/6",
          classNames?.input
        )}
      />
      {!error && description && (
        <Description
          className={cn(
            "absolute left-0 top-full mt-1 max-w-72",
            classNames?.description
          )}
        >
          {description}
        </Description>
      )}
      {error && (
        <FieldError
          asDefault
          message={error}
          className={cn(
            "absolute left-0 top-full mt-1",
            classNames?.errorState
          )}
        />
      )}
    </TextField>
  );
}

export type { TextareaProps };
export { Textarea };
