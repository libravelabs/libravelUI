import * as React from "react";
import { cn } from "@/lib/utils";
import { mergeRefs } from "@/lib/merge-refs";

export interface SlotProps<T extends HTMLElement = HTMLElement>
  extends React.HTMLAttributes<T> {
  children: React.ReactElement<any, React.ElementType>;
  className?: string;
}

export const Slot = React.forwardRef(
  <T extends HTMLElement>(
    { children, className, ...props }: SlotProps<T>,
    ref: React.Ref<T>
  ) => {
    if (!React.isValidElement(children)) {
      throw new Error("Slot children must be a valid React element");
    }

    const childRef = (children as React.ReactElement & { ref?: React.Ref<T> })
      .ref;

    return React.cloneElement(children, {
      ...props,
      ref: mergeRefs([ref, childRef]),
      className: cn(className, children.props.className),
    });
  }
) as <T extends HTMLElement = HTMLElement>(
  props: SlotProps<T> & { ref?: React.Ref<T> }
) => React.ReactElement;

Slot.displayName = "Slot";
