import * as React from "react";
import {
  ToggleButton as ToggleButtonPrimitive,
  ToggleButtonGroup as ToggleGroupPrimitive,
  type ToggleButtonProps,
  type ToggleButtonGroupProps,
} from "react-aria-components";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const groupVariants = cva(
  "inline-flex overflow-hidden border border-border bg-background w-fit",
  {
    variants: {
      orientation: {
        horizontal: "flex-row",
        vertical: "flex-col",
      },
      size: {
        sm: "text-xs [&_svg]:size-4",
        md: "text-sm [&_svg]:size-4.5",
        lg: "text-base [&_svg]:size-5",
        xl: "text-lg [&_svg]:size-5.5",
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
      orientation: "horizontal",
      size: "md",
      radius: "md",
    },
  }
);

type GroupVariantProps = VariantProps<typeof groupVariants>;

const ToggleCtx = React.createContext<GroupVariantProps>({
  orientation: "horizontal",
  size: "md",
  radius: "md",
});

type ToggleGroupProps = ToggleButtonGroupProps &
  GroupVariantProps & {
    isDisabled?: boolean;
  };

const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(
  ({ className, orientation = "horizontal", size, radius, ...props }, ref) => {
    return (
      <ToggleCtx.Provider value={{ orientation, radius, size }}>
        <ToggleGroupPrimitive
          ref={ref}
          orientation={orientation}
          className={cn(
            groupVariants({ orientation, size, radius }),
            className
          )}
          {...props}
        />
      </ToggleCtx.Provider>
    );
  }
);
ToggleGroup.displayName = "ToggleGroup";

type SizeKey = NonNullable<GroupVariantProps["size"]>;

const sizePad: Record<SizeKey, string> = {
  sm: "px-2.5 py-1",
  md: "px-3 py-1.5",
  lg: "px-4 py-2",
  xl: "px-5 py-2.5",
};

const itemVariants = cva(
  "relative inline-flex items-center gap-1 select-none font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:z-10 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed",
  {
    variants: {
      state: {
        default: "bg-muted text-foreground hover:bg-muted-foreground/20",
        selected: "bg-primary text-primary-foreground hover:opacity-90",
        disabled: "bg-muted text-foreground",
      },
    },
    defaultVariants: {
      state: "default",
    },
  }
);

const ToggleItem = React.forwardRef<HTMLButtonElement, ToggleButtonProps>(
  ({ className, children, ...props }, ref) => {
    const { size } = React.useContext(ToggleCtx);
    const pad = size ? sizePad[size] : sizePad.md;

    return (
      <ToggleButtonPrimitive
        ref={ref}
        className={({ isSelected, isDisabled }) =>
          cn(
            pad,
            itemVariants({
              state: isSelected
                ? "selected"
                : isDisabled
                  ? "disabled"
                  : "default",
            }),
            className
          )
        }
        {...props}
      >
        {children ? children : props.id}
      </ToggleButtonPrimitive>
    );
  }
);
ToggleItem.displayName = "ToggleItem";

export type { ToggleGroupProps };
export { ToggleItem, ToggleGroup };
