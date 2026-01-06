import { useState } from "react";
import {
  ToggleGroup,
  ToggleItem,
  type ToggleGroupProps,
} from "@/components/ui/core/toggle-group";
import { Switch } from "@/components/ui/core/switch";
import { useDynamicCode } from "@/components/playground-context";
import { Label } from "@/components/ui/core/field";
import { Select } from "@/components/ui/core/select";

const sizes: { id: string; label: string }[] = [
  { id: "sm", label: "Small" },
  { id: "md", label: "Default" },
  { id: "lg", label: "Large" },
  { id: "xl", label: "Extra Large" },
];

export default function ButtonDemo() {
  const [selectionMode, setSelectionMode] = useState<"single" | "multiple">(
    "multiple"
  );
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">(
    "horizontal"
  );
  const [size, setSize] = useState<ToggleGroupProps["size"]>("md");
  const [isDisabled, setIsDisabled] = useState(false);

  useDynamicCode({ selectionMode, orientation, size, isDisabled });

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="grid gap-2">
        <Label>Selection Mode</Label>
        <ToggleGroup
          selectionMode="single"
          selectedKeys={new Set([selectionMode])}
          onSelectionChange={(key) =>
            setSelectionMode(key.values().next().value as "single" | "multiple")
          }
        >
          <ToggleItem id="single">Single</ToggleItem>
          <ToggleItem id="multiple">Multiple</ToggleItem>
        </ToggleGroup>
      </div>

      <div className="grid gap-2">
        <Label>Orientation</Label>
        <ToggleGroup
          selectionMode="single"
          selectedKeys={new Set([orientation])}
          onSelectionChange={(key) =>
            setOrientation(
              key.values().next().value as "horizontal" | "vertical"
            )
          }
        >
          <ToggleItem id="horizontal">Horizontal</ToggleItem>
          <ToggleItem id="vertical">Vertical</ToggleItem>
        </ToggleGroup>
      </div>

      <Select
        label="Size"
        items={sizes}
        selectedKey={size}
        onSelectionChange={(key) => setSize(key as ToggleGroupProps["size"])}
      />

      <Switch
        isSelected={isDisabled}
        onChange={setIsDisabled}
        label="Is Disabled"
      />
    </div>
  );
}
