"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

type AnimatedToggleButtonProps = HTMLMotionProps<"button"> & {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (value: boolean) => void;
};

const AnimatedToggleButton: React.FC<AnimatedToggleButtonProps> = ({
  checked,
  defaultChecked = false,
  onCheckedChange,
  className,
  children,
  ...props
}) => {
  const [internalChecked, setInternalChecked] =
    React.useState<boolean>(defaultChecked);

  const isControlled: boolean = checked !== undefined;
  const isChecked: boolean = isControlled ? checked! : internalChecked;

  const handleClick = () => {
    const newValue = !isChecked;

    if (!isControlled) {
      setInternalChecked(newValue);
    }

    onCheckedChange?.(newValue);
  };

  return (
    <div
      onClick={handleClick}
      className="size-10 bg-card rounded-lg flex items-center justify-center [&_svg:not([class*='size-'])]:size-4 ring-2 ring-border"
    >
      <motion.span
        className={cn(
          "relative size-8 rounded-md flex items-center justify-center cursor-pointer",
          "transition-colors duration-200",
          isChecked &&
            "bg-foreground/10 shadow-[0_3px_8px_rgba(0,0,0,0.40),0_1px_3px_rgba(0,0,0,0.30),inset_0_1px_0_rgba(255,255,255,0.05),inset_0_-1px_0_rgba(0,0,0,0.20)] dark:shadow-[0_3px_8px_var(--background),0_1px_3px_var(--background),inset_0_1px_0_rgba(255,255,255,0.05),inset_0_-1px_0_rgba(0,0,0,0.20)]",
          className
        )}
        {...props}
      >
        {children}
      </motion.span>
    </div>
  );
};

export { AnimatedToggleButton, type AnimatedToggleButtonProps };
