"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { motion, LayoutGroup } from "motion/react";

const paginationContainer = cva("flex items-center justify-center", {
  variants: {
    spacing: {
      default: "gap-1",
      compact: "gap-0.5",
    },
  },
  defaultVariants: {
    spacing: "default",
  },
});

const paginationItem = cva(
  "group relative inline-flex items-center justify-center whitespace-nowrap text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      tone: {
        default:
          "text-foreground hover:bg-accent hover:text-accent-foreground data-[active=true]:text-primary-foreground focus-visible:ring-ring",
        outline:
          "text-muted-foreground/60 data-[active=true]:text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring",
        ghost:
          "text-muted-foreground/60 data-[active=true]:text-foreground data-[active=true]:scale-125 hover:text-foreground focus-visible:ring-ring",
        secondary: "text-secondary-foreground hover:opacity-70",
        link: "data-[active=true]:text-primary underline-offset-4 hover:underline",
        underline: "text-foreground data-[active=true]:text-primary",
      },
      size: {
        sm: "size-8 text-xs",
        default: "size-9",
        lg: "size-10",
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      tone: "default",
      size: "default",
      radius: "md",
    },
  }
);

const paginationNav = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-3 text-foreground hover:text-accent-foreground focus-visible:ring-ring cursor-pointer",
  {
    variants: {
      tone: {
        default:
          "text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring",
        outline:
          "border border-border text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring",
        ghost:
          "text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring",
        secondary: "text-secondary-foreground hover:opacity-70",
        link: "underline-offset-4 hover:underline",
        underline: "text-foreground hover:text-primary",
      },
      size: {
        sm: "h-8 text-xs px-2",
        default: "h-9",
        lg: "h-10 px-4",
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      tone: "default",
      size: "default",
      radius: "md",
    },
  }
);

const activeVariants = cva("absolute inset-0 z-0 transition-none", {
  variants: {
    tone: {
      default: "bg-primary group-hover:opacity-70",
      destructive: "bg-destructive group-hover:opacity-70",
      outline: "border-2 border-primary bg-transparent group-hover:opacity-70",
      secondary: "bg-secondary group-hover:opacity-70",
      ghost: "group-hover:bg-foreground/10",
      link: "",
      underline: "border-b-2 border-primary !rounded-none",
    },
    size: {
      sm: "h-8",
      default: "h-9",
      lg: "h-10",
    },
    radius: {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      full: "rounded-full",
    },
  },
  defaultVariants: {
    tone: "default",
    size: "default",
    radius: "md",
  },
});

type PaginationVariantProps = VariantProps<typeof paginationContainer> &
  VariantProps<typeof paginationNav> &
  VariantProps<typeof paginationItem> & {
    id?: string;
  };

const PaginationContext = React.createContext<PaginationVariantProps | null>(
  null
);

function usePagination() {
  const context = React.useContext(PaginationContext);
  if (!context)
    throw new Error("Pagination components must be used within <Pagination>");
  const { id, tone, size, radius, spacing } = context;
  return { id, tone, size, radius, spacing };
}

type PaginationProps = React.HTMLAttributes<HTMLElement> &
  PaginationVariantProps;

function Pagination({
  className,
  spacing,
  tone,
  size,
  radius,
  ...props
}: PaginationProps) {
  const id = React.useId();

  return (
    <PaginationContext.Provider value={{ id, tone, size, radius, spacing }}>
      <LayoutGroup id={id}>
        <nav
          role="navigation"
          aria-label="pagination"
          className={cn(paginationContainer({ spacing }), className)}
          {...props}
        />
      </LayoutGroup>
    </PaginationContext.Provider>
  );
}

interface PaginationItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

function PaginationItem({
  className,
  isActive,
  children,
  ...props
}: PaginationItemProps) {
  const { id, tone, size, radius } = usePagination();

  return (
    <button
      data-active={isActive}
      className={cn(
        paginationItem({ tone, size, radius }),
        "relative group",
        className
      )}
      aria-current={isActive ? "page" : undefined}
      {...props}
    >
      {tone !== "ghost" && isActive && (
        <motion.div
          layoutId={`${id}-pagination-active`}
          className={cn(activeVariants({ tone, size, radius }))}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
}

type PaginationNavProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

function PaginationPrevious({
  className,
  children,
  ...props
}: PaginationNavProps) {
  const { tone, size, radius } = usePagination();

  return (
    <button
      className={cn(paginationNav({ tone, size, radius }), className)}
      {...props}
    >
      <ChevronLeft className="size-4" />
      {children ?? "Previous"}
    </button>
  );
}

function PaginationNext({ className, children, ...props }: PaginationNavProps) {
  const { tone, size, radius } = usePagination();

  return (
    <button
      className={cn(paginationNav({ tone, size, radius }), className)}
      {...props}
    >
      {children ?? "Next"}
      <ChevronRight className="size-4" />
    </button>
  );
}

type PaginationEllipsisProps = React.HTMLAttributes<HTMLSpanElement>;

function PaginationEllipsis({ className, ...props }: PaginationEllipsisProps) {
  return (
    <span
      className={cn(
        "inline-flex size-9 items-center justify-center text-muted-foreground",
        className
      )}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}

export type { PaginationVariantProps };

export {
  Pagination,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  paginationContainer,
  paginationItem,
  paginationNav,
};
