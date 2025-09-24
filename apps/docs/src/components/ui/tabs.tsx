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
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

const tabsVariants = cva("group/tabs relative flex w-full gap-4", {
  variants: {
    variant: {
      default: "bg-background",
      ghost: "bg-transparent",
      outline: "bg-transparent border border-border",
      underline: "bg-transparent",
      solid: "bg-background text-foreground shadow-sm",
      muted: "bg-muted text-muted-foreground",
    },
    width: {
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
      sm: "p-1",
      default: "p-1.5",
      lg: "p-2",
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
      vertical: "flex-row",
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

const tabListVariants = cva("flex shrink-0", {
  variants: {
    orientation: {
      horizontal: "flex-row items-center w-full",
      vertical: "flex-col items-stretch w-fit",
    },
    size: {
      sm: "gap-1",
      default: "gap-1.5",
      lg: "gap-2",
    },
    variant: {
      default: "bg-transparent border border-border px-1",
      ghost: "bg-transparent",
      underline: "bg-transparent",
      solid: "bg-transparent",
      muted: "bg-transparent",
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
  "relative inline-flex items-center gap-1.5 whitespace-nowrap font-medium transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4.5",
  {
    variants: {
      variant: {
        default:
          "text-muted-foreground hover:text-foreground selected:text-foreground",
        ghost:
          "text-muted-foreground hover:text-foreground selected:text-foreground",
        underline:
          "text-muted-foreground hover:text-foreground selected:text-foreground",
        solid:
          "text-muted-foreground hover:text-foreground selected:text-foreground",
        muted:
          "text-muted-foreground hover:text-foreground selected:text-foreground",
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

type TabsContextValue = VariantProps<typeof tabsVariants>;
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
  return (
    <TabsContext.Provider value={{ variant, size, orientation, radius, width }}>
      <TabsPrimitive
        className={cn(
          tabsVariants({ variant, size, orientation, width, radius }),
          orientation === "vertical" ? "items-start" : "items-stretch",
          className
        )}
        orientation={orientation}
        ref={ref}
        {...props}
      />
    </TabsContext.Provider>
  );
}

interface TabListProps<T extends object> extends TabListPrimitiveProps<T> {
  ref?: React.RefObject<HTMLDivElement>;
}

function TabList<T extends object>({
  className,
  ref,
  ...props
}: TabListProps<T>) {
  const { variant, orientation, radius } = useTabsContext();

  return (
    <TabListPrimitive
      aria-label={props["aria-label"] ?? "tabs"}
      className={cn(
        tabListVariants({ orientation, variant, radius }),
        className
      )}
      ref={ref}
      {...props}
    />
  );
}

interface TabTriggerProps extends TabTriggerPrimitiveProps {
  ref?: React.RefObject<HTMLButtonElement>;
}

function TabTrigger({ children, className, ref, ...props }: TabTriggerProps) {
  const { variant, size, radius, orientation } = useTabsContext();

  return (
    <TabTriggerPrimitive
      className={cn(
        tabTriggerVariants({ variant, size, radius, orientation }),
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
              layoutId="tab-indicator"
              className={cn(
                "absolute z-10",
                `rounded-${radius}`,
                variant === "underline" && orientation === "vertical"
                  ? "start-0 w-0.5 h-full bg-primary"
                  : variant === "underline" && orientation === "horizontal"
                  ? "bottom-0 h-0.5 w-full bg-primary"
                  : "inset-y-1 left-0 right-0 bg-foreground/20"
              )}
            />
          )}
        </>
      )}
    </TabTriggerPrimitive>
  );
}

interface TabContentProps extends TabContentPrimitiveProps {
  ref?: React.RefObject<HTMLDivElement>;
}

function TabContent({ className, children, ref, ...props }: TabContentProps) {
  const { orientation } = useTabsContext();

  const isVertical = orientation === "vertical";

  return (
    <TabContentPrimitive
      className={cn(
        "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 flex-1",
        className
      )}
      ref={ref}
      {...props}
    >
      {(values) => (
        <motion.div
          initial={{
            opacity: 0,
            ...(isVertical ? { x: -12 } : { y: -12 }),
          }}
          animate={{
            opacity: 1,
            x: 0,
            y: 0,
          }}
          exit={{
            opacity: 0,
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
