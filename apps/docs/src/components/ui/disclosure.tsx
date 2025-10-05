"use client";

import {
  Button,
  Disclosure as DisclosurePrimitive,
  DisclosureStateContext,
  Heading,
} from "react-aria-components";
import { ChevronDown } from "lucide-react";
import React, { use, useRef, createContext, useContext } from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  type Transition,
  type Variants,
} from "motion/react";
import { type ButtonProps } from "@/components/ui/button";

const DisclosureStyleContext = createContext<
  VariantProps<typeof disclosureVariants>
>({
  variant: "default",
  size: "sm",
});

const useDisclosureStyle = () => useContext(DisclosureStyleContext);

const disclosureVariants = cva("w-full", {
  variants: {
    variant: {
      default: "border-b border-border",
      ghost: "",
      outline: [
        "border rounded-xl",
        "group-data-[variant=outline]:border-b group-data-[variant=outline]:border-border group-data-[variant=outline]:rounded-none",
      ],
      solid: [
        "border bg-background shadow-sm rounded-xl",
        "group-data-[variant=solid]:border-b group-data-[variant=solid]:border-border group-data-[variant=solid]:rounded-none",
      ],
      muted: [
        "border border-border bg-muted/50 rounded-xl",
        "group-data-[variant=muted]:border-b group-data-[variant=muted]:border-border group-data-[variant=muted]:rounded-none",
      ],
      separated: "border-t last:border-b",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      full: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "sm",
  },
});

const disclosureTriggerVariants = cva(
  "flex items-center justify-between w-full font-medium transition-all focus:outline-hidden disabled:pointer-events-none disabled:opacity-50 cursor-pointer text-left",
  {
    variants: {
      size: {
        sm: "px-4 py-3",
        md: "px-5 py-4",
        lg: "px-6 py-5",
        xl: "px-7 py-6",
        full: "px-4 py-3",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  }
);

const disclosureContentVariants = cva("overflow-hidden text-muted-foreground", {
  variants: {
    size: {
      sm: "px-4 pb-3",
      md: "px-5 pb-4",
      lg: "px-6 pb-5",
      xl: "px-7 pb-6",
      full: "px-4 pb-3",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

type DisclosureProps = React.ComponentProps<typeof DisclosurePrimitive> &
  VariantProps<typeof disclosureVariants> & {
    transition?: Transition;
  };

function Disclosure({
  variant,
  size,
  className,
  transition,
  ...props
}: DisclosureProps) {
  return (
    <DisclosureStyleContext.Provider value={{ variant, size }}>
      <MotionConfig transition={transition}>
        <DisclosurePrimitive
          className={cn(disclosureVariants({ variant, size }), className)}
          {...props}
        />
      </MotionConfig>
    </DisclosureStyleContext.Provider>
  );
}

interface DisclosureTriggerProps extends ButtonProps {
  icon?: React.ReactNode;
  hideChevron?: boolean;
  asChild?: boolean;
  children?: React.ReactNode | ButtonProps["children"];
}

function DisclosureTrigger({
  className,
  icon,
  hideChevron = false,
  asChild = false,
  children,
  ...props
}: DisclosureTriggerProps) {
  const { size } = useDisclosureStyle();
  const { isExpanded } = use(DisclosureStateContext)!;

  if (asChild) {
    if (!React.isValidElement(children)) {
      console.warn(
        "DisclosureTrigger with asChild expects a single React element as child."
      );
      return <>{children}</>;
    }

    return React.cloneElement(children, {
      slot: "trigger",
      ...props,
    });
  }

  return (
    <Heading>
      <Button
        slot="trigger"
        className={cn(disclosureTriggerVariants({ size }), className)}
        {...props}
      >
        {(values) => (
          <>
            {typeof children === "function" ? (
              children(values)
            ) : (
              <div className="flex items-center gap-2">
                {icon && <span className="shrink-0">{icon}</span>}
                <span className="text-left hover:underline transition-all duration-200">
                  {children}
                </span>
              </div>
            )}
            {!hideChevron && (
              <ChevronDown
                data-slot="disclosure-chevron"
                className={cn(
                  "size-4 shrink-0 transition duration-300",
                  isExpanded && "rotate-180"
                )}
              />
            )}
          </>
        )}
      </Button>
    </Heading>
  );
}

function DisclosureContent({
  className,
  children,
}: React.ComponentProps<"div">) {
  const { size } = useDisclosureStyle();
  const { isExpanded } = use(DisclosureStateContext)!;
  const contentRef = useRef<HTMLDivElement>(null);

  const variants: Variants = {
    expanded: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    collapsed: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <AnimatePresence initial={false}>
      {isExpanded && (
        <motion.div
          initial="collapsed"
          animate="expanded"
          exit="collapsed"
          variants={variants}
          className={cn("overflow-hidden", className)}
        >
          <div
            ref={contentRef}
            className={cn(disclosureContentVariants({ size }), className)}
          >
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export { Disclosure, DisclosureTrigger, DisclosureContent };
export type { DisclosureProps, DisclosureTriggerProps };
