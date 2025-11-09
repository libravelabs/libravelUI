"use client";

import type { TooltipProps } from "react-aria-components";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/core/tooltip";

const placements: TooltipProps["placement"][] = [
  "bottom",
  "top",
  "left",
  "start",
  "right",
  "end",
];

export default function PlacementTooltip() {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6 **:[button]:w-full">
      {placements.map((placement, idx) => (
        <Tooltip key={idx}>
          <TooltipTrigger
            variant="outline"
            className="mx-auto capitalize"
            size="sm"
          >
            {placement}
          </TooltipTrigger>
          <TooltipContent placement={placement}>
            Tooltip shown at <strong>{placement}</strong>.
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
