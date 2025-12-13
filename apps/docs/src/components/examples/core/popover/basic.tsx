"use client";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverTitle,
  PopoverDescription,
} from "@/components/ui/core/popover";
import { Bell } from "lucide-react";

export default function BasicPopover() {
  return (
    <Popover>
      <PopoverTrigger iconOnly>
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
