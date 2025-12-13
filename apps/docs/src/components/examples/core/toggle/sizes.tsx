"use client";

import { Separator } from "@/components/ui/core/separator";
import { Toggle } from "@/components/ui/core/toggle";
import { Pin, PinOff } from "lucide-react";

export default function ToggleSizes() {
  return (
    <div>
      <div className="flex items-center gap-2">
        <Toggle tone="outline" size="sm">
          Small
        </Toggle>
        <Toggle tone="outline" size="default">
          Default
        </Toggle>
        <Toggle tone="outline" size="lg">
          Large
        </Toggle>
        <Toggle tone="outline" size="xl">
          Extra Large
        </Toggle>
      </div>
      <Separator className="my-2" />
      <div className="flex items-center gap-2">
        <Toggle tone="outline" iconOnly size="sm">
          {({ isSelected }) => <>{isSelected ? <PinOff /> : <Pin />}</>}
        </Toggle>
        <Toggle tone="outline" iconOnly>
          {({ isSelected }) => <>{isSelected ? <PinOff /> : <Pin />}</>}
        </Toggle>
        <Toggle tone="outline" iconOnly size="lg">
          {({ isSelected }) => <>{isSelected ? <PinOff /> : <Pin />}</>}
        </Toggle>
        <Toggle tone="outline" iconOnly size="xl">
          {({ isSelected }) => <>{isSelected ? <PinOff /> : <Pin />}</>}
        </Toggle>
      </div>
    </div>
  );
}
