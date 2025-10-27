"use client";

import { useState } from "react";
import { CheckboxGroup } from "@/components/ui/checkbox-group";
import { Checkbox } from "@/components/ui/checkbox";

export default function ControlledCheckboxGroup() {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleChange = (value: string) => {
    setSelectedValues((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return (
    <div className="space-y-4">
      <CheckboxGroup label="Choose your favorite fruits">
        <Checkbox
          value="apple"
          label="Apple"
          isSelected={selectedValues.includes("apple")}
          onChange={() => handleChange("apple")}
        />
        <Checkbox
          value="banana"
          label="Banana"
          isSelected={selectedValues.includes("banana")}
          onChange={() => handleChange("banana")}
        />
        <Checkbox
          value="cherry"
          label="Cherry"
          isSelected={selectedValues.includes("cherry")}
          onChange={() => handleChange("cherry")}
        />
      </CheckboxGroup>

      <p>
        You&apos;ve selected:{" "}
        <strong>
          {selectedValues.length > 0 ? selectedValues.join(", ") : "none"}
        </strong>
      </p>
    </div>
  );
}
