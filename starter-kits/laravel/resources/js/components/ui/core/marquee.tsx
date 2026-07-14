"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface MarqueeProps {
  children: React.ReactNode;
  direction?: "left" | "right" | "up" | "down";
  speed?: "slow" | "normal" | "fast" | number;
  stopOnHover?: boolean;
  repeat?: number;
  gap?: string | number;
  fade?: boolean;
  className?: string;
  style?: React.CSSProperties;
  vertical?: boolean;
  autoFill?: boolean;
  "aria-label"?: string;
}

const Marquee = React.forwardRef<HTMLDivElement, MarqueeProps>(
  (
    {
      children,
      direction = "left",
      speed = "normal",
      stopOnHover = true,
      repeat = 4,
      gap = "1rem",
      fade = true,
      className,
      style,
      vertical = false,
      autoFill = false,
      "aria-label": ariaLabel,
      ...props
    },
    ref
  ) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [isClient, setIsClient] = React.useState(false);
    const [containerWidth, setContainerWidth] = React.useState(0);
    const [contentWidth, setContentWidth] = React.useState(0);
    const [isHovered, setIsHovered] = React.useState(false);

    React.useEffect(() => {
      setIsClient(true);
    }, []);

    React.useEffect(() => {
      const container = containerRef.current;
      if (!container || !isClient) return;

      const resizeObserver = new ResizeObserver(() => {
        setContainerWidth(container.offsetWidth);
        const firstChild = container.firstElementChild as HTMLElement;
        if (firstChild) {
          setContentWidth(firstChild.scrollWidth);
        }
      });

      resizeObserver.observe(container);
      return () => resizeObserver.disconnect();
    }, [isClient, children]);

    const getSpeed = (): string => {
      if (typeof speed === "number") return `${speed}s`;
      const speeds = {
        slow: "60s",
        normal: "30s",
        fast: "15s",
      };
      return speeds[speed];
    };

    const getAnimationName = (): string =>
      vertical || direction === "up" || direction === "down"
        ? "marqueeY"
        : "marquee";

    const getAnimationDirection = (): string =>
      direction === "right" || direction === "down" ? "reverse" : "normal";

    const calculateRepeat = (): number => {
      if (!autoFill || !isClient) return repeat;
      if (containerWidth && contentWidth) {
        return Math.ceil(containerWidth / contentWidth) + 1;
      }
      return repeat;
    };

    const gapValue = typeof gap === "number" ? `${gap}px` : gap;

    const containerStyles: React.CSSProperties = {
      "--gap": gapValue,
      "--duration": getSpeed(),
      ...style,
    } as React.CSSProperties;

    const animationStyles: React.CSSProperties = {
      animationName: getAnimationName(),
      animationDuration: getSpeed(),
      animationTimingFunction: "linear",
      animationIterationCount: "infinite",
      animationDirection: getAnimationDirection(),
      animationPlayState: isHovered && stopOnHover ? "paused" : "running",
    };

    const fadeStyles = fade
      ? vertical
        ? {
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1) 10%, rgba(0,0,0,1) 90%, rgba(0,0,0,0))",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1) 10%, rgba(0,0,0,1) 90%, rgba(0,0,0,0))",
          }
        : {
            maskImage:
              "linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,1) 10%, rgba(0,0,0,1) 90%, rgba(0,0,0,0))",
            WebkitMaskImage:
              "linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,1) 10%, rgba(0,0,0,1) 90%, rgba(0,0,0,0))",
          }
      : {};

    const content = Array.from({ length: calculateRepeat() }, (_, i) => (
      <div
        key={i}
        className={cn(
          "flex shrink-0",
          vertical ? "flex-col" : "flex-row",
          "[gap:var(--gap)]"
        )}
        style={animationStyles}
        aria-hidden={i > 0 ? "true" : undefined}
      >
        {children}
      </div>
    ));

    return (
      <div
        ref={ref}
        role="marquee"
        aria-label={ariaLabel || "Scrolling content"}
        aria-live="off"
        className={cn(
          "group flex overflow-hidden",
          vertical ? "flex-col" : "flex-row",
          className
        )}
        style={{
          ...containerStyles,
          ...fadeStyles,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        <div
          ref={containerRef}
          className={cn(
            "flex",
            vertical ? "flex-col" : "flex-row",
            "[gap:var(--gap)]"
          )}
        >
          {content}
        </div>
      </div>
    );
  }
);

Marquee.displayName = "Marquee";

const MarqueeItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex shrink-0 items-center justify-center", className)}
    {...props}
  />
));

MarqueeItem.displayName = "MarqueeItem";

const MarqueeContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-4", className)}
    {...props}
  />
));

MarqueeContent.displayName = "MarqueeContent";

export { Marquee, MarqueeItem, MarqueeContent };
