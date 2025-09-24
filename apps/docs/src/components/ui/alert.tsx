"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { X, type LucideProps } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence, MotionProps } from "motion/react";

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='translate-'])]:translate-y-0.5 [&_svg:not([class*='text-'])]:text-current",
  {
    variants: {
      variant: {
        default: "border-border bg-background text-foreground",
        destructive:
          "border-destructive bg-destructive/10 text-destructive [&_svg:not([class*='size-'])]:text-destructive",
        warning:
          "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-700 dark:bg-amber-950/30 dark:text-amber-200 [&>svg]:text-amber-600 dark:[&>svg]:text-amber-400",
        success:
          "border-green-200 bg-green-50 text-green-800 dark:border-green-700 dark:bg-green-950/30 dark:text-green-200 [&>svg]:text-green-600 dark:[&>svg]:text-green-400",
        info: "border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-700 dark:bg-blue-950/30 dark:text-blue-200 [&>svg]:text-blue-600 dark:[&>svg]:text-blue-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function AlertRoot({
  className,
  variant,
  ...props
}: MotionProps &
  VariantProps<typeof alertVariants> & {
    className?: string | string[];
  }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className
      )}
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className
      )}
      {...props}
    />
  );
}

interface AlertProps extends VariantProps<typeof alertVariants> {
  title?: string;
  message?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode | LucideProps;
  className?: string;
  canClosed?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function Alert({
  variant,
  title,
  message,
  children,
  icon,
  className,
  canClosed = false,
  open: controlledOpen,
  onOpenChange: controlledSetOpen,
}: AlertProps) {
  const [internalOpen, setInternalOpen] = React.useState(true);

  const isControlled =
    controlledOpen !== undefined && controlledSetOpen !== undefined;

  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled ? controlledSetOpen : setInternalOpen;

  return (
    <AnimatePresence>
      {open && (
        <AlertRoot
          variant={variant}
          className={cn("flex w-full items-start gap-2", className)}
        >
          {icon && <>{icon}</>}

          <div className="flex-1">
            {title && <AlertTitle>{title}</AlertTitle>}
            {children
              ? children
              : message && <AlertDescription>{message}</AlertDescription>}
          </div>

          {canClosed && (
            <Button
              onClick={() => setOpen(false)}
              size="icon"
              variant="ghost"
              className="size-5 m-auto"
              aria-label="Close alert"
            >
              <X className="size-4" />
            </Button>
          )}
        </AlertRoot>
      )}
    </AnimatePresence>
  );
}

export { AlertRoot, Alert, AlertTitle, AlertDescription };
