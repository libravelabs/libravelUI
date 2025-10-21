import { cn } from "@/lib/utils";
import { Check, ChevronRight } from "lucide-react";
import { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type StepProps = {
  title: string;
  description?: string;
  href?: string;
};

export type StepperProps = {
  steps: StepProps[];
  activeStep?: number;
  useLink?: boolean;
  title?: string;
};

export function Stepper({
  steps,
  activeStep = 0,
  useLink = false,
  title,
}: StepperProps) {
  const pathname = usePathname();

  const currentStep = useMemo(() => {
    if (!useLink) return activeStep;
    const index = steps.findIndex(
      (step) => step.href && pathname.startsWith(step.href!)
    );
    return index === -1 ? 0 : index;
  }, [pathname, useLink, steps, activeStep]);

  return (
    <div className="flex flex-col items-center space-y-6">
      {title && <h2 className="text-lg me-auto font-semibold">{title}</h2>}
      <div className="flex items-center justify-center gap-4">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          const isDisabled = index > currentStep;

          const circleClass = cn(
            "flex size-8 items-center justify-center rounded-full text-sm font-semibold",
            isCompleted
              ? "bg-primary text-primary-foreground"
              : isActive
              ? "border-2 border-primary text-primary"
              : "border-2 border-foreground text-foreground"
          );

          const circleContent = isCompleted ? (
            <Check className="size-4" />
          ) : (
            index + 1
          );

          const stepContent = (
            <>
              <div className={circleClass}>{circleContent}</div>
              <div className="flex flex-col text-left">
                <span
                  className={cn(
                    "text-sm font-medium",
                    isActive ? "text-primary" : "text-foreground"
                  )}
                >
                  {step.title}
                </span>
                {step.description && (
                  <span className="text-xs text-muted-foreground">
                    {step.description}
                  </span>
                )}
              </div>
            </>
          );

          return (
            <div key={index} className="flex items-center gap-4">
              {useLink && step.href && !isDisabled ? (
                <Link
                  href={step.href}
                  className="flex items-center gap-2 transition-all"
                >
                  {stepContent}
                </Link>
              ) : (
                <div
                  className={cn(
                    "flex items-center gap-2",
                    isDisabled && "cursor-not-allowed opacity-50 select-none"
                  )}
                >
                  {stepContent}
                </div>
              )}
              {index < steps.length - 1 && <ChevronRight />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
