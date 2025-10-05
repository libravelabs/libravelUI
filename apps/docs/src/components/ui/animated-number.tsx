"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  minStepTime?: number;
}

function AnimatedNumber({
  value,
  duration = 50,
  minStepTime = 40,
}: AnimatedNumberProps) {
  const [display, setDisplay] = useState(value);
  const prev = useRef(value);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (prev.current === value) return;

    const diff = value - prev.current;
    const step = diff > 0 ? 1 : -1;
    setDirection(step);

    const steps = Math.abs(diff);
    const rawStepDuration = duration / steps;
    const stepDuration = Math.max(minStepTime, rawStepDuration);

    let current = prev.current;
    let i = 0;

    const interval = setInterval(() => {
      current += step;
      setDisplay(current);
      i++;
      if (i >= steps) {
        clearInterval(interval);
        prev.current = value;
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [value, duration, minStepTime]);

  return (
    <div className="relative size-10 overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={display}
          initial={{
            y: direction === 1 ? 30 : -30,
            opacity: 0,
            position: "absolute",
            width: "100%",
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          exit={{
            y: direction === 1 ? -30 : 30,
            opacity: 0,
          }}
          transition={{
            duration: 0.25,
            ease: "easeOut",
          }}
        >
          {display}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export type { AnimatedNumberProps };
export { AnimatedNumber };
