"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

export function ControlledCheckboxBase() {
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

export const ControlledCheckboxCode = `"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

export function ControlledCheckbox() {
  const [selected, setSelected] = useState(false);

  return (
    <div className="space-y-2">
      <Checkbox isSelected={selected} onChange={setSelected} />
      <p>
        You have <strong>{selected ? "enabled" : "disabled"}</strong> the
        option.
      </p>
    </div>
  );
}
`;
