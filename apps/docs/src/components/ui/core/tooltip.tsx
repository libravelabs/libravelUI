"use client";

import type { TooltipProps as TooltipPrimitiveProps } from "react-aria-components";
import {
  composeRenderProps,
  OverlayArrow,
  Tooltip as TooltipPrimitive,
  TooltipTrigger as TooltipTriggerPrimitive,
} from "react-aria-components";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/core/button";

const tooltipVariants = cva(
  "group origin-[--trigger-anchor-point] rounded-xl border px-2.5 py-1.5 text-sm/6 will-change-transform dark:shadow-none *:[strong]:font-medium",
  {
    variants: {
      variant: {
        default: "bg-popover text-popover-foreground",
        inverse:
          "border-transparent bg-foreground text-background [.text-muted-foreground]:text-secondary *:[.text-muted-foreground]:text-secondary",
        destructive: "bg-destructive text-white hover:opacity-70",
        success:
          "border-transparent bg-emerald-500 text-emerald-50 [a&]:hover:bg-emerald-500/90",
        warning:
          "border-transparent bg-amber-600 text-amber-50 [a&]:hover:bg-amber-600/90",
        info: "border-transparent bg-blue-600 text-blue-50 [a&]:hover:bg-blue-600/90",
      },
      isEntering: {
        true: "fade-in animate-in placement-left:slide-in-from-right-1 placement-right:slide-in-from-left-1 placement-top:slide-in-from-bottom-1 placement-bottom:slide-in-from-top-1",
      },
      isExiting: {
        true: "fade-in direction-reverse animate-in placement-left:slide-out-to-right-1 placement-right:slide-out-to-left-1 placement-top:slide-out-to-bottom-1 placement-bottom:slide-out-to-top-1",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

type TooltipContentProps = Omit<TooltipPrimitiveProps, "children"> &
  VariantProps<typeof tooltipVariants> & {
    showArrow?: boolean;
    children?: React.ReactNode;
  };

type TooltipProps = React.ComponentProps<typeof TooltipTriggerPrimitive>;

function Tooltip(props: TooltipProps) {
  return <TooltipTriggerPrimitive {...props} />;
}

function TooltipTrigger({
  variant = "ghost",
  ...props
}: React.ComponentProps<typeof Button>) {
  return <Button variant={variant} {...props} />;
}

function TooltipContent({
  offset = 10,
  showArrow = true,
  variant,
  children,
  className,
  ...props
}: TooltipContentProps) {
  return (
    <TooltipPrimitive
      {...props}
      offset={offset}
      className={composeRenderProps(className, (cls, renderProps) =>
        cn(tooltipVariants({ ...renderProps, variant }), cls)
      )}
    >
      {showArrow && (
        <OverlayArrow className="group">
          <svg
            width={12}
            height={12}
            viewBox="0 0 12 12"
            className={cn(
              "group-placement-left:-rotate-90 block group-placement-bottom:rotate-180 group-placement-right:rotate-90 forced-colors:fill-[Canvas] forced-colors:stroke-[ButtonBorder]",
              (!variant || variant === "default") &&
                "fill-popover stroke-border",
              variant === "inverse" && "fill-foreground stroke-transparent",
              variant === "destructive" &&
                "fill-destructive stroke-destructive",
              variant === "success" && "fill-emerald-500 stroke-emerald-500",
              variant === "warning" && "fill-amber-600 stroke-amber-600",
              variant === "info" && "fill-blue-500 stroke-blue-500"
            )}
          >
            <path d="M0 0 L6 6 L12 0" />
          </svg>
        </OverlayArrow>
      )}
      {children}
    </TooltipPrimitive>
  );
}

export type { TooltipContentProps, TooltipProps };
export { Tooltip, TooltipTrigger, TooltipContent };
