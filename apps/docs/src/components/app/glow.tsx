"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const glowVariants = cva("absolute w-full", {
  variants: {
    variant: {
      top: "top-0",
      above: "-top-[128px]",
      bottom: "bottom-0",
      below: "-bottom-[128px]",
      center: "top-[50%]",
    },
  },
  defaultVariants: {
    variant: "top",
  },
});

type GlowProps = React.ComponentProps<"div"> &
  VariantProps<typeof glowVariants>;

export function Glow({
  className,
  variant,
  color = "var(--primary)",
  ...props
}: GlowProps) {
  return (
    <div
      data-slot="glow"
      className={cn(glowVariants({ variant }), className)}
      style={
        {
          "--glow-color": color,
        } as React.CSSProperties
      }
      {...props}
    >
      <div
        className={cn(
          "absolute left-1/2 h-[256px] w-[60%] -translate-x-1/2 scale-[2.5] rounded-[50%] bg-radial from-10% to-60% opacity-20 sm:h-[512px] dark:opacity-100",
          "from-[color-mix(in_oklch,var(--glow-color)_50%,transparent)]",
          "to-[color-mix(in_oklch,var(--glow-color)_0%,transparent)]",
          variant === "center" && "-translate-y-1/2",
        )}
      />

      <div
        className={cn(
          "absolute left-1/2 h-[128px] w-[40%] -translate-x-1/2 scale-200 rounded-[50%] bg-radial from-10% to-60% opacity-20 sm:h-[256px] dark:opacity-100",
          "from-[color-mix(in_oklch,var(--glow-color)_30%,transparent)]",
          "to-[color-mix(in_oklch,var(--glow-color)_0%,transparent)]",
          variant === "center" && "-translate-y-1/2",
        )}
      />
    </div>
  );
}
