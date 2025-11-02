"use client";

import * as React from "react";
import type {
  FieldErrorProps as FieldErrorPrimitiveProps,
  GroupProps,
  InputProps as InputPrimitiveProps,
  TextProps,
  ValidationResult,
  LabelProps as LabelPrimitiveProps,
} from "react-aria-components";
import {
  FieldError as FieldErrorPrimitive,
  Label as LabelPrimitive,
  Group,
  Input as InputPrimitive,
  Text,
} from "react-aria-components";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { NumberField, NumberFieldProps } from "@/components/ui/number-field";
import { Loader } from "@/components/ui/loader";

const fieldVariants = cva(
  [
    "group flex items-center w-full min-w-0",
    "px-3 py-1 border bg-transparent",
    "text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
    "transition-[color,box-shadow] outline-none",
    "disabled:pointer-events-none disabled:opacity-80",
    "file:border-0 file:bg-transparent file:text-sm file:font-medium file:inline-flex file:h-7",
    "[&>.content]:text-neutral-400",
    "group-disabled:[&_svg]:opacity-50",
    "transition-all ease-in-out",
  ],
  {
    variants: {
      variant: {
        default: [
          "border-input inset-ring inset-ring-input",
          "hover:inset-ring-[color-mix(in_oklab,var(--color-input)_50%,var(--color-muted-foreground)_25%)]",
          "focus-within:inset-ring-ring/70 focus-within:ring-3 focus-within:ring-ring/20",
          "focus:inset-ring-ring/70 focus:ring-3 focus:ring-ring/20",
          "focus-within:hover:inset-ring-ring/70 focus:hover:inset-ring-ring/70",
          "group-invalid:border-input group-invalid:inset-ring-destructive group-invalid:ring-3 group-invalid:ring-destructive/20",
          "group-invalid:focus-within:inset-ring-destructive group-invalid:focus-within:ring-3 group-invalid:focus-within:ring-destructive/20",
          "group-invalid:focus:inset-ring-destructive group-invalid:focus:ring-3 group-invalid:focus:ring-destructive/20",
          "group-invalid:hover:inset-ring-destructive",
          "group-invalid:focus-within:hover:inset-ring-destructive group-invalid:focus:hover:inset-ring-destructive",
          "group-invalid:invalid:inset-ring-destructive group-invalid:focus-within:invalid:ring-destructive/20 group-invalid:focus:invalid:ring-destructive/20",
        ],
        destructive: [
          "border-input inset-ring-destructive ring-3 ring-destructive/20",
          "focus-within:inset-ring-destructive focus-within:ring-3 focus-within:ring-destructive/20",
          "focus:inset-ring-destructive focus:ring-3 focus:ring-destructive/20",
          "hover:inset-ring-destructive focus-within:hover:inset-ring-destructive focus:hover:inset-ring-destructive",
          "invalid:inset-ring-destructive focus-within:invalid:ring-destructive/20 focus:invalid:ring-destructive/20",
        ],
        ghost: [
          "border-none ring-0 inset-ring-0 outline-none shadow-none bg-transparent",
          "hover:inset-ring-0 focus-within:inset-ring-0 focus-within:ring-0 focus:ring-0 focus:outline-none",
          "focus:inset-ring-0 focus:ring-0 focus:outline-none",
          "invalid:inset-ring-0 has-invalid:inset-ring-0 group-invalid:inset-ring-0",
        ],
        line: [
          "border-0 border-b border-foreground/30 ring-0 inset-ring-0 outline-none shadow-none bg-transparent !rounded-none",
          "hover:inset-ring-0 focus-within:inset-ring-0 focus-within:ring-0 focus:ring-0 focus:outline-none",
          "focus:inset-ring-0 focus:ring-0 focus:outline-none",
          "invalid:inset-ring-0 has-invalid:inset-ring-0 group-invalid:inset-ring-0",
          "focus-within:border-foreground/70 focus:border-foreground/70",
        ],
      },
      size: {
        sm: "h-7 text-sm [&_svg:not([class*='size-'])]:size-4",
        default:
          "h-9 text-base md:text-sm [&_svg:not([class*='size-'])]:size-4.5",
        lg: "h-11 text-base md:text-base [&_svg:not([class*='size-'])]:size-5",
        xl: "h-13 text-base md:text-base [&_svg:not([class*='size-'])]:size-5.5",
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      radius: "md",
    },
  }
);

function Label({ className, ...props }: LabelPrimitiveProps) {
  return (
    <LabelPrimitive
      data-slot="label"
      className={cn(
        "flex items-center w-fit gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

interface FieldProps {
  label?: string;
  placeholder?: string;
  description?: string;
  error?: React.ReactNode | ((validation: ValidationResult) => string);
}

interface DescriptionProps extends TextProps {
  ref?: React.RefObject<HTMLElement>;
}

function Description({ ref, className, ...props }: DescriptionProps) {
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
}

interface FieldErrorProps extends FieldErrorPrimitiveProps {
  ref?: React.RefObject<HTMLElement>;
  message?: FieldProps["error"];
  asDefault?: boolean;
}

function FieldError({
  className,
  ref,
  message,
  children,
  asDefault = false,
  ...props
}: FieldErrorProps) {
  if (asDefault) {
    return (
      <p
        {...props}
        className={cn(
          "text-sm text-destructive group-disabled:opacity-50",
          className
        )}
      >
        {message ?? children}
      </p>
    );
  }

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
}

interface FieldGroupProps
  extends GroupProps,
    VariantProps<typeof fieldVariants> {
  ref?: React.RefObject<HTMLDivElement>;
}

function FieldGroup({
  className,
  ref,
  variant,
  size,
  radius,
  ...props
}: FieldGroupProps) {
  return (
    <Group
      {...props}
      ref={ref}
      className={cn(fieldVariants({ variant, size, radius }), className)}
    />
  );
}

type InputProps = InputPrimitiveProps &
  VariantProps<typeof fieldVariants> & {
    error?: FieldProps["error"];
    label?: string | React.ReactNode;
    description?: string;
    startContent?: string | React.ReactNode;
    endContent?: string | React.ReactNode;
    labelExtra?: string | React.ReactNode;
    isDisabled?: boolean;
    isLoading?: boolean;
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
  };

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
  radius,
  isDisabled = false,
  isLoading = false,
  ...props
}: InputProps) {
  const [visible, setVisible] = React.useState(false);

  const variantClass = error ? "destructive" : variant || "default";
  const inputType =
    props.type === "password" ? (visible ? "text" : "password") : props.type;

  if (props.type === "number")
    return (
      <NumberField
        {...(props as NumberFieldProps)}
        label={label}
        description={description}
        error={error}
        placeholder={props.placeholder}
      />
    );

  return (
    <div className={cn("grid gap-2", classNames?.container)}>
      {label || labelExtra ? (
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
      ) : null}
      <FieldGroup
        className={cn(
          fieldVariants({ variant: variantClass, size, radius }),
          props.className || classNames?.wrapper
        )}
      >
        {startContent && typeof startContent === "string" ? (
          <span
            className={cn(
              classNames?.startContent,
              "me-2 text-muted-foreground"
            )}
          >
            {startContent}
          </span>
        ) : startContent ? (
          <div
            className={cn(
              "content me-2 flex items-center",
              classNames?.startContent
            )}
          >
            {startContent}
          </div>
        ) : null}

        <InputPrimitive
          {...props}
          type={inputType}
          disabled={isDisabled || isLoading}
          aria-invalid={!!error}
          aria-describedby={error ? `${props.id}-error` : undefined}
          className={cn(
            "ring-0 flex-1 min-w-0 border-none bg-transparent p-0 shadow-none outline-hidden focus:outline-hidden focus:ring-0 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-70",
            classNames?.input
          )}
        />

        {props.type === "password" && (
          <div
            className="content ms-2 flex cursor-pointer items-center"
            onClick={() => setVisible(!visible)}
          >
            {visible ? <EyeOff /> : <Eye />}
          </div>
        )}

        {isLoading ? (
          <Loader />
        ) : endContent ? (
          typeof endContent === "string" ? (
            <span
              className={cn(
                classNames?.endContent,
                "ms-2 text-muted-foreground"
              )}
            >
              {endContent}
            </span>
          ) : (
            <div
              className={cn(
                "content ms-2 flex items-center",
                classNames?.endContent
              )}
            >
              {endContent}
            </div>
          )
        ) : null}
      </FieldGroup>

      {!error && description ? (
        <Description className={cn("m-0 -mt-1", classNames?.description)}>
          {description}
        </Description>
      ) : null}
      {error ? (
        <FieldError
          asDefault
          id={`${props.id}-error`}
          message={error}
          className={cn("-mt-2", classNames?.error)}
        />
      ) : null}
    </div>
  );
}

export type {
  FieldProps,
  FieldGroupProps,
  InputProps,
  DescriptionProps,
  FieldErrorProps,
};
export { Description, Label, FieldError, FieldGroup, Input, fieldVariants };
