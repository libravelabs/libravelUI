import type {
  CheckboxGroupProps as CheckboxGroupPrimitiveProps,
  CheckboxProps as CheckboxPrimitiveProps,
} from "react-aria-components";
import {
  CheckboxGroup as CheckboxGroupPrimitive,
  Checkbox as CheckboxPrimitive,
  composeRenderProps,
} from "react-aria-components";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import {
  Description,
  FieldError,
  type InputProps,
} from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Check, Minus } from "lucide-react";

interface CheckboxGroupProps
  extends CheckboxGroupPrimitiveProps,
    Omit<InputProps, "placeholder"> {
  description?: string;
}

function CheckboxGroup({
  className,
  children,
  description,
  label,
  error,
  ...props
}: CheckboxGroupProps) {
  return (
    <CheckboxGroupPrimitive
      aria-label="checkbox-group"
      {...props}
      className={cn(
        "flex flex-col gap-3 has-[[slot=description]]:gap-6 has-[[slot=description]]:**:data-[slot=label]:font-medium **:[[slot=description]]:block",
        className
      )}
    >
      {(values) => (
        <>
          <div>
            {label && <Label>{label}</Label>}
            {description && <Description>{description}</Description>}
          </div>
          {typeof children === "function" ? children(values) : children}
          <FieldError message={error} />
        </>
      )}
    </CheckboxGroupPrimitive>
  );
}

const checkboxVariants = cva("group block w-fit disabled:opacity-50");

const checkboxWrapper = cva("grid group items-center disabled:opacity-50", {
  variants: {
    withDescription: {
      true: "grid-cols-[1.125rem_1fr] sm:grid-cols-[1rem_1fr] gap-x-3 gap-y-1 *:data-[slot=indicator]:mt-0.75 sm:*:data-[slot=indicator]:mt-1 items-center",
      false: "grid-cols-[auto_1fr] gap-x-2",
    },
  },
  defaultVariants: {
    withDescription: false,
  },
});

const checkboxIndicator = cva(
  [
    "relative isolate flex shrink-0 items-center justify-center rounded-sm transition",
    "bg-background text-muted-foreground inset-ring inset-ring-muted",
    "focus-within:inset-ring-ring/70 focus-within:ring-3 focus-within:ring-ring/20",
    "focus-within:hover:inset-ring-ring/70 has-invalid:hover:inset-ring-destructive/70",
    "invalid:inset-ring-destructive/70 focus-within:invalid:inset-ring-destructive/70 focus-within:invalid:ring-destructive/20",
    "group-invalid:inset-ring-destructive/70 group-invalid:focus-within:inset-ring-destructive/70 group-invalid:focus-within:ring-destructive/20",
    "cursor-pointer disabled:cursor-not-allowed",
  ],
  {
    variants: {
      size: {
        sm: "size-4 *:data-[slot=check-indicator]:size-3",
        md: "size-4.5 *:data-[slot=check-indicator]:size-4",
      },
      state: {
        default: "",
        selected:
          "bg-primary text-primary-foreground dark:inset-ring-primary group-invalid:inset-ring-destructive/70 group-invalid:bg-destructive group-invalid:text-destructive-foreground dark:group-invalid:inset-ring-destructive/70 *:data-[slot=check-indicator]:text-primary-foreground",
        focus:
          "inset-ring-primary ring-3 ring-ring/20 group-invalid:inset-ring-destructive/70 group-invalid:text-destructive-foreground group-invalid:ring-destructive/20",
        invalid:
          "inset-ring-destructive/70 bg-destructive/20 text-destructive-foreground ring-destructive/20",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed",
      },
    },
    defaultVariants: {
      size: "md",
      state: "default",
      disabled: false,
    },
  }
);

interface CheckboxProps
  extends CheckboxPrimitiveProps,
    VariantProps<typeof checkboxWrapper>,
    VariantProps<typeof checkboxIndicator> {
  label?: string;
  description?: string;
  error?: InputProps["error"];
}

function Checkbox({
  className,
  children,
  description,
  label,
  size,
  error,
  ...props
}: CheckboxProps) {
  return (
    <>
      <CheckboxPrimitive
        {...props}
        className={cn(checkboxVariants(), className)}
      >
        {composeRenderProps(
          children,
          (
            children,
            {
              isSelected,
              isIndeterminate,
              isFocusVisible,
              isInvalid,
              isDisabled,
            }
          ) => {
            const isStringChild = typeof children === "string";
            const hasCustomChildren = typeof children !== "undefined";

            const indicator = isIndeterminate ? (
              <Minus data-slot="check-indicator" />
            ) : isSelected ? (
              <Check data-slot="check-indicator" />
            ) : null;

            const state = error
              ? "invalid"
              : isInvalid
              ? "invalid"
              : isFocusVisible
              ? "focus"
              : isSelected || isIndeterminate
              ? "selected"
              : "default";

            const content = hasCustomChildren ? (
              isStringChild ? (
                <Label>{children}</Label>
              ) : (
                <>{children}</>
              )
            ) : (
              <>
                {label && <Label>{label}</Label>}
                {description && <Description>{description}</Description>}
              </>
            );

            return (
              <div
                className={cn(
                  checkboxWrapper({ withDescription: !!description }),
                  className
                )}
              >
                <span
                  data-slot="indicator"
                  className={cn(
                    checkboxIndicator({
                      size,
                      state,
                      disabled: isDisabled,
                    })
                  )}
                >
                  {indicator}
                </span>
                <div>{content}</div>
              </div>
            );
          }
        )}
      </CheckboxPrimitive>
      <FieldError message={error} />
    </>
  );
}

export type { CheckboxGroupProps, CheckboxProps };
export { CheckboxGroup, Checkbox };
