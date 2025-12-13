"use client";

import { DropZone, type DropZoneProps } from "@/components/ui/core/drop-zone";

export default function DropZoneTones({
  tone = "dashed",
  size = "md",
}: DropZoneProps) {
  return (
    <DropZone tone={tone} size={size} className="m-auto">
      Hit us with your best shot!
    </DropZone>
  );
}
