"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/core/tooltip";

export default function BasicTooltip() {
  return (
    <Tooltip>
      <TooltipTrigger tone="outline">Settings</TooltipTrigger>
      <TooltipContent>
        <strong className="font-semibold">Workspace settings</strong>
        <p className="mt-1 max-w-[240px] text-pretty text-muted-foreground text-sm leading-snug">
          Customize workspace behavior, themes, and integrations.
        </p>
      </TooltipContent>
    </Tooltip>
  );
}
