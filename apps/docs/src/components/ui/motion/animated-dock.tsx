"use client";

import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
  type SpringOptions,
  AnimatePresence,
} from "motion/react";
import {
  Children,
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

const AnimatedDOCK_HEIGHT = 128;
const DEFAULT_MAGNIFICATION = 80;
const DEFAULT_DISTANCE = 150;
const DEFAULT_PANEL_HEIGHT = 64;

type AnimatedDockProps = {
  children: React.ReactNode;
  className?: string;
  distance?: number;
  panelHeight?: number;
  magnification?: number;
  spring?: SpringOptions;
};

type AnimatedDockItemProps = {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

type AnimatedDockLabelProps = {
  className?: string;
  children: React.ReactNode;
};

type AnimatedDockIconProps = {
  className?: string;
  children: React.ReactNode;
};

type AnimatedDockContextType = {
  mouseX: MotionValue;
  spring: SpringOptions;
  magnification: number;
  distance: number;
};

type AnimatedDockProviderProps = {
  children: React.ReactNode;
  value: AnimatedDockContextType;
};

const AnimatedDockContext = createContext<AnimatedDockContextType | undefined>(
  undefined
);

function AnimatedDockProvider({ children, value }: AnimatedDockProviderProps) {
  return (
    <AnimatedDockContext.Provider value={value}>
      {children}
    </AnimatedDockContext.Provider>
  );
}

function useAnimatedDock() {
  const context = useContext(AnimatedDockContext);
  if (!context) {
    throw new Error(
      "useAnimatedDock must be used within an AnimatedDockProvider"
    );
  }
  return context;
}

function AnimatedDock({
  children,
  className,
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  panelHeight = DEFAULT_PANEL_HEIGHT,
}: AnimatedDockProps) {
  const mouseX = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);

  const maxHeight = useMemo(() => {
    return Math.max(AnimatedDOCK_HEIGHT, magnification + magnification / 2 + 4);
  }, [magnification]);

  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
  const height = useSpring(heightRow, spring);

  return (
    <motion.div
      style={{
        height: height,
        scrollbarWidth: "none",
      }}
      className="mx-2 flex max-w-full items-end overflow-x-auto"
    >
      <motion.div
        onMouseMove={({ pageX }) => {
          isHovered.set(1);
          mouseX.set(pageX);
        }}
        onMouseLeave={() => {
          isHovered.set(0);
          mouseX.set(Infinity);
        }}
        className={cn(
          "mx-auto flex w-fit gap-4 rounded-xl bg-muted px-4",
          className
        )}
        style={{ height: panelHeight }}
        role="toolbar"
        aria-label="Application Animateddock"
      >
        <AnimatedDockProvider
          value={{ mouseX, spring, distance, magnification }}
        >
          {children}
        </AnimatedDockProvider>
      </motion.div>
    </motion.div>
  );
}

function AnimatedDockItem({
  children,
  className,
  onClick,
}: AnimatedDockItemProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { distance, magnification, mouseX, spring } = useAnimatedDock();

  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseX, (val) => {
    const domRect = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - domRect.x - domRect.width / 2;
  });

  const widthTransform = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [40, magnification, 40]
  );

  const width = useSpring(widthTransform, spring);

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      className={cn(
        "relative inline-flex items-center justify-center bg-muted",
        className
      )}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
      onClick={onClick}
    >
      {Children.map(children, (child) =>
        cloneElement(child as React.ReactElement, { width, isHovered })
      )}
    </motion.div>
  );
}

function AnimatedDockLabel({
  children,
  className,
  ...rest
}: AnimatedDockLabelProps) {
  const restProps = rest as Record<string, unknown>;
  const isHovered = restProps["isHovered"] as MotionValue<number>;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = isHovered.on("change", (latest) => {
      setIsVisible(latest === 1);
    });

    return () => unsubscribe();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -10 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "absolute -top-6 left-1/2 w-fit whitespace-pre rounded-md border bg-primary text-primary-foreground px-2 py-0.5 text-xs",
            className
          )}
          role="tooltip"
          style={{ x: "-50%" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function AnimatedDockIcon({
  children,
  className,
  ...rest
}: AnimatedDockIconProps) {
  const restProps = rest as Record<string, unknown>;
  const width = restProps["width"] as MotionValue<number>;

  const widthTransform = useTransform(width, (val) => val / 2);

  return (
    <motion.div
      style={{ width: widthTransform }}
      className={cn("flex items-center justify-center", className)}
    >
      {children}
    </motion.div>
  );
}

export type {
  AnimatedDockProps,
  AnimatedDockItemProps,
  AnimatedDockLabelProps,
  AnimatedDockIconProps,
  AnimatedDockContextType,
  AnimatedDockProviderProps,
};
export { AnimatedDock, AnimatedDockIcon, AnimatedDockItem, AnimatedDockLabel };
