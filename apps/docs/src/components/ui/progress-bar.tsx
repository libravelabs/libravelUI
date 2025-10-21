"use client";

import { motion } from "motion/react";
import {
  ProgressBar as ProgressBarPrimitive,
  type ProgressBarProps as ProgressBarPrimitiveProps,
} from "react-aria-components";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/field";

interface ProgressBarProps extends ProgressBarPrimitiveProps {
  label?: string;
  ref?: React.RefObject<HTMLDivElement>;
}

function ProgressBar({ label, ref, className, ...props }: ProgressBarProps) {
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
            <span className="text-muted-foreground text-sm tabular-nums">
              {valueText}
            </span>
          </div>
          <div
            className={cn(
              "-outline-offset-1 relative mt-1 h-2 min-w-64 overflow-hidden rounded-full bg-secondary outline-1 outline-transparent"
            )}
          >
            {!isIndeterminate ? (
              <motion.div
                data-slot="progress-content"
                className={cn(
                  "absolute top-0 start-0 h-full rounded-full bg-primary forced-colors:bg-[Highlight]"
                )}
                initial={{ width: "0%" }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
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

export type { ProgressBarProps };
export { ProgressBar };
