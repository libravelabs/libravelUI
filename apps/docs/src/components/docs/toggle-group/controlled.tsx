"use client";

import { useState } from "react";
import type { Key } from "react-aria-components";
import { ToggleGroup, ToggleItem } from "@/components/ui/toggle-group";
import { Bold, Italic, Underline } from "lucide-react";

export default function ControlledToggleGroup() {
  const [selected, setSelected] = useState(new Set<Key>(["bold"]));

  return (
    <div className="grid gap-2">
      <ToggleGroup
        selectionMode="multiple"
        selectedKeys={selected}
        onSelectionChange={setSelected}
      >
        <ToggleItem id="bold">
          <Bold />
        </ToggleItem>
        <ToggleItem id="italic">
          <Italic />
        </ToggleItem>
        <ToggleItem id="underline">
          <Underline />
        </ToggleItem>
      </ToggleGroup>
      {[...selected].length > 0 && (
        <p className="text-muted-foreground">
          Selected:{" "}
          <strong className="font-semibold text-foreground">
            {[...selected].join(", ")}
          </strong>
        </p>
      )}
    </div>
  );
}
