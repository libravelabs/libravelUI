"use client";

import React, { useState } from "react";
import { AnimatedTooltip } from "@/components/ui/motion/animated-tooltip";
import { Button } from "@/components/ui/core/button";
import { Toggle } from "@/components/ui/core/toggle";
import { Power, PowerOff } from "lucide-react";

export default function AnimatedTooltipArrow() {
  const [arrowEnabled, setArrowEnabled] = useState(true);

  return (
    <div className="rounded-lg border p-4 bg-card">
      <div className="flex flex-col items-start justify-between mb-3">
        <h3 className="text-sm font-semibold">With Arrow</h3>
        <div className="text-xs text-muted-foreground">
          just click the toggle on the left to enable/disable the arrow
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Toggle
          isSelected={arrowEnabled}
          onClick={() => setArrowEnabled((s) => !s)}
          tone="outline"
          iconOnly
        >
          {({ isSelected }) =>
            isSelected ? (
              <>
                <PowerOff />
              </>
            ) : (
              <Power />
            )
          }
        </Toggle>

        <AnimatedTooltip
          trigger={
            <Button tone="outline" className="px-4 py-2 rounded-md border">
              Preview
            </Button>
          }
          position="right"
          showArrow={arrowEnabled}
          animationStyle="orbit"
          delay={150}
        >
          <div className="text-sm">
            <strong>{arrowEnabled ? "With arrow" : "No arrow"}</strong>
            <div className="text-xs text-muted-foreground">
              toggle to switch
            </div>
          </div>
        </AnimatedTooltip>
      </div>
    </div>
  );
}
