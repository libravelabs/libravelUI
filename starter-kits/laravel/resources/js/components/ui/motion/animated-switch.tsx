"use client";

import { useState, useCallback, ReactNode } from "react";
import { motion } from "motion/react";
import { Power, PowerOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnimatedSwitchProps {
  value?: boolean;
  defaultValue?: boolean;
  onValueChange?: (value: boolean) => void;
  className?: string;
  onIcon?: ReactNode;
  offIcon?: ReactNode;
}

function AnimatedSwitch({
  value,
  defaultValue = false,
  onValueChange,
  className,
  onIcon = <Power />,
  offIcon = <PowerOff />,
}: AnimatedSwitchProps) {
  const [internal, setInternal] = useState<boolean>(defaultValue);

  const isControlled = value !== undefined;
  const isOn = isControlled ? value : internal;

  const switching = useCallback(() => {
    const next = !isOn;
    if (!isControlled) setInternal(next);
    if (onValueChange) onValueChange(next);
  }, [isOn, isControlled, onValueChange]);

  return (
    <div
      onClick={switching}
      className={cn(
        "relative shrink-0 min-w-20 flex items-center cursor-pointer rounded-lg ring ring-border bg-card p-1",
        "w-20 h-10",
        className,
      )}
    >
      <div
        className={cn(
          "absolute inset-s-3 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-10",
          "size-4",
        )}
      >
        {offIcon}
      </div>

      <div
        className={cn(
          "absolute inset-e-[11.5px] top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-10",
          "size-4",
        )}
      >
        {onIcon}
      </div>

      <motion.div
        layout
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 35,
          mass: 0.8,
        }}
        className={cn(
          "absolute rounded-md bg-foreground/10",
          "size-8 shadow-[0_3px_8px_rgba(0,0,0,0.40),0_1px_3px_rgba(0,0,0,0.30),inset_0_1px_0_rgba(255,255,255,0.05),inset_0_-1px_0_rgba(0,0,0,0.20)] dark:shadow-[0_3px_8px_var(--background),0_1px_3px_var(--background),inset_0_1px_0_rgba(255,255,255,0.05),inset_0_-1px_0_rgba(0,0,0,0.20)]",
        )}
        style={{
          left: isOn ? "44px" : "4px",
          top: "4px",
        }}
      />
    </div>
  );
}

export { AnimatedSwitch, type AnimatedSwitchProps };
