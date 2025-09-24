"use client";

import {
  Button,
  type ButtonProps,
  NumberField as NumberFieldPrimitive,
  type NumberFieldProps as NumberFieldPrimitiveProps,
  type ValidationResult,
} from "react-aria-components";
import { ChevronDown, ChevronUp, Minus, Plus } from "lucide-react";
import { Input } from "./field";
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
        classNames={{ wrapper: "px-0 mx-0", input: "text-center" }}
      />
    </NumberFieldPrimitive>
  );
}

interface StepperButtonProps extends ButtonProps {
  slot: "increment" | "decrement";
  indicator?: "chevron" | "default";
  className?: string;
}

function StepperButton({
  slot,
  className,
  indicator = "default",
  ...props
}: StepperButtonProps) {
  const icon =
    indicator === "chevron" ? (
      slot === "increment" ? (
        <ChevronUp className="size-5" />
      ) : (
        <ChevronDown className="size-5" />
      )
    ) : slot === "increment" ? (
      <Plus />
    ) : (
      <Minus />
    );

  return (
    <Button
      className={cn(
        className,
        "size-[33px] inline-flex items-center justify-center cursor-pointer bg-muted text-muted-foreground pressed:bg-secondary pressed:text-secondary-foreground group-disabled:opacity-30 group-disabled:pointer-events-none"
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
