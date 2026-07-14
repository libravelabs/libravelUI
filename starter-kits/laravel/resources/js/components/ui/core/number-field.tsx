"use client";

import * as React from "react";
import {
  Button,
  type ButtonProps,
  NumberField as NumberFieldPrimitive,
  type NumberFieldProps as NumberFieldPrimitiveProps,
} from "react-aria-components";
import { Minus, Plus } from "lucide-react";
import { composeTailwindRenderProps } from "@/lib/render-props";
import { Input, type InputProps } from "@/components/ui/core/input";
import { cn } from "@/lib/utils";
import { fieldStyles } from "@/components/ui/core/field";

function NumberField({ className, ...props }: NumberFieldPrimitiveProps) {
  return (
    <NumberFieldPrimitive {...props} className={cn(fieldStyles(), className)} />
  );
}

interface NumberInputProps extends Omit<
  InputProps,
  "startContent" | "endContent"
> {
  indicator?: StepperButtonProps["indicator"];
}

function NumberInput({ indicator, ...props }: NumberInputProps) {
  return (
    <Input
      classNames={{
        wrapper: "px-0",
        input: "text-center",
      }}
      startContent={<StepperButton slot="decrement" indicator={indicator} />}
      endContent={<StepperButton slot="increment" indicator={indicator} />}
      {...props}
    />
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
      data-fullsize-ele
      className={composeTailwindRenderProps(
        className,
        "bg-secondary pressed:bg-secondary/70",
      )}
      slot={slot}
      {...props}
    >
      {icon}
    </Button>
  );
}

export type { NumberInputProps };
export { NumberField, NumberInput };
