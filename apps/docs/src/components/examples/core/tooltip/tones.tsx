"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipContentProps,
} from "@/components/ui/core/tooltip";

const tones: TooltipContentProps["tone"][] = [
  "default",
  "inverse",
  "destructive",
  "success",
  "warning",
  "info",
];

export default function TooltipTones() {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6 **:[button]:w-full">
      {tones.map((tone) => (
        <Tooltip key={tone}>
          <TooltipTrigger className="capitalize" tone="outline">
            {tone}
          </TooltipTrigger>
          <TooltipContent tone={tone} className="capitalize">
            {tone} Tooltip
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
