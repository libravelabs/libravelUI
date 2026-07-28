"use client";

import { Input } from "@/components/ui/core/input";
import { Label } from "@/components/ui/core/field";
import { NumberField, NumberInput } from "@/components/ui/core/number-field";
import { Select } from "@/components/ui/core/select";
import { Switch } from "@/components/ui/core/switch";
import { Textarea } from "@/components/ui/core/text-area";
import { TextField } from "@/components/ui/core/text-field";
import { ToggleGroup, ToggleItem } from "@/components/ui/core/toggle-group";

import type { StoryBookControl } from "./types";

type StoryBookControlProps = {
  name: string;
  control: StoryBookControl;
  value: unknown;
  onChange: (value: unknown) => void;
};

export function StoryBookControlField({
  name,
  control,
  value,
  onChange,
}: StoryBookControlProps) {
  const label = control.label ?? name;

  switch (control.type) {
    case "select":
      return (
        <Select
          label={label}
          selectedKey={value as string | number}
          onSelectionChange={(key) => onChange(key ?? "")}
          items={control.options.map((option) => ({
            id: option.value,
            label: option.label,
          }))}
        />
      );

    case "toggle-group":
      return (
        <div className="flex flex-col gap-2">
          <Label className="capitalize">{label}</Label>
          <ToggleGroup
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={new Set([value as string | number])}
            onSelectionChange={(selected) => {
              const selectedValue = selected.values().next().value;
              if (selectedValue !== undefined) {
                onChange(selectedValue);
              }
            }}
          >
            {control.options.map((item) => (
              <ToggleItem key={item.value} id={item.value}>
                {item.label}
              </ToggleItem>
            ))}
          </ToggleGroup>
        </div>
      );

    case "boolean":
      return (
        <div className="flex items-center justify-between">
          <Switch
            isSelected={Boolean(value)}
            onChange={(checked) => onChange(checked)}
          >
            {label}
          </Switch>
        </div>
      );

    case "text":
      return (
        <TextField
          value={String(value ?? "")}
          onChange={(val) => onChange(val)}
        >
          <Label className="capitalize">{label}</Label>
          <Input placeholder={control.placeholder} />
        </TextField>
      );

    case "textarea":
      return (
        <TextField
          value={String(value ?? "")}
          onChange={(val) => onChange(val)}
        >
          <Label className="capitalize">{label}</Label>
          <Textarea placeholder={control.placeholder} />
        </TextField>
      );

    case "number":
      return (
        <NumberField
          value={Number(value ?? 0)}
          onChange={(val) => onChange(Number.isNaN(val) ? 0 : val)}
          minValue={control.min}
          maxValue={control.max}
        >
          <Label className="capitalize">{label}</Label>
          <NumberInput placeholder={control.placeholder} />
        </NumberField>
      );

    default:
      return null;
  }
}
