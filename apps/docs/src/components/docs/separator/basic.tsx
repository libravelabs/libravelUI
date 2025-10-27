"use client";

import { Separator } from "@/components/ui/separator";

export default function BasicSeparator() {
  return (
    <div className="flex flex-col justify-center items-center w-full gap-4">
      <Separator className="border-foreground" />
      <Separator orientation="vertical" className="h-42 bg-foreground" />
    </div>
  );
}
