"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import {
  Button as ButtonPrimitive,
  type ButtonProps as ButtonPrimitiveProps,
} from "react-aria-components";
import { cn } from "@/lib/utils";
import { Loader } from "@/components/ui/core/loader";

export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none cursor-pointer",
    "focus:outline-0 focus-visible:outline focus-visible:outline-offset-2 focus-visible:ring-2 focus-visible:ring-offset-3 focus-visible:ring-offset-background",

    "pending:opacity-50 pending:pointer-events-none",
  ],
  {
    variants: {
      tone: {
        default: "bg-primary text-primary-foreground hover:opacity-70",
        destructive: "bg-destructive text-white hover:opacity-70",
        outline: "border border-border bg-transparent hover:opacity-70",
        secondary: "bg-secondary text-secondary-foreground hover:opacity-70",
        ghost: "hover:bg-foreground/10",
        link: "text-primary underline-offset-4 hover:underline",
        unstyled: "",
      },
      size: {
        xs: "h-6 text-xs px-2",
        sm: "h-8 text-sm px-3",
        default: "h-9 text-sm px-4",
        lg: "h-10 text-base px-5",
        xl: "h-12 text-lg px-6",
        "2xl": "h-14 text-xl px-7",
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        "2xl": "rounded-2xl",
        full: "rounded-full",
      },
      iconOnly: {
        true: "p-0 [&_svg:not([class*='size-'])]:size-[1em] aspect-square",
        false: "",
      },
    },
    defaultVariants: {
      tone: "default",
      size: "default",
      radius: "md",
      iconOnly: false,
    },
  },
);

const buttonGroupVariants = cva(
  [
    "flex w-fit items-stretch",
    "has-[>[data-slot=button-group]]:gap-2",
    "[&>*]:focus-visible:relative",
    "[&>*]:focus-visible:z-10",
    "has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-md",
    "[&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit",
    "[&>input]:flex-1",
  ],
  {
    variants: {
      orientation: {
        horizontal: [
          "[&>*:not(:first-child)]:rounded-s-none",
          "[&>*:not(:first-child)]:border-l-0",
          "[&>*:not(:last-child)]:rounded-e-none",
        ],
        vertical: [
          "flex-col",
          "[&>*:not(:first-child)]:rounded-t-none",
          "[&>*:not(:first-child)]:border-t-0",
          "[&>*:not(:last-child)]:rounded-b-none",
        ],
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  },
);

type ButtonGroupProps = React.ComponentProps<"div"> &
  VariantProps<typeof buttonGroupVariants>;

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, orientation, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="group"
        data-slot="button-group"
        data-orientation={orientation}
        className={buttonGroupVariants({ orientation, className })}
        {...props}
      />
    );
  },
);
ButtonGroup.displayName = "ButtonGroup";

/**
 * Props for the Button component.
 */
type ButtonProps = ButtonPrimitiveProps &
  VariantProps<typeof buttonVariants> & {
    /** The content to display when isPending or isLoading is true. Defaults to a standard spinner. */
    loader?: React.ReactNode;
    /** Whether the button is in a loading state. */
    isLoading?: boolean;
    /** The content of the button. */
    children?: React.ReactNode;
  };

/**
 * A versatile button component that supports various tones, sizes, and states.
 * Wraps React Aria Components Button with custom styling.
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      tone,
      size,
      radius,
      iconOnly,
      loader,
      isLoading,
      children,
      ...props
    },
    ref,
  ) => {
    if (tone === "unstyled") {
      return (
        <ButtonPrimitive ref={ref} {...props}>
          {(values) =>
            typeof children === "function" ? children(values) : children
          }
        </ButtonPrimitive>
      );
    }

    return (
      <ButtonPrimitive
        ref={ref}
        {...props}
        isDisabled={props.isDisabled || isLoading}
        className={cn(
          buttonVariants({ tone, size, radius, iconOnly }),
          className,
        )}
      >
        {(values) =>
          values.isPending || isLoading ? (
            iconOnly ? (
              (loader ?? <Loader className="text-inherit" />)
            ) : (
              <>
                {loader ?? <Loader className="text-inherit" />}
                {children}
              </>
            )
          ) : typeof children === "function" ? (
            children(values)
          ) : (
            children
          )
        }
      </ButtonPrimitive>
    );
  },
);
Button.displayName = "Button";

export { Button, ButtonGroup };
export type { ButtonProps, ButtonGroupProps };
