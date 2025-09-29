"use client";

import * as React from "react";
import {
  Button,
  type ButtonProps,
  NumberField as NumberFieldPrimitive,
  useLocale,
  type NumberFieldProps as NumberFieldPrimitiveProps,
  type ValidationResult,
} from "react-aria-components";
import { Minus, Plus } from "lucide-react";
import { Input } from "@/components/ui/field";
import { cn } from "@/lib/utils";

interface NumberFieldProps extends NumberFieldPrimitiveProps {
  label?: string;
  description?: string;
  placeholder?: string;
  error?: string | ((validation: ValidationResult) => string);
  indicator?: StepperButtonProps["indicator"];
}

function NumberField({
  label,
  placeholder,
  description,
  className,
  error,
  indicator,
  ...props
}: NumberFieldProps) {
  const { direction } = useLocale();

  return (
    <NumberFieldPrimitive
      {...props}
      aria-label={props["aria-label"] ?? label ?? "number-field"}
      className={cn(className, "group relative w-full")}
    >
      <Input
        label={label}
        placeholder={placeholder}
        description={description}
        error={error}
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
        classNames={{ wrapper: "px-0.5 mx-0", input: "text-center" }}
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
