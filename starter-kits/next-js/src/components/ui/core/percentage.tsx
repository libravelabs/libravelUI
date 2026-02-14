import { AlertCircle } from "lucide-react";
import { motion } from "motion/react";
import {
  Meter as PercentagePrimitive,
  type MeterProps as PercentagePrimitiveProps,
} from "react-aria-components";
import { Label } from "@/components/ui/core/field";
import { cn } from "@/lib/utils";

interface PercentageProps extends PercentagePrimitiveProps {
  label?: string;
}

function Percentage({ label, className, ...props }: PercentageProps) {
  return (
    <PercentagePrimitive
      {...props}
      className={cn("flex min-w-56 flex-col gap-1", className)}
      aria-label={label ?? "percentage"}
    >
      {({ percentage, valueText }) => {
        const barColorClass = getColorClass(percentage);
        return (
          <>
            <div className="flex w-full justify-between gap-2">
              {label && <Label>{label}</Label>}
              <span
                className={cn(
                  "text-sm tabular-nums",
                  percentage >= 80
                    ? "text-destructive"
                    : "text-muted-foreground"
                )}
              >
                {percentage >= 80 && (
                  <AlertCircle className="inline-block size-4 stroke-destructive text-destructive align-text-bottom" />
                )}
                {` ${valueText}`}
              </span>
            </div>
            <div className="-outline-offset-1 relative h-2 rounded-full bg-muted outline outline-transparent">
              <motion.div
                className={cn(
                  "absolute top-0 start-0 h-full",
                  percentage === 100 ? "rounded-full" : "rounded-l-full",
                  barColorClass
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
            </div>
          </>
        );
      }}
    </PercentagePrimitive>
  );
}

const getColorClass = (percentage: number) => {
  if (percentage < 30) return "bg-blue-600";
  if (percentage < 50) return "bg-green-600";
  if (percentage < 70) return "bg-yellow-400";
  if (percentage < 80) return "bg-orange-500";
  return "bg-red-600";
};

export type { PercentageProps };
export { Percentage };
