import * as React from "react";
import { cn } from "@/lib/utils";

export interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

type AnyProps = Record<string, unknown>;

type ElementWithRef<P = AnyProps> = React.ReactElement<P> & {
  ref?: React.Ref<HTMLElement>;
};

const Slot = React.forwardRef<HTMLElement, SlotProps>(
  ({ children, ...props }, ref) => {
    if (React.isValidElement(children)) {
      const child = children as ElementWithRef;

      return React.cloneElement(child, {
        ...mergeProps(props, child.props),
        ref: ref ? composeRefs(ref, child.ref) : child.ref,
      });
    }

    return React.Children.count(children) > 1
      ? React.Children.only(null)
      : null;
  },
);

Slot.displayName = "Slot";

export const Slottable = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

function composeRefs<T>(...refs: Array<React.Ref<T> | undefined>) {
  return (node: T) => {
    for (const ref of refs) {
      if (typeof ref === "function") {
        ref(node);
      } else if (ref && "current" in ref) {
        ref.current = node;
      }
    }
  };
}

function mergeProps(
  slotProps: React.HTMLAttributes<HTMLElement>,
  childProps: React.HTMLAttributes<HTMLElement>,
) {
  const style = { ...slotProps.style, ...childProps.style };
  const className = cn(slotProps.className, childProps.className);

  return {
    ...slotProps,
    ...childProps,
    style,
    className,
  };
}

export { Slot };
