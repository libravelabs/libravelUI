"use client";

import { motion } from "motion/react";
import {
  ProgressBar as ProgressBarPrimitive,
  type ProgressBarProps as ProgressBarPrimitiveProps,
} from "react-aria-components";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/core/field";

interface ProgressBarProps extends ProgressBarPrimitiveProps {
  label?: string;
  ref?: React.RefObject<HTMLDivElement>;
  hideValue?: boolean;
}

function ProgressBar({
  label,
  ref,
  className,
  hideValue = false,
  ...props
}: ProgressBarProps) {
  return (
    <ProgressBarPrimitive
      ref={ref}
      className={cn("flex flex-col", className)}
      aria-label={label ?? "progress-bar"}
      {...props}
    >
      {({ percentage, valueText, isIndeterminate }) => (
        <>
          <div className="flex justify-between gap-2">
            {label && <Label>{label}</Label>}
            {!hideValue && (
              <span className="text-muted-foreground text-sm tabular-nums">
                {valueText}
              </span>
            )}
          </div>
          <div
            className={cn(
              "-outline-offset-1 relative mt-1 h-2 w-full overflow-hidden rounded-full bg-secondary outline-1 outline-transparent"
            )}
          >
            {!isIndeterminate ? (
              <motion.div
                className={cn(
                  "absolute top-0 start-0 h-full bg-primary",
                  percentage === 100 ? "rounded-full" : "rounded-l-full"
                )}
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{
                  type: "spring",
                  damping: 10,
                  mass: 0.75,
                  stiffness: 100,
                }}
              />
            ) : (
              <motion.div
                data-slot="progress-content"
                className={cn(
                  "absolute top-0 h-full rounded-full bg-primary forced-colors:bg-[Highlight]"
                )}
                initial={{ left: "0%", width: "40%" }}
                animate={{ left: ["0%", "100%", "0%"] }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 2,
                  ease: "easeInOut",
                }}
              />
            )}
          </div>
        </>
      )}
    </ProgressBarPrimitive>
  );
}

interface ProgressSpinnerProps extends Omit<ProgressBarProps, "className"> {
  className?: string;
  ref?: React.RefObject<HTMLDivElement>;
  hideValue?: boolean;
}

function ProgressSpinner({
  className,
  ref,
  label,
  hideValue = false,
  ...props
}: ProgressSpinnerProps) {
  const center = "50%";
  const radius = "calc(50% - 2px)";

  return (
    <ProgressBarPrimitive {...props} ref={ref}>
      {({ percentage, isIndeterminate, valueText }) => (
        <div
          className={cn(
            "inline-flex flex-col items-center gap-2 min-w-24 min-h-24",
            className
          )}
        >
          {label && <Label>{label}</Label>}

          <div className="relative inline-flex items-center justify-center aspect-square w-full h-full">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="block"
              data-slot="icon"
            >
              <circle
                cx={center}
                cy={center}
                r={radius}
                strokeWidth={3}
                className="stroke-muted"
              />

              {!isIndeterminate ? (
                <circle
                  cx={center}
                  cy={center}
                  r={radius}
                  strokeWidth={3}
                  pathLength={100}
                  strokeDasharray="100 200"
                  strokeDashoffset={100 - (percentage ?? 0)}
                  strokeLinecap="round"
                  transform="rotate(-90)"
                  className="origin-center stroke-primary"
                />
              ) : (
                <circle
                  cx={center}
                  cy={center}
                  r={radius}
                  strokeWidth={3}
                  pathLength={100}
                  strokeDasharray="100 200"
                  strokeDashoffset={70}
                  strokeLinecap="round"
                  className="origin-center stroke-primary animate-[spin_1s_cubic-bezier(0.4,0,0.2,1)_infinite]"
                />
              )}
            </svg>

            {!hideValue && (
              <span className="absolute text-sm font-medium text-muted-foreground tabular-nums select-none">
                {valueText}
              </span>
            )}
          </div>
        </div>
      )}
    </ProgressBarPrimitive>
  );
}

export type { ProgressBarProps, ProgressSpinnerProps };
export { ProgressBar, ProgressSpinner };
