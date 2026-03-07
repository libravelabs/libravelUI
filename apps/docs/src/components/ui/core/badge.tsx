"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Slot } from "@/lib/slot";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border font-medium w-fit whitespace-nowrap shrink-0 gap-2 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      tone: {
        default:
          "border bg-background/80 text-foreground [a&]:hover:opacity-70",
        primary:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:opacity-70",
        success:
          "border-transparent bg-emerald-500 text-emerald-50 [a&]:hover:opacity-70",
        warning:
          "border-transparent bg-amber-600 text-amber-50 [a&]:hover:opacity-70",
        info: "border-transparent bg-blue-600 text-blue-50 [a&]:hover:opacity-70",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:opacity-70",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:opacity focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:opacity-70",
      },

      size: {
        xs: "text-[10px] px-1.5 py-0.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "text-xs px-2 py-0.5 [&_svg:not([class*='size-'])]:size-3.5",
        md: "text-sm px-2.5 py-1 [&_svg:not([class*='size-'])]:size-4",
        lg: "text-sm px-3 py-1.5 [&_svg:not([class*='size-'])]:size-[18px]",
        xl: "text-base px-3.5 py-2 [&_svg:not([class*='size-'])]:size-5",
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
      tone: "default",
      size: "sm",
      radius: "full",
    },
  },
);

interface BadgeProps
  extends React.ComponentProps<"span">, VariantProps<typeof badgeVariants> {
  asChild?: boolean;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, tone, size, radius, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "span";

    return (
      <Comp
        ref={ref}
        data-slot="badge"
        className={cn(badgeVariants({ tone, size, radius }), className)}
        {...props}
      />
    );
  },
);
Badge.displayName = "Badge";

export { Badge, badgeVariants, type BadgeProps };
