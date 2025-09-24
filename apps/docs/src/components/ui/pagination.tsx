"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const paginationVariants = {
  container: cva("flex items-center justify-center", {
    variants: {
      spacing: {
        default: "gap-1",
        compact: "gap-0.5",
      },
    },
    defaultVariants: {
      spacing: "default",
    },
  }),
  item: cva(
    "inline-flex items-center justify-center whitespace-nowrap text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
    {
      variants: {
        variant: {
          default:
            "h-9 w-9 rounded-lg text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring",
          outline:
            "h-9 w-9 rounded-lg border border-border text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring",
          ghost:
            "h-9 w-9 rounded-lg text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring",
        },
        size: {
          sm: "h-8 w-8 text-xs",
          default: "h-9 w-9",
          lg: "h-10 w-10",
        },
        state: {
          default: "",
          active:
            "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring",
        },
      },
      defaultVariants: {
        variant: "default",
        size: "default",
        state: "default",
      },
    }
  ),
  nav: cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-lg px-3 text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring cursor-pointer",
    {
      variants: {
        variant: {
          default:
            "rounded-lg text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring",
          outline:
            "rounded-lg border border-border text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring",
          ghost:
            "rounded-lg text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring",
        },
        size: {
          sm: "h-8 text-xs px-2",
          default: "h-9",
          lg: "h-10 px-4",
        },
      },
      defaultVariants: {
        size: "default",
      },
    }
  ),
};

type PaginationContextProps = {
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "default" | "lg";
  spacing?: "default" | "compact";
};

const PaginationContext = React.createContext<PaginationContextProps | null>(
  null
);

interface PaginationProps
  extends React.HTMLAttributes<HTMLElement>,
    PaginationContextProps {}

const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  ({ className, spacing, variant, size, ...props }, ref) => {
    return (
      <PaginationContext.Provider value={{ variant, size, spacing }}>
        <nav
          ref={ref}
          role="navigation"
          aria-label="pagination"
          className={cn(paginationVariants.container({ spacing }), className)}
          {...props}
        />
      </PaginationContext.Provider>
    );
  }
);

interface PaginationItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  state?: "default" | "active";
}

const PaginationItem = React.forwardRef<HTMLButtonElement, PaginationItemProps>(
  ({ className, isActive, state, ...props }, ref) => {
    const ctx = React.useContext(PaginationContext);
    return (
      <button
        ref={ref}
        className={cn(
          paginationVariants.item({
            variant: ctx?.variant,
            size: ctx?.size,
            state: isActive ? "active" : state,
          }),
          className
        )}
        aria-current={isActive ? "page" : undefined}
        {...props}
      />
    );
  }
);

type PaginationNavProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const PaginationPrevious = React.forwardRef<
  HTMLButtonElement,
  PaginationNavProps
>(({ className, children, ...props }, ref) => {
  const ctx = React.useContext(PaginationContext);
  return (
    <button
      ref={ref}
      className={cn(
        paginationVariants.nav({ variant: ctx?.variant, size: ctx?.size }),
        className
      )}
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
      {children ?? "Previous"}
    </button>
  );
});

const PaginationNext = React.forwardRef<HTMLButtonElement, PaginationNavProps>(
  ({ className, children, ...props }, ref) => {
    const ctx = React.useContext(PaginationContext);

    return (
      <button
        ref={ref}
        className={cn(
          paginationVariants.nav({ variant: ctx?.variant, size: ctx?.size }),
          className
        )}
        {...props}
      >
        {children ?? "Next"}
        <ChevronRight className="h-4 w-4" />
      </button>
    );
  }
);

type PaginationEllipsisProps = React.HTMLAttributes<HTMLSpanElement>;

const PaginationEllipsis = React.forwardRef<
  HTMLSpanElement,
  PaginationEllipsisProps
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      "inline-flex h-9 w-9 items-center justify-center text-muted-foreground",
      className
    )}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
));

export {
  Pagination,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  paginationVariants,
};

export type {
  PaginationProps,
  PaginationItemProps,
  PaginationNavProps,
  PaginationEllipsisProps,
};
