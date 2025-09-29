"use client";

import {
  TextField as TextFieldPrimitive,
  type TextFieldProps as TextFieldPrimitiveProps,
  type ValidationResult,
} from "react-aria-components";
import { Input, type InputProps } from "@/components/ui/field";
import { cn } from "@/lib/utils";

interface TextFieldProps extends TextFieldPrimitiveProps, InputProps {
  label?: string;
  description?: string;
  placeholder?: string;
  error?: string | ((validation: ValidationResult) => string);
  startContent?: InputProps["startContent"];
  endContent?: InputProps["endContent"];
  isLoading?: InputProps["isLoading"];
  variant?: InputProps["variant"];
  size?: InputProps["size"];
}

function TextField({
  label,
  placeholder,
  description,
  error,
  startContent,
  endContent,
  className,
  children,
  labelExtra,
  classNames,
  variant,
  size,
  isPassword,
  isLoading,
  ...rest
}: TextFieldProps) {
  const inputProps: InputProps = {
    placeholder,
    error,
    description,
    startContent,
    endContent,
    label,
    labelExtra,
    classNames,
    variant,
    size,
    isPassword,
    isLoading,
  };

  const textFieldProps: TextFieldPrimitiveProps = {
    ...rest,
    "aria-label": rest["aria-label"] ?? label ?? "search-bar",
  };

  return (
    <TextFieldPrimitive
      {...textFieldProps}
      className={cn(className, "group relative w-full")}
    >
      {(values) => (
        <>
          {typeof children === "function" ? (
            children(values)
          ) : children ? (
            children
          ) : (
            <Input {...inputProps} />
          )}
        </>
      )}
    </TextFieldPrimitive>
  );
}

export type { TextFieldProps };
export { TextField };
