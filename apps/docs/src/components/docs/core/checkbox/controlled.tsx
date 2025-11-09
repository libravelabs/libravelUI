"use client";

import { Checkbox } from "@/components/ui/core/checkbox";
import { useState } from "react";

export default function ControlledCheckbox() {
  const [selected, setSelected] = useState(false);

  return (
    <div className="space-y-2">
      <Checkbox
        isSelected={selected}
        onChange={setSelected}
        label="You wanna receive our latest update?"
      />
      <p className="text-sm text-muted-foreground">
        You have <strong>{selected ? "enabled" : "disabled"}</strong> the
        option.
      </p>
    </div>
  );
}
