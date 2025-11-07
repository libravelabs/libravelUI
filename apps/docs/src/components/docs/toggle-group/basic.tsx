"use client";

import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleItem } from "@/components/ui/toggle-group";
import { Bold, Italic, Underline } from "lucide-react";
import { useState } from "react";

export default function BasicToggleGroup() {
  const [multiple, setMultiple] = useState<boolean>(false);

  return (
    <div className="grid gap-4">
      <Switch
        label={multiple ? "Multiple selection" : "Single selection"}
        isSelected={multiple}
        onChange={setMultiple}
      />
      <ToggleGroup selectionMode={multiple ? "multiple" : "single"}>
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
    </div>
  );
}
