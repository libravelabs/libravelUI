"use client";

import { DropZone, type DropZoneProps } from "@/components/ui/core/drop-zone";
import { useState } from "react";

const tones: { value: string; label: string }[] = [
  { value: "default", label: "Default" },
  { value: "dashed", label: "Dashed" },
  { value: "ghost", label: "Ghost" },
];

const sizes: { value: string; label: string }[] = [
  { value: "xs", label: "Extra Small" },
  { value: "sm", label: "Small" },
  { value: "md", label: "Medium" },
  { value: "lg", label: "Large" },
  { value: "xl", label: "Extra Large" },
  { value: "2xl", label: "2XL" },
  { value: "3xl", label: "3XL" },
  { value: "4xl", label: "4XL" },
  { value: "5xl", label: "5XL" },
  { value: "6xl", label: "6XL" },
  { value: "7xl", label: "7XL" },
  { value: "full", label: "Full" },
];

export default function DropZoneTones({
  tone = "default",
  size = "md",
}: DropZoneProps) {
  const [dropped, setDropped] = useState(false);

  return (
    <DropZone
      onDrop={() => setDropped(true)}
      tone={tone}
      size={size}
      className="m-auto"
    >
      {dropped ? "Not that easy, bro!" : "Hit us with your best shot!"}
    </DropZone>
  );
}

export const controls = {
  tone: {
    type: "select",
    options: tones,
    defaultValue: "default",
    label: "Tone",
  },
  size: {
    type: "select",
    options: sizes,
    defaultValue: "md",
    label: "Size",
  },
};
