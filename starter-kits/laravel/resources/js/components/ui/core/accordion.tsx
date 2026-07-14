"use client";

import { cn } from "@/lib/utils";
import { DisclosureGroup as AccordionPrimitive } from "react-aria-components";
import type { DisclosureGroupProps as AccordionPrimitiveProps } from "react-aria-components";
import {
  Disclosure,
  DisclosureContent,
  DisclosureTrigger,
  type DisclosureProps,
} from "@/components/ui/core/disclosure";
import { createContext, useContext } from "react";
import { cva, type VariantProps } from "class-variance-authority";

const accordionVariants = cva(
  "group w-full peer cursor-default disabled:cursor-not-allowed disabled:opacity-75",
  {
    variants: {
      tone: {
        default: "overflow-hidden",
        ghost: "",
        outline: "border border-border rounded-xl overflow-hidden",
        solid: "border bg-background shadow-sm rounded-xl overflow-hidden",
        muted: "border border-border bg-muted/50 rounded-xl overflow-hidden",
        separated: "",
      },
      size: {
        sm: "text-sm max-w-lg",
        md: "max-w-2xl",
        lg: "text-lg max-w-4xl",
        full: "max-w-full",
      },
    },
    defaultVariants: {
      tone: "default",
      size: "md",
    },
  }
);

const AccordionStyleContext = createContext<
  VariantProps<typeof accordionVariants>
>({
  tone: "default",
  size: "sm",
});

const useAccordionStyle = () => useContext(AccordionStyleContext);

interface AccordionProps
  extends AccordionPrimitiveProps, VariantProps<typeof accordionVariants> {
  ref?: React.RefObject<HTMLDivElement>;
  multiple?: boolean;
}

function Accordion({
  children,
  ref,
  className,
  tone,
  size,
  multiple = false,
  ...props
}: AccordionProps) {
  return (
    <AccordionStyleContext.Provider value={{ tone, size }}>
      <AccordionPrimitive
        data-tone={tone}
        ref={ref}
        allowsMultipleExpanded={multiple}
        className={cn(accordionVariants({ tone, size }), className)}
        {...props}
      >
        {(values) => (
          <div data-slot="accordion-root">
            {typeof children === "function" ? children(values) : children}
          </div>
        )}
      </AccordionPrimitive>
    </AccordionStyleContext.Provider>
  );
}

function AccordionItem(props: DisclosureProps) {
  const { tone, size } = useAccordionStyle();

  return <Disclosure tone={tone} size={size} {...props} />;
}

const AccordionTrigger = DisclosureTrigger;
const AccordionContent = DisclosureContent;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
export type { AccordionProps };
