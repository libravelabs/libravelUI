"use client";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverTitle,
  PopoverDescription,
} from "@/components/ui/popover";
import { Bell } from "lucide-react";

export function BasicPopoverBase() {
  return (
    <Popover>
      <PopoverTrigger size="icon">
        <Bell />
      </PopoverTrigger>
      <PopoverContent withArrow className="p-4">
        <PopoverTitle>Notifications</PopoverTitle>
        <PopoverDescription>
          You are all caught up. Good job!
        </PopoverDescription>
      </PopoverContent>
    </Popover>
  );
}

export const BasicPopoverCode = `"use client";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverTitle,
  PopoverDescription,
} from "@/components/ui/popover";
import { Bell } from "lucide-react";

export function BasicPopover() {
  return (
    <Popover>
      <PopoverTrigger size="icon">
        <Bell />
      </PopoverTrigger>
      <PopoverContent withArrow className="p-4">
        <PopoverTitle>Notifications</PopoverTitle>
        <PopoverDescription>
          You are all caught up. Good job!
        </PopoverDescription>
      </PopoverContent>
    </Popover>
  );
}
`;
