import type { ToggleButtonProps } from "react-aria-components";
import { composeRenderProps, ToggleButton } from "react-aria-components";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import * as React from "react";

const toggleStyles = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] cursor-pointer",
  {
    variants: {
      tone: {
        default: "hover:bg-accent hover:text-accent-foreground",
        outline:
          "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        link: "text-primary underline-offset-4 hover:underline",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
      },
      size: {
        xs: "h-6 gap-0.5 px-2",
        sm: "h-8 gap-1.5 px-3",
        default: "h-9 px-4",
        lg: "h-10 px-6",
        xl: "h-12 px-7",
        "2xl": "h-14 px-8",
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
      iconOnly: {
        true: "p-0 [&_svg:not([class*='size-'])]:size-[1em] aspect-square",
        false: "",
      },
      isSelected: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        tone: "default",
        isSelected: true,
        class: "bg-accent text-accent-foreground",
      },
      {
        tone: "outline",
        isSelected: true,
        class: "bg-accent text-accent-foreground",
      },
      { tone: "secondary", isSelected: true, class: "bg-secondary/80" },
      { tone: "destructive", isSelected: true, class: "bg-destructive/90" },
    ],
    defaultVariants: {
      tone: "default",
      size: "default",
      radius: "md",
      iconOnly: false,
    },
  }
);

type ToggleProps = ToggleButtonProps &
  VariantProps<typeof toggleStyles> & {
    ref?: React.Ref<HTMLButtonElement>;
  };

function Toggle({
  className,
  size,
  tone,
  radius,
  iconOnly,
  ref,
  ...props
}: ToggleProps) {
  return (
    <ToggleButton
      {...props}
      ref={ref}
      className={composeRenderProps(className, (className, renderProps) =>
        cn(
          toggleStyles({
            ...renderProps,
            size,
            tone,
            radius,
            iconOnly,
            className,
          })
        )
      )}
    />
  );
}

export { Toggle };
export type { ToggleProps };
