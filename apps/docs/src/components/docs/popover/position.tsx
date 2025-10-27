"use client";

import type { PopoverProps } from "react-aria-components";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ArrowDown,
  ArrowUp,
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type Placement = PopoverProps["placement"];
const placements: Placement[] = [
  "bottom",
  "top",
  "left",
  "start",
  "right",
  "end",
];

const arrowIcons: Pick<Placement, React.ReactNode> = {
  bottom: <ArrowDown className="w-5 h-5" />,
  top: <ArrowUp className="w-5 h-5" />,
  left: <ArrowLeft className="w-5 h-5" />,
  start: <ChevronLeft className="w-5 h-5" />,
  right: <ArrowRight className="w-5 h-5" />,
  end: <ChevronRight className="w-5 h-5" />,
};

export default function PopoverPositions() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {placements.map((placement, idx) => (
        <Popover key={idx}>
          <PopoverTrigger
            className="mx-auto"
            size="sm"
            variant="outline"
            radius="md"
          >
            {arrowIcons[placement]}
          </PopoverTrigger>
          <PopoverContent
            className="p-4 max-w-xs"
            placement={placement}
            withArrow
          >
            Popover shown at <strong>{placement}</strong>.
          </PopoverContent>
        </Popover>
      ))}
    </div>
  );
}
