"use client";

import * as React from "react";
import {
  Button,
  type ButtonProps,
  NumberField as NumberFieldPrimitive,
  type NumberFieldProps as NumberFieldPrimitiveProps,
} from "react-aria-components";
import { Minus, Plus } from "lucide-react";
import { Input, type InputProps } from "@/components/ui/field";
import { cn } from "@/lib/utils";

type NumberFieldProps = NumberFieldPrimitiveProps &
  InputProps & {
    indicator?: StepperButtonProps["indicator"];
  };

function NumberField({
  error,
  placeholder,
  description,
  label,
  labelExtra,
  classNames = { wrapper: "px-0.5 mx-0", input: "text-center" },
  variant,
  size,
  isDisabled,
  isLoading,
  className,
  indicator,
  ...props
}: NumberFieldProps) {
  const inputProps: InputProps = {
    placeholder,
    error,
    description,
    label,
    labelExtra,
    classNames,
    variant,
    size,
    isDisabled,
    isLoading,
  };

  const numberFieldProps: NumberFieldPrimitiveProps = {
    ...props,
    "aria-label":
      typeof props["aria-label"] === "string"
        ? props["aria-label"]
        : typeof label === "string"
          ? label
          : "number-field",
  };

  return (
    <NumberFieldPrimitive
      {...numberFieldProps}
      className={cn(className, "group relative w-full")}
    >
      <Input
        {...inputProps}
        startContent={
          <StepperButton
            indicator={indicator}
            slot="decrement"
            className="border-e border-border rounded-s-md"
          />
        }
        endContent={
          <StepperButton
            indicator={indicator}
            slot="increment"
            className="border-s border-border rounded-e-md"
          />
        }
      />
    </NumberFieldPrimitive>
  );
}

interface StepperButtonProps extends ButtonProps {
  slot: "increment" | "decrement";
  indicator?: {
    increment?: React.ReactNode;
    decrement?: React.ReactNode;
  };
  className?: string;
}

function StepperButton({
  slot,
  className,
  indicator,
  ...props
}: StepperButtonProps) {
  let icon: React.ReactNode;

  if (
    indicator &&
    typeof indicator === "object" &&
    !React.isValidElement(indicator)
  ) {
    icon = slot === "increment" ? indicator.increment : indicator.decrement;
  } else if (React.isValidElement(indicator)) {
    icon = indicator;
  } else {
    icon = slot === "increment" ? <Plus /> : <Minus />;
  }

  return (
    <Button
      className={cn(
        className,
        "size-[30px] inline-flex items-center justify-center cursor-pointer bg-muted text-muted-foreground pressed:bg-secondary pressed:text-secondary-foreground group-disabled:opacity-30 group-disabled:pointer-events-none"
      )}
      slot={slot}
      {...props}
    >
      {icon}
    </Button>
  );
}

export type { NumberFieldProps };
export { NumberField };
