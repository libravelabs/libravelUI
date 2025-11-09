"use client";

import {
  Tabs as TabsPrimitive,
  TabList as TabListPrimitive,
  Tab as TabTriggerPrimitive,
  TabPanel as TabContentPrimitive,
} from "react-aria-components";
import type {
  TabsProps as TabsPrimitiveProps,
  TabListProps as TabListPrimitiveProps,
  TabProps as TabTriggerPrimitiveProps,
  TabPanelProps as TabContentPrimitiveProps,
} from "react-aria-components";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn, getLowerRadiusClass } from "@/lib/utils";
import { motion } from "motion/react";

const tabsVariants = cva("group relative flex w-full", {
  variants: {
    variant: {
      default: "bg-secondary gap-4",
      ghost: "bg-transparent",
      outline: "bg-transparent border border-border",
      underline: "bg-secondary",
    },
    width: {
      "2xs": "max-w-2xs",
      xs: "max-w-xs",
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg",
      xl: "max-w-xl",
      "2xl": "max-w-2xl",
      "3xl": "max-w-3xl",
      "4xl": "max-w-4xl",
      "5xl": "max-w-5xl",
      "6xl": "max-w-6xl",
      "7xl": "max-w-7xl",
      full: "max-w-full",
    },
    size: {
      sm: "p-0.5",
      default: "p-1",
      lg: "p-1.5",
    },
    radius: {
      none: "",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      "2xl": "rounded-2xl",
      "3xl": "rounded-3xl",
    },
    orientation: {
      horizontal: "flex-col",
      vertical: "flex-row h-full",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    width: "xl",
    orientation: "horizontal",
    radius: "md",
  },
});

const tabListVariants = cva("flex shrink-0 w-fit px-1", {
  variants: {
    orientation: {
      horizontal: "flex-row items-center",
      vertical: "flex-col items-stretch",
    },
    size: {
      sm: "gap-1",
      default: "gap-1.5",
      lg: "gap-2",
    },
    variant: {
      default:
        "bg-transparent border border-border data-[orientation=horizontal]:w-full",
      ghost: "bg-transparent",
      underline: "bg-transparent data-[orientation=horizontal]:px-2",
      outline: "data-[orientation=horizontal]:w-full",
    },
    radius: {
      none: "",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      "2xl": "rounded-2xl",
      "3xl": "rounded-3xl",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    size: "default",
    variant: "default",
    radius: "md",
  },
});

const tabTriggerVariants = cva(
  "relative inline-flex items-center gap-1.5 whitespace-nowrap font-medium transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "text-muted-foreground hover:text-foreground selected:text-foreground",
        ghost:
          "text-muted-foreground hover:text-foreground selected:text-foreground",
        underline:
          "text-muted-foreground hover:text-foreground selected:text-primary",
        outline: "",
      },
      size: {
        sm: "text-xs px-2.5 py-1",
        default: "text-sm px-3 py-1.5",
        lg: "text-base px-4 py-2",
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        "2xl": "rounded-2xl",
        "3xl": "rounded-3xl",
      },
      orientation: {
        horizontal: "flex-1 justify-center",
        vertical: "w-full justify-start ps-4 text-start",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      radius: "md",
      orientation: "horizontal",
    },
  }
);

const tabContentVariants = cva(
  "relative w-full outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 flex-1 h-full",
  {
    variants: {
      variant: {
        default: "bg-card text-foreground",
        ghost: "bg-transparent text-foreground",
        underline: "bg-card text-foreground",
        outline: "bg-card border border-border",
      },
      size: {
        sm: "p-1 text-sm",
        default: "p-2 text-base",
        lg: "p-3 text-base",
      },
      radius: {
        none: "",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        "2xl": "rounded-2xl",
        "3xl": "rounded-3xl",
      },
      orientation: {
        horizontal: "",
        vertical: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      radius: "lg",
      orientation: "horizontal",
    },
  }
);

type TabsContextValue = VariantProps<typeof tabsVariants> & { id: string };
const TabsContext = React.createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const ctx = React.useContext(TabsContext);
  if (!ctx) throw new Error("Tab components must be used within <Tabs>");
  return ctx;
}

type TabsProps = TabsPrimitiveProps &
  VariantProps<typeof tabsVariants> & {
    ref?: React.RefObject<HTMLDivElement>;
  };

function Tabs({
  className,
  ref,
  variant,
  size,
  orientation = "horizontal",
  radius,
  width,
  ...props
}: TabsProps) {
  const id = React.useId();

  return (
    <TabsContext.Provider
      value={{ id, variant, size, orientation, radius, width }}
    >
      <TabsPrimitive
        className={cn(
          tabsVariants({ variant, size, orientation, width, radius }),
          orientation === "vertical" ? "items-start" : "items-stretch",
          className
        )}
        data-variant={variant}
        orientation={orientation}
        ref={ref}
        {...props}
      />
    </TabsContext.Provider>
  );
}

