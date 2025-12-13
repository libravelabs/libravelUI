"use client";

import { Input, InputGroup } from "@/components/ui/core/input";
import { Info, User2, Sparkles } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/core/tooltip";

export default function StartEndContentInput() {
  return (
    <div className="grid gap-4 w-full max-w-xs">
      <Input
        id="start-content"
        type="text"
        placeholder="Ask AI..."
        startContent={<Sparkles />}
      />
      <Input
        id="start-text-content"
        startContent="https://"
        endContent=".org"
        type="url"
      />

      <InputGroup>
        <User2 />
        <Input
          id="start-end-content"
          type="text"
          placeholder="Hover the info icon for more help."
        />
        <Tooltip>
          <TooltipTrigger tone="unstyled" className="cursor-help">
            <Info />
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            This is InputGroup component. It supports start and end content,
            with the Input positioned in between.
          </TooltipContent>
        </Tooltip>
      </InputGroup>
    </div>
  );
}
