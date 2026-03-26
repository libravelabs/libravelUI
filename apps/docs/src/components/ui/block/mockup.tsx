"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const mockupVariants = cva(
  "group relative flex flex-col rounded-xl border border-border bg-muted shadow-sm transition-all duration-300 w-full",
  {
    variants: {
      type: {
        mobile: "rounded-[48px] max-w-[350px]",
        responsive: "rounded-xl",
      },
    },
    defaultVariants: {
      type: "responsive",
    },
  },
);

export interface MockupProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof mockupVariants> {
  showHeader?: boolean;
  title?: string;
  headerAction?: React.ReactNode;
}

function Mockup({
  className,
  type,
  children,
  showHeader = false,
  headerAction,
  title,
  ...props
}: MockupProps) {
  return (
    <div
      data-slot="mockup"
      className={cn(mockupVariants({ type, className }))}
      {...props}
    >
      {showHeader && (
        <div className="relative flex h-12 w-full flex-none items-center justify-between gap-4 border-b border-border bg-muted/30 p-2">
          <div className="flex gap-1.5">
            <div className="size-3 rounded-full bg-red-400/80 dark:bg-red-500/80" />
            <div className="size-3 rounded-full bg-amber-400/80 dark:bg-amber-500/80" />
            <div className="size-3 rounded-full bg-green-400/80 dark:bg-green-500/80" />
          </div>

          <div className="bg-input absolute left-1/2 inline-flex h-6 w-full max-w-52 -translate-x-1/2 items-center justify-center rounded-md text-sm truncate p-1 lg:max-w-96">
            {title}
          </div>

          {headerAction && headerAction}
        </div>
      )}

      <div className="relative flex min-h-0 flex-1 w-full justify-center bg-muted/10 overflow-hidden rounded-b-xl">
        {children}
      </div>
    </div>
  );
}

const frameVariants = cva(
  "bg-muted-foreground/20 flex relative z-10 overflow-hidden rounded-2xl",
  {
    variants: {
      size: {
        small: "p-2",
        large: "p-4",
      },
    },
    defaultVariants: {
      size: "small",
    },
  },
);

export interface MockupFrameProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof frameVariants> {}

function MockupFrame({ className, size, ...props }: MockupFrameProps) {
  return (
    <div
      data-slot="mockup-frame"
      className={cn(frameVariants({ size, className }))}
      {...props}
    />
  );
}

export { Mockup, MockupFrame };
