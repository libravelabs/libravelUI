"use client";

import { Badge } from "@/components/ui/core/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/core/tooltip";

export default function WithoutArrowTooltip() {
  return (
    <Tooltip>
      <TooltipTrigger tone="unstyled">
        <Badge tone="info">Settings</Badge>
      </TooltipTrigger>
      <TooltipContent showArrow={false} tone="info">
        Customize workspace behavior, themes, and integrations.
      </TooltipContent>
    </Tooltip>
  );
}
