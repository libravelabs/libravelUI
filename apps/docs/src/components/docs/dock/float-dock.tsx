"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DockContent,
  DockHeader,
  DockTitle,
  DockDescription,
} from "@/components/ui/dock";

type Side = "left" | "right" | "top" | "bottom";

export function FloatDockBase() {
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
            variant="outline"
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
        isFloat
      >
        <DockHeader>
          <DockTitle className="capitalize">{dockSide}</DockTitle>
          <DockDescription>
            The <strong>floating</strong> dock will go from the {dockSide} side.
          </DockDescription>
        </DockHeader>
      </DockContent>
    </div>
  );
}

export const FloatDockCode = `"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DockContent,
  DockHeader,
  DockTitle,
  DockDescription,
} from "@/components/ui/dock";

type Side = "left" | "right" | "top" | "bottom";

export function FloatDock() {
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
            variant="outline"
          >
            {side}
          </Button>
        ))}
      </div>

      <DockContent
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        side={dockSide}
        isFloat
      >
        <DockHeader>
          <DockTitle className="capitalize">{dockSide}</DockTitle>
          <DockDescription>
            The <strong>floating</strong> dock will go from the {dockSide} side.
          </DockDescription>
        </DockHeader>
      </DockContent>
    </div>
  );
}
`;
