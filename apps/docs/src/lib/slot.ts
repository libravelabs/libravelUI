import * as React from "react";
import { cn } from "@/lib/utils";
import { mergeRefs } from "@/lib/merge-refs";

type AnyProps = Record<string, any>;

export interface SlotProps extends AnyProps {
  children: React.ReactElement;
  className?: string;
}

export const Slot = React.forwardRef<HTMLElement, SlotProps>(
  ({ children, className, ...props }, ref) => {
    if (!React.isValidElement(children)) {
      throw Error("Slot children must be a valid React element");
      return null;
    }

    return React.cloneElement(children, {
      ...props,
      ref: mergeRefs([ref, (children as any).ref]),
      className: cn(className, children.props.className),
    });
  }
);

Slot.displayName = "Slot";
