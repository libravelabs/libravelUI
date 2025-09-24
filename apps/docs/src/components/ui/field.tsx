"use client";

import * as React from "react";
import type {
  FieldErrorProps as FieldErrorPrimitiveProps,
  GroupProps,
  InputProps as InputPrimitiveProps,
  TextProps,
  ValidationResult,
} from "react-aria-components";
import {
  FieldError as FieldErrorPrimitive,
  Group,
  Input as InputPrimitive,
  Text,
} from "react-aria-components";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { Label } from "@/components/ui/label";
import { NumberField } from "@/components/ui/number-field";

const fieldVariants = cva(
  [
    "group file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex items-center w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium md:text-sm cursor-default disabled:cursor-not-allowed disabled:opacity-50 [&>.content]:text-neutral-400",
    "hover:inset-ring-[color-mix(in_oklab,var(--color-input)_50%,var(--color-muted-foreground)_25%)] focus-within:hover:inset-ring-ring/70 has-invalid:hover:inset-ring-destructive/70 invalid:inset-ring-destructive/70 focus-within:invalid:inset-ring-destructive/70 focus-within:invalid:ring-destructive/20 group-invalid:inset-ring-destructive/70 group-invalid:focus-within:inset-ring-destructive/70 group-invalid:focus-within:ring-destructive/20",
    "group-disabled:[&_svg]:opacity-50",
  ],
  {
    variants: {
      variant: {
        default:
          "inset-ring inset-ring-input focus-within:inset-ring-ring/70 focus-within:ring-3 focus-within:ring-ring/20",
        destructive:
          "border border-destructive inset-ring-destructive ring-3 ring-destructive/20 focus-within:inset-ring-destructive focus-within:ring-3 focus-within:ring-destructive/20",
        ghost:
          "border-none bg-transparent shadow-none focus-within:ring-0 focus-within:inset-ring-0",
      },
      size: {
        default: "h-9 [&_svg]:size-4.5",
        sm: "h-7 [&_svg]:size-4",
        lg: "h-11 [&_svg]:size-5",
        xl: "h-13 [&_svg]:size-5.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface FieldProps {
  label?: string;
  placeholder?: string;
  description?: string;
  error?: string | ((validation: ValidationResult) => string);
}

interface DescriptionProps extends TextProps {
  ref?: React.RefObject<HTMLElement>;
}
const Description = ({ ref, className, ...props }: DescriptionProps) => {
  return (
    <Text
      ref={ref}
      {...props}
      slot="description"
      className={cn(
        "text-sm text-muted-foreground group-disabled:opacity-50",
        className
      )}
    />
  );
};

interface FieldErrorProps extends FieldErrorPrimitiveProps {
  ref?: React.RefObject<HTMLElement>;
  message?: FieldProps["error"];
}

const FieldError = ({
  className,
  ref,
  message,
  children,
  ...props
}: FieldErrorProps) => {
  return (
    <FieldErrorPrimitive
      ref={ref}
      {...props}
      className={cn(
        "text-sm text-destructive group-disabled:opacity-50",
        className
      )}
    >
      {message ?? children}
    </FieldErrorPrimitive>
  );
};

interface FieldGroupProps
  extends GroupProps,
    VariantProps<typeof fieldVariants> {
  ref?: React.RefObject<HTMLDivElement>;
}

const FieldGroup = ({
  className,
  ref,
  variant,
  size,
  ...props
}: FieldGroupProps) => {
  return (
    <Group
      {...props}
      ref={ref}
      className={cn(fieldVariants({ variant: variant, size }), className)}
    />
  );
};

interface InputProps
  extends InputPrimitiveProps,
    VariantProps<typeof fieldVariants> {
  error?: string | ((validation: ValidationResult) => string);
  label?: string | React.ReactNode;
  description?: string;
  startContent?: string | React.ReactNode;
  endContent?: string | React.ReactNode;
  labelExtra?: string | React.ReactNode;
  isPassword?: boolean;
  classNames?: {
    container?: string;
    wrapper?: string;
    input?: string;
    label?: string;
    description?: string;
    error?: string;
    startContent?: string;
    endContent?: string;
    labelExtra?: string;
  };
}

function Input({
  error,
  description,
  startContent,
  endContent,
  label,
  labelExtra,
  classNames,
  variant,
  size,
  isPassword = false,
  ...props
}: InputProps) {
  const [visible, setVisible] = React.useState(false);

  const variantClass = error ? "destructive" : variant || "default";
  const inputType =
    props.type === "password" ? (visible ? "text" : "password") : props.type;

  if (props.type === "number") return <NumberField />;

  return (
    <div className={cn("grid gap-2", classNames?.container)}>
      {(label || labelExtra) && (
        <div className="flex justify-between items-center">
          {label && (
            <Label
              htmlFor={props.id || props.name}
              className={cn(classNames?.label)}
            >
              {label}
            </Label>
          )}
          {labelExtra && (
            <div
              className={cn(
                "content flex items-center",
                classNames?.labelExtra
              )}
            >
              {labelExtra}
            </div>
          )}
        </div>
      )}

      <div>
        <FieldGroup
          className={cn(
            fieldVariants({ variant: variantClass, size }),
            props.className || classNames?.wrapper
          )}
        >
          {startContent && (
            <div
              className={cn(
                "content me-2 flex items-center",
                classNames?.startContent
              )}
            >
              {startContent}
            </div>
          )}

          <InputPrimitive
            {...props}
            type={inputType}
            aria-invalid={!!error}
            aria-describedby={error ? `${props.id}-error` : undefined}
            className={cn(
              "ring-0 flex-1 border-none bg-transparent p-0 shadow-none outline-hidden focus:outline-hidden focus:ring-0 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
              classNames?.input
            )}
          />

          {(props.type === "password" || isPassword) && (
            <div
              className="content ms-2 flex cursor-pointer items-center"
              onClick={() => setVisible(!visible)}
            >
              {visible ? (
                <EyeOff className="size-4.5" />
              ) : (
                <Eye className="size-4.5" />
              )}
            </div>
          )}

          {endContent && (
            <div
              className={cn(
                "content ms-2 flex items-center",
                classNames?.endContent
              )}
            >
              {endContent}
            </div>
          )}
        </FieldGroup>

        <Description className={cn("m-0 mt-1", classNames?.description)}>
          {description}
        </Description>
      </div>
      <FieldError
        id={`${props.id}-error`}
        message={error}
        className={cn("-mt-2", classNames?.error)}
      />
    </div>
  );
}

export type { FieldProps, InputProps, DescriptionProps, FieldErrorProps };
export { Description, FieldError, FieldGroup, Input };