interface TabListProps<T extends object>
  extends TabListPrimitiveProps<T>,
    VariantProps<typeof tabListVariants> {
  ref?: React.RefObject<HTMLDivElement>;
}

function TabList<T extends object>({
  className,
  ref,
  variant,
  radius,
  size,
  orientation,
  ...props
}: TabListProps<T>) {
  const ctx = useTabsContext();
  const resolvedVariant = variant ?? ctx.variant;
  const resolvedRadius = radius ?? ctx.radius;
  const resolvedSize = size ?? ctx.size;
  const resolvedOrientation = orientation ?? ctx.orientation;

  return (
    <TabListPrimitive
      aria-label={props["aria-label"] ?? "tabs"}
      data-orientation={resolvedOrientation}
      className={cn(
        tabListVariants({
          orientation: resolvedOrientation,
          variant: resolvedVariant,
          radius: resolvedRadius,
          size: resolvedSize,
        }),
        className
      )}
      ref={ref}
      {...props}
    />
  );
}

interface TabTriggerProps
  extends TabTriggerPrimitiveProps,
    VariantProps<typeof tabTriggerVariants> {
  ref?: React.RefObject<HTMLButtonElement>;
}

function TabTrigger({
  children,
  className,
  ref,
  variant,
  size,
  radius,
  orientation,
  ...props
}: TabTriggerProps) {
  const ctx = useTabsContext();
  const resolvedVariant = variant ?? ctx.variant;
  const resolvedSize = size ?? ctx.size;
  const resolvedRadius = radius ?? ctx.radius;
  const resolvedOrientation = orientation ?? ctx.orientation;

  return (
    <TabTriggerPrimitive
      className={cn(
        tabTriggerVariants({
          variant: resolvedVariant,
          size: resolvedSize,
          radius: resolvedRadius,
          orientation: resolvedOrientation,
        }),
        className
      )}
      ref={ref}
      {...props}
    >
      {({ isSelected }) => (
        <>
          {children}
          {isSelected && (
            <motion.div
              layoutId={`tab-indicator-${ctx.id}`}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
                mass: 0.3,
              }}
              className={cn(
                "absolute z-10",
                getLowerRadiusClass(resolvedRadius ?? "md"),
                resolvedVariant === "underline" &&
                  resolvedOrientation === "vertical"
                  ? "start-0 w-0.5 h-full bg-primary"
                  : resolvedVariant === "underline" &&
                      resolvedOrientation === "horizontal"
                    ? "bottom-0 h-0.5 w-full bg-primary"
                    : "inset-y-1 left-0 right-0 bg-primary/20"
              )}
            />
          )}
        </>
      )}
    </TabTriggerPrimitive>
  );
}

interface TabContentProps
  extends TabContentPrimitiveProps,
    VariantProps<typeof tabContentVariants> {
  ref?: React.RefObject<HTMLDivElement>;
}

function TabContent({
  className,
  children,
  ref,
  variant,
  size,
  radius,
  orientation,
  ...props
}: TabContentProps) {
  const ctx = useTabsContext();
  const resolvedVariant = variant ?? ctx.variant;
  const resolvedSize = size ?? ctx.size;
  const resolvedRadius = radius ?? ctx.radius;
  const resolvedOrientation = orientation ?? ctx.orientation;
  const isVertical = resolvedOrientation === "vertical";

  return (
    <TabContentPrimitive
      className={cn(
        tabContentVariants({
          variant: resolvedVariant,
          size: resolvedSize,
          radius: resolvedRadius,
        }),
        className
      )}
      ref={ref}
      {...props}
    >
      {(values) => (
        <motion.div
          initial={{
            opacity: 0,
            filter: "blur(4px)",
            ...(isVertical ? { x: -12 } : { y: -12 }),
          }}
          animate={{
            filter: "blur(0px)",
            opacity: 1,
            x: 0,
            y: 0,
          }}
          exit={{
            opacity: 0,
            filter: "blur(4px)",
            ...(isVertical ? { x: -12 } : { y: -12 }),
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        >
          {typeof children === "function" ? children(values) : children}
        </motion.div>
      )}
    </TabContentPrimitive>
  );
}

export {
  Tabs,
  TabList,
  TabTrigger,
  TabContent,
  tabsVariants,
  tabTriggerVariants,
};
export type { TabsProps, TabListProps, TabTriggerProps, TabContentProps };
