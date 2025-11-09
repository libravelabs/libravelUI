"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipContentProps,
} from "@/components/ui/core/tooltip";

const variants: TooltipContentProps["variant"][] = [
  "default",
  "inverse",
  "destructive",
  "success",
  "warning",
  "info",
];

export default function TooltipVariants() {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6 **:[button]:w-full">
      {variants.map((variant) => (
        <Tooltip key={variant}>
          <TooltipTrigger className="capitalize" variant="outline">
            {variant}
          </TooltipTrigger>
          <TooltipContent variant={variant} className="capitalize">
            {variant} Tooltip
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
