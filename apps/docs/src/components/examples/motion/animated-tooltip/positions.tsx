"use client";

import { Button } from "@/components/ui/core/button";
import { AnimatedTooltip } from "@/components/ui/motion/animated-tooltip";

const POSITIONS: Array<"top" | "bottom" | "left" | "right"> = [
  "top",
  "bottom",
  "left",
  "right",
];

export default function AnimatedTooltipPositions() {
  return (
    <div className="grid grid-cols-2 gap-6 place-items-center">
      {POSITIONS.map((pos) => (
        <div
          key={pos}
          className="flex flex-col justify-between rounded-lg border bg-card border-border p-4 shadow-sm min-h-32 h-full"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold capitalize">{pos}</h3>
          </div>

          <div className="flex items-center justify-center mt-auto">
            <AnimatedTooltip
              trigger={
                <Button tone="outline" aria-label={`${pos} tooltip`}>
                  Hover Me!
                </Button>
              }
              position={pos}
              delay={300}
              showArrow={true}
            >
              <strong className="block capitalize">{pos}</strong>
            </AnimatedTooltip>
          </div>
        </div>
      ))}
    </div>
  );
}
