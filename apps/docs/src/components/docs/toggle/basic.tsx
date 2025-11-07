"use client";

import { Toggle } from "@/components/ui/toggle";

export default function BasicToggle() {
  return (
    <Toggle>
      {({ isSelected }) => <>{isSelected ? "Diselect" : "Select"}</>}
    </Toggle>
  );
}
