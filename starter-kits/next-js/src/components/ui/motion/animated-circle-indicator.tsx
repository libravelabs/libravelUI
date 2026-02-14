"use client";

import React from "react";
import { type Easing, motion } from "motion/react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const circleVariants = cva("rounded-full inline-block flex-shrink-0", {
  variants: {
    size: {
      xs: "h-1.5 w-1.5",
      sm: "h-2 w-2",
      md: "h-4 w-4",
      lg: "h-6 w-6",
      xl: "h-8 w-8",
    },
    tone: {
      primary: "bg-primary",
      secondary: "bg-secondary",
      muted: "bg-muted",
      destructive: "bg-destructive",
      success: "bg-green-500",
      warning: "bg-yellow-500",
      info: "bg-blue-500",
      neutral: "bg-foreground",
      accent: "bg-accent",
      card: "bg-card",
    },
  },
  defaultVariants: {
    size: "md",
    tone: "neutral",
  },
});

const overlayVariants = cva("absolute rounded-full", {
  variants: {
    tone: {
      primary: "bg-primary/80",
      secondary: "bg-secondary/80",
      muted: "bg-muted/80",
      destructive: "bg-destructive/80",
      success: "bg-green-500/80",
      warning: "bg-yellow-500/80",
      info: "bg-blue-500/80",
      neutral: "bg-foreground/80",
      accent: "bg-accent/80",
      card: "bg-card/80",
    },
  },
});

type AnimationVariant =
  | "none"
  | "pulseTransparent"
  | "scale"
  | "shimmer"
  | "ripple"
  | "glow"
  | "breathe"
  | "vibrate"
  | "rotate"
  | "pulseSolid"
  | "bounce"
  | "swing"
  | "flash"
  | "fadeInOut";

interface AnimatedCircleIndicatorProps
  extends VariantProps<typeof circleVariants> {
  animation?: AnimationVariant;
  duration?: number;
  repeat?: number | "infinite";
  easing?: Easing | Easing[];
  as?: React.ElementType;
  className?: string;
  style?: React.CSSProperties;
  overlay?: boolean;
}

function AnimatedCircleIndicator({
  size = "sm",
  tone = "neutral",
  animation = "none",
  duration = 1.5,
  repeat = "infinite",
  easing = "easeInOut",
  as = "span",
  className,
  style,
  overlay = false,
}: AnimatedCircleIndicatorProps) {
  const Component = motion(as);

  const getAnimationConfig = () => {
    const baseConfig = {
      transition: {
        duration,
        repeat: repeat === "infinite" ? Infinity : repeat,
        ease: easing,
      },
    };

    switch (animation) {
      case "scale":
        return {
          initial: { scale: 1 },
          animate: { scale: [1, 1.2, 1] },
          ...baseConfig,
        };

      case "shimmer":
        return {
          initial: { opacity: 1 },
          animate: { opacity: [1, 0.3, 1] },
          transition: {
            ...baseConfig.transition,
            times: [0, 0.5, 1],
          },
        };

      case "ripple":
        return {
          initial: { scale: 0.8, opacity: 1 },
          animate: {
            scale: [0.8, 1.4, 0.8],
            opacity: [1, 0, 1],
          },
          ...baseConfig,
        };

      case "glow":
        return {
          initial: { boxShadow: "0 0 0px rgba(255,255,255,0)" },
          animate: {
            boxShadow: [
              "0 0 0px rgba(255,255,255,0)",
              "0 0 12px rgba(255,255,255,0.8)",
              "0 0 0px rgba(255,255,255,0)",
            ],
          },
          ...baseConfig,
        };

      case "breathe":
        return {
          initial: { scale: 1, opacity: 1 },
          animate: {
            scale: [1, 1.15, 1],
            opacity: [1, 0.7, 1],
          },
          ...baseConfig,
        };

      case "vibrate":
        return {
          initial: { x: 0 },
          animate: { x: [-1, 1, -1, 1, 0] },
          transition: {
            ...baseConfig.transition,
            duration: 0.3,
          },
        };

      case "rotate":
        return {
          initial: { rotate: 0 },
          animate: { rotate: 360 },
          transition: {
            duration: duration * 2,
            repeat: repeat === "infinite" ? Infinity : repeat,
            ease: "linear",
          },
        };

      case "pulseSolid":
        return {
          initial: { opacity: 1 },
          animate: { opacity: [1, 0.5, 1] },
          ...baseConfig,
        };

      case "bounce":
        return {
          initial: { y: 0 },
          animate: { y: [-4, 0, -4] },
          ...baseConfig,
        };

      case "swing":
        return {
          initial: { rotate: 0 },
          animate: { rotate: [-15, 15, -15] },
          ...baseConfig,
        };

      case "flash":
        return {
          initial: { opacity: 1 },
          animate: { opacity: [1, 0.2, 1, 0.2, 1] },
          transition: {
            ...baseConfig.transition,
            duration: 1,
          },
        };

      case "fadeInOut":
        return {
          initial: { opacity: 0 },
          animate: { opacity: [0, 1, 0] },
          ...baseConfig,
        };

      default:
        return {};
    }
  };

  const animationConfig = getAnimationConfig();
  const shouldRenderOverlay = animation === "pulseTransparent" || overlay;

  return (
    <Component
      className={cn("relative", circleVariants({ size, tone }), className)}
      style={style}
      {...(animation !== "none" ? animationConfig : {})}
    >
      {shouldRenderOverlay && animation === "pulseTransparent" && (
        <motion.span
          className={cn(
            "absolute inset-0 rounded-full",
            overlayVariants({ tone })
          )}
          initial={{ scale: 1, opacity: 1 }}
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.6, 0, 0.6],
          }}
          transition={{
            duration,
            repeat: repeat === "infinite" ? Infinity : repeat,
            ease: easing,
          }}
        />
      )}
    </Component>
  );
}

export { AnimatedCircleIndicator, type AnimatedCircleIndicatorProps };
