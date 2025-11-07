"use client";
import { cn } from "@/lib/utils";
import { useState, createContext, useContext } from "react";
import {
  motion,
  MotionValue,
  SpringOptions,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { Code } from "lucide-react";

type ComparatorProps = {
  children: React.ReactNode;
  className?: string;
  enableHover?: boolean;
  springOptions?: SpringOptions;
};

type ComparatorPaneProps = {
  position: "left" | "right";
  className?: string;
  children: React.ReactNode;
};

type ComparatorSliderProps = {
  className?: string;
  children?: React.ReactNode;
};

type ComparatorContextType = {
  sliderPosition: number;
  setSliderPosition: (pos: number) => void;
  motionSliderPosition: MotionValue<number>;
};

const ComparatorContext = createContext<ComparatorContextType | undefined>(
  undefined
);

const DEFAULT_SPRING_OPTIONS: SpringOptions = { bounce: 0, duration: 0 };

function Comparator({
  children,
  className,
  enableHover,
  springOptions,
}: ComparatorProps) {
  const [isDragging, setIsDragging] = useState(false);
  const motionValue = useMotionValue(50);
  const motionSliderPosition = useSpring(
    motionValue,
    springOptions ?? DEFAULT_SPRING_OPTIONS
  );
  const [sliderPosition, setSliderPosition] = useState(50);

  function handleDrag(event: React.MouseEvent | React.TouchEvent) {
    if (!isDragging && !enableHover) return;
    const containerRect = (
      event.currentTarget as HTMLElement
    ).getBoundingClientRect();
    const x =
      "touches" in event
        ? event.touches[0].clientX - containerRect.left
        : (event as React.MouseEvent).clientX - containerRect.left;

    const percentage = Math.min(
      Math.max((x / containerRect.width) * 100, 0),
      100
    );
    motionValue.set(percentage);
    setSliderPosition(percentage);
  }

  return (
    <ComparatorContext.Provider
      value={{ sliderPosition, setSliderPosition, motionSliderPosition }}
    >
      <div
        className={cn(
          "relative select-none overflow-hidden",
          enableHover && "cursor-ew-resize",
          className
        )}
        onMouseMove={handleDrag}
        onMouseDown={() => !enableHover && setIsDragging(true)}
        onMouseUp={() => !enableHover && setIsDragging(false)}
        onMouseLeave={() => !enableHover && setIsDragging(false)}
        onTouchMove={handleDrag}
        onTouchStart={() => !enableHover && setIsDragging(true)}
        onTouchEnd={() => !enableHover && setIsDragging(false)}
      >
        {children}
      </div>
    </ComparatorContext.Provider>
  );
}

function ComparatorPane({
  position,
  className,
  children,
}: ComparatorPaneProps) {
  const context = useContext(ComparatorContext);
  if (!context)
    throw new Error("ComparatorPane must be used within a Comparator");
  const { motionSliderPosition } = context;

  const leftClip = useTransform(
    motionSliderPosition,
    (v) => `inset(0 0 0 ${v}%)`
  );
  const rightClip = useTransform(
    motionSliderPosition,
    (v) => `inset(0 ${100 - v}% 0 0)`
  );

  return (
    <motion.div
      className={cn("absolute inset-0", className)}
      style={{ clipPath: position === "left" ? leftClip : rightClip }}
    >
      {children}
    </motion.div>
  );
}

function ComparatorSlider({ className, children }: ComparatorSliderProps) {
  const context = useContext(ComparatorContext);
  if (!context)
    throw new Error("ComparatorSlider must be used within a Comparator");
  const { motionSliderPosition } = context;

  const left = useTransform(motionSliderPosition, (v) => `${v}%`);

  return (
    <motion.div
      className={cn(
        "absolute top-0 bottom-0 w-0.5 cursor-ew-resize [&>*]:[-webkit-user-drag:none] [&>*]:(user‑drag:none)",
        !children && "bg-foreground",
        className
      )}
      style={{ left }}
    >
      {children ? (
        children
      ) : (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full p-1 flex items-center justify-center bg-foreground shadow-md">
          <Code className="size-4 text-background" />
        </div>
      )}
    </motion.div>
  );
}

export { Comparator, ComparatorPane, ComparatorSlider };
export type {
  ComparatorProps,
  ComparatorPaneProps,
  ComparatorSliderProps,
  ComparatorContextType,
};
