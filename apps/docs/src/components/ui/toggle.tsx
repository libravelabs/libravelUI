import type { ToggleButtonProps } from "react-aria-components";
import { composeRenderProps, ToggleButton } from "react-aria-components";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import * as React from "react";

const toggleStyles = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        outline:
          "border bg-background hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        sm: "px-2.5 py-1 text-xs [&_svg:not([class*='size-'])]:size-4",
        md: "px-3 py-1.5 text-sm [&_svg:not([class*='size-'])]:size-4.5",
        lg: "px-4 py-2 text-base [&_svg:not([class*='size-'])]:size-5",
        xl: "px-5 py-2.5 text-lg [&_svg:not([class*='size-'])]:size-5.5",
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
      isDisabled: {
        true: "opacity-40 cursor-not-allowed pointer-events-none forced-colors:text-[GrayText]",
      },
      isSelected: {
        true: "bg-accent/50",
      },
      isIconOnly: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        isIconOnly: true,
        size: "sm",
        class: "size-8 p-0 [&_svg:not([class*='size-'])]:size-4",
      },
      {
        isIconOnly: true,
        size: "md",
        class: "size-10 p-0 [&_svg:not([class*='size-'])]:size-4.5",
      },
      {
        isIconOnly: true,
        size: "lg",
        class: "size-12 p-0 [&_svg:not([class*='size-'])]:size-5",
      },
      {
        isIconOnly: true,
        size: "xl",
        class: "size-14 p-0 [&_svg:not([class*='size-'])]:size-5.5",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "md",
      radius: "md",
    },
  }
);

interface ToggleProps
  extends ToggleButtonProps,
    VariantProps<typeof toggleStyles> {
  ref?: React.Ref<HTMLButtonElement>;
  isIconOnly?: boolean;
}

function Toggle({
  className,
  size,
  variant,
  radius,
  ref,
  isIconOnly,
  ...props
}: ToggleProps) {
  return (
    <ToggleButton
      ref={ref}
      className={composeRenderProps(className, (className, renderProps) =>
        cn(
          toggleStyles({
            ...renderProps,
            size,
            variant,
            radius,
            isIconOnly,
            className,
          })
        )
      )}
      {...props}
    />
  );
}

export type { ToggleProps };
export { Toggle };
