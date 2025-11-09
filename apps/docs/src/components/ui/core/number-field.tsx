"use client";

import * as React from "react";
import {
  Input,
  Button,
  type ButtonProps,
  NumberField as NumberFieldPrimitive,
  type NumberFieldProps as NumberFieldPrimitiveProps,
  type ValidationResult,
} from "react-aria-components";
import { Description, FieldError, FieldGroup, Label } from "./field";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { composeTailwindRenderProps } from "@/lib/render-props";
import { cva, type VariantProps } from "class-variance-authority";

const fieldBorderStyles = cva({
  base: "group-focus:border-primary/70",
  variants: {
    isInvalid: {
      true: "group-focus:border-destructive/70",
    },
    isDisabled: {
      true: "group-focus:border-input/70",
    },
  },
});

interface NumberFieldProps
  extends NumberFieldPrimitiveProps,
    VariantProps<typeof fieldBorderStyles> {
  label?: string;
  description?: string;
  placeholder?: string;
  error?: string | ((validation: ValidationResult) => string);
  indicator?: StepperButtonProps["indicator"];
}

const NumberField = ({
  label,
  placeholder,
  description,
  className,
  error,
  indicator,
  ...props
}: NumberFieldProps) => {
  return (
    <NumberFieldPrimitive
      {...props}
      className={composeTailwindRenderProps(
        className,
        "group relative my-2 w-full"
      )}
    >
      {label && (
        <Label className="absolute bottom-full start-0 mb-1">{label}</Label>
      )}
      <FieldGroup className="px-0">
        {(renderProps) => (
          <>
            <Input
              className="px-2 ring-0 flex-1 min-w-0 border-none bg-transparent p-0 shadow-none outline-hidden focus:outline-hidden focus:ring-0 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-70 tabular-nums"
              placeholder={placeholder}
            />
            <div
              className={fieldBorderStyles({
                ...renderProps,
                className:
                  "grid place-content-center ltr:border-l rtl:border-r",
              })}
            >
              <div className="flex h-full flex-col">
                <StepperButton
                  slot="increment"
                  indicator={indicator}
                  className="h-4 px-1"
                />
                <div
                  className={fieldBorderStyles({
                    ...renderProps,
                    className: "border-input border-b",
                  })}
                />
                <StepperButton
                  slot="decrement"
                  indicator={indicator}
                  className="h-4 px-1"
                />
              </div>
            </div>
          </>
        )}
      </FieldGroup>
      {!error && description ? (
        <Description className="absolute left-0 top-full mt-1 text-muted-foreground">
          {description}
        </Description>
      ) : null}

      {error ? (
        <FieldError
          asDefault
          message={error}
          className="absolute left-0 top-full mt-1"
        />
      ) : null}
    </NumberFieldPrimitive>
  );
};

interface StepperButtonProps extends ButtonProps {
  slot: "increment" | "decrement";
  indicator?: {
    increment?: React.ReactNode;
    decrement?: React.ReactNode;
  };
  className?: string;
}

const StepperButton = ({
  slot,
  className,
  indicator,
  ...props
}: StepperButtonProps) => {
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
      className={composeTailwindRenderProps(
        className,
        "relative z-10 h-10 cursor-default pressed:text-primary-foreground text-muted-foreground group-disabled:bg-secondary/70 sm:pressed:bg-primary [&_svg:not([class*='size-'])]:size-3.5"
      )}
      slot={slot}
      {...props}
    >
      {icon}
    </Button>
  );
};

export type { NumberFieldProps };
export { NumberField };
