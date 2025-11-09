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
      <TooltipTrigger plain>
        <Badge variant="info">Settings</Badge>
      </TooltipTrigger>
      <TooltipContent showArrow={false} variant="info">
        Customize workspace behavior, themes, and integrations.
      </TooltipContent>
    </Tooltip>
  );
}
