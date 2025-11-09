"use client";

import type {
  RadioGroupProps as RadioGroupPrimitiveProps,
  RadioProps as RadioPrimitiveProps,
} from "react-aria-components";
import {
  composeRenderProps,
  RadioGroup as RadioGroupPrimitive,
  Radio as RadioPrimitive,
} from "react-aria-components";
import {
  Label,
  Description,
  type FieldProps,
} from "@/components/ui/core/field";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";

type RadioGroupProps = RadioGroupPrimitiveProps & {
  label?: FieldProps["label"];
  description?: FieldProps["description"];
  classNames?: {
    wrapper?: string | string[];
    input?: string | string[];
    description?: string | string[];
    errorState?: string | string[];
  };
};

function RadioGroup({
  className,
  classNames,
  label,
  description,
  children,
  ...props
}: RadioGroupProps) {
  return (
    <RadioGroupPrimitive
      {...props}
      data-slot="control"
      className={cn(
        "group space-y-3 **:data-[slot=label]:font-normal",
        "has-[slot=description]:space-y-6 has-[slot=description]:**:data-[slot=label]:font-medium",
        className
      )}
    >
      <>
        {(label || description) && (
          <div>
            {label && <Label>{label}</Label>}
            {description && (
              <Description className={cn(classNames?.description)}>
                {description}
              </Description>
            )}
          </div>
        )}
        {children}
      </>
    </RadioGroupPrimitive>
  );
}

type RadioProps = RadioPrimitiveProps & {
  label?: FieldProps["label"];
  description?: FieldProps["description"];
  classNames?: {
    wrapper?: string | string[];
    input?: string | string[];
    description?: string | string[];
    errorState?: string | string[];
  };
};

function Radio({
  className,
  classNames,
  label,
  description,
  children,
  ...props
}: RadioProps) {
  return (
    <RadioPrimitive
      {...props}
      className={cn("relative block disabled:opacity-50", className)}
    >
      {composeRenderProps(
        children,
        (children, { isSelected, isFocusVisible, isInvalid }) => {
          const isStringChild = typeof children === "string";
          const content = isStringChild ? <Label>{children}</Label> : children;

          return (
            <div
              className={cn(
                "grid grid-cols-[1.125rem_1fr] gap-x-3 gap-y-1 sm:grid-cols-[1rem_1fr]",
                "*:data-[slot=label]:col-start-2 *:data-[slot=label]:row-start-1",
                "*:[[slot=description]]:col-start-2 *:[[slot=description]]:row-start-2",
                "has-[[slot=description]]:**:data-[slot=label]:font-medium"
              )}
            >
              <span
                data-slot="indicator"
                className={cn(
                  "relative inset-ring inset-ring-input isolate flex size-4.5 shrink-0 items-center justify-center rounded-full text-background sm:size-4",
                  isSelected && "inset-ring-ring bg-background",
                  isFocusVisible && "inset-ring-ring ring-3 ring-ring/20",
                  isInvalid &&
                    "inset-ring-destructive/70 bg-destructive/5 text-destructive ring-destructive/20"
                )}
              >
                <AnimatePresence>
                  {isSelected && (
                    <motion.span
                      className={cn(
                        "absolute inset-0 m-auto rounded-full bg-primary",
                        isInvalid && "bg-destructive"
                      )}
                      style={{ width: 8, height: 8 }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 16,
                      }}
                    />
                  )}
                </AnimatePresence>
              </span>

              {content ? (
                content
              ) : (
                <div>
                  {label && <Label>{label}</Label>}
                  {description && (
                    <Description className={cn(classNames?.description)}>
                      {description}
                    </Description>
                  )}
                </div>
              )}
            </div>
          );
        }
      )}
    </RadioPrimitive>
  );
}

export { Radio, RadioGroup };
