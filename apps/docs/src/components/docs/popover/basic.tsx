"use client";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverTitle,
  PopoverDescription,
} from "@/components/ui/popover";
import { Bell } from "lucide-react";

export default function BasicPopover() {
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
