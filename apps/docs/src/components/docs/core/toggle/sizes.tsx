"use client";

import { Separator } from "@/components/ui/core/separator";
import { Toggle } from "@/components/ui/core/toggle";
import { Pin, PinOff } from "lucide-react";

export default function ToggleSizes() {
  return (
    <div>
      <div className="flex items-center gap-2">
        <Toggle variant="outline" size="sm">
          Small
        </Toggle>
        <Toggle variant="outline" size="md">
          Medium
        </Toggle>
        <Toggle variant="outline" size="lg">
          Large
        </Toggle>
        <Toggle variant="outline" size="xl">
          Extra Large
        </Toggle>
      </div>
      <Separator className="my-2" />
      <div className="flex items-center gap-2">
        <Toggle variant="outline" size="sm" isIconOnly>
          {({ isSelected }) => <>{isSelected ? <PinOff /> : <Pin />}</>}
        </Toggle>
        <Toggle variant="outline" size="md" isIconOnly>
          {({ isSelected }) => <>{isSelected ? <PinOff /> : <Pin />}</>}
        </Toggle>
        <Toggle variant="outline" size="lg" isIconOnly>
          {({ isSelected }) => <>{isSelected ? <PinOff /> : <Pin />}</>}
        </Toggle>
        <Toggle variant="outline" size="xl" isIconOnly>
          {({ isSelected }) => <>{isSelected ? <PinOff /> : <Pin />}</>}
        </Toggle>
      </div>
    </div>
  );
}
