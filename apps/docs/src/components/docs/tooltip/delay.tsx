"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

export default function DelayTooltip() {
  return (
    <Tooltip delay={0}>
      <TooltipTrigger variant="outline">
        <Info />
      </TooltipTrigger>
      <TooltipContent className="max-w-72 text-justify">
        In July 2021, Bob Odenkirk suffered a near-fatal heart attack on the set
        of the 6th and final season shoot of Better Call Saul (2015 - 2022).
      </TooltipContent>
    </Tooltip>
  );
}
