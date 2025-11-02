"use client";

import {
  TextField as TextFieldPrimitive,
  type TextFieldProps as TextFieldPrimitiveProps,
} from "react-aria-components";
import { Input, type InputProps } from "@/components/ui/field";
import { cn } from "@/lib/utils";

type TextFieldProps = TextFieldPrimitiveProps & InputProps;

function TextField({
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
  isDisabled,
  isLoading,
  className,
  children,
  ...props
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
    isDisabled,
    isLoading,
  };

  const textFieldProps: TextFieldPrimitiveProps = {
    ...props,
    "aria-label":
      typeof props["aria-label"] === "string"
        ? props["aria-label"]
        : typeof label === "string"
          ? label
          : "text-field",
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
            <Input {...inputProps} type={props.type} />
          )}
        </>
      )}
    </TextFieldPrimitive>
  );
}

export type { TextFieldProps };
export { TextField };
