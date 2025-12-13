"use client";

import { useState } from "react";
import { Button } from "@/components/ui/core/button";
import {
  DockContent,
  DockHeader,
  DockTitle,
  DockDescription,
} from "@/components/ui/core/dock";

type Side = "left" | "right" | "top" | "bottom";

export default function DockPositions() {
  const [dockSide, setDockSide] = useState<Side>("left");
  const [isOpen, setIsOpen] = useState(false);

  const sides: Side[] = ["left", "right", "top", "bottom"];

  const pressHandler = (side: Side, open: boolean) => {
    setDockSide(side);
    setIsOpen(open);
  };

  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-2 gap-2">
        {sides.map((side) => (
          <Button
            key={side}
            onClick={() => pressHandler(side, true)}
            className="capitalize"
            tone="outline"
          >
            {side}
          </Button>
        ))}
      </div>

      <DockContent
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        side={dockSide}
        aria-label={`Dock from ${dockSide}`}
      >
        <DockHeader>
          <DockTitle className="capitalize">{dockSide}</DockTitle>
          <DockDescription>
            The dock will go from the {dockSide} side.
          </DockDescription>
        </DockHeader>
      </DockContent>
    </div>
  );
}
