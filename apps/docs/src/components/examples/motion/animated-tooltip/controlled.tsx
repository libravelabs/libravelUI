"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/core/button";
import { AnimatedTooltip } from "@/components/ui/motion/animated-tooltip";

export default function ControlledAnimatedTooltip() {
  const [controlledOpen, setControlledOpen] = useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="rounded-lg border border-border p-4 bg-card">
        <div className="flex flex-col items-start justify-between mb-3">
          <h3 className="text-sm font-semibold">Controlled</h3>
          <div className="text-xs text-muted-foreground">
            open is driven by parent
          </div>
        </div>

        <div className="flex items-center gap-4">
          <AnimatedTooltip
            trigger={<Button tone="outline">Toggle tooltip</Button>}
            open={controlledOpen}
            onOpenChange={setControlledOpen}
            position="bottom"
            animationStyle="punch"
          >
            <div className="text-sm">
              <strong>Controlled tooltip</strong>
              <div className="text-xs text-muted-foreground">
                open prop toggled by the button
              </div>
            </div>
          </AnimatedTooltip>

          <Button onClick={() => setControlledOpen((s) => !s)} tone="secondary">
            {controlledOpen ? "Close" : "Open"}
          </Button>
        </div>
      </div>

      <div className="rounded-lg border border-border p-4 bg-card">
        <div className="flex flex-col items-start justify-between mb-3">
          <h3 className="text-sm font-semibold">Uncontrolled</h3>
          <div className="text-xs text-muted-foreground">
            hover / focus to open
          </div>
        </div>

        <div className="flex items-center gap-4">
          <AnimatedTooltip
            trigger={<Button tone="outline">Hover me</Button>}
            position="top"
            animationStyle="wobble"
          >
            <div className="text-sm">
              <strong>Uncontrolled</strong>
              <div className="text-xs text-muted-foreground">
                no open prop provided
              </div>
            </div>
          </AnimatedTooltip>
        </div>
      </div>
    </div>
  );
}
