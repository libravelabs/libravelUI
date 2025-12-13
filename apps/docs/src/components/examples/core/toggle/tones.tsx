"use client";

import { Toggle } from "@/components/ui/core/toggle";

export default function ToggleTones() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Toggle tone="default">
        {({ isSelected }) => <>{isSelected ? "Unselect" : "Default"}</>}
      </Toggle>
      <Toggle tone="outline">
        {({ isSelected }) => <>{isSelected ? "Unselect" : "Outline"}</>}
      </Toggle>
      <Toggle tone="secondary">
        {({ isSelected }) => <>{isSelected ? "Unselect" : "Secondary"}</>}
      </Toggle>
      <Toggle tone="link">
        {({ isSelected }) => <>{isSelected ? "Unselect" : "Link"}</>}
      </Toggle>
      <Toggle tone="destructive">
        {({ isSelected }) => <>{isSelected ? "Unselect" : "Destructive"}</>}
      </Toggle>
    </div>
  );
}
