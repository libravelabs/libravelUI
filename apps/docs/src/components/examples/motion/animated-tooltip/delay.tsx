"use client";

import React, { useState, useEffect } from "react";
import { AnimatedTooltip } from "@/components/ui/motion/animated-tooltip";
import { Button } from "@/components/ui/core/button";
import { NumberField, NumberInput } from "@/components/ui/core/number-field";

export default function TooltipDelayShowcase() {
  const [delay, setDelay] = useState(500);
  const [debouncedDelay, setDebouncedDelay] = useState(500);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedDelay(delay), 200);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className="rounded-lg border p-4 bg-card">
      <div className="flex flex-col items-start justify-between mb-3">
        <h3 className="text-sm font-semibold">Delay</h3>
        <div className="text-xs text-muted-foreground">
          just fill the number field and there you go
        </div>
      </div>

      <div className="flex items-center gap-4">
        <NumberField
          defaultValue={500}
          onChange={(value) => setDelay(Number(value))}
          className="w-40"
        />

        <AnimatedTooltip
          trigger={<Button tone="outline">Hover me</Button>}
          position="top"
          delay={debouncedDelay}
          animationStyle="elastic"
          showArrow
        >
          <div className="text-sm">
            <strong>Delay: {debouncedDelay}ms</strong>
          </div>
        </AnimatedTooltip>
      </div>
    </div>
  );
}
