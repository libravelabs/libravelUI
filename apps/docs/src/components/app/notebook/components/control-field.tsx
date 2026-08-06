"use client";

import { Label } from "@/components/ui/core/field";
import { Input } from "@/components/ui/core/input";
import { NumberField, NumberInput } from "@/components/ui/core/number-field";
import { Select } from "@/components/ui/core/select";
import { Switch } from "@/components/ui/core/switch";
import { Textarea } from "@/components/ui/core/text-area";
import { TextField } from "@/components/ui/core/text-field";
import { ToggleGroup, ToggleItem } from "@/components/ui/core/toggle-group";

import type { NotebookControl } from "../types";
import type { Key } from "react-aria-components";

type NotebookControlProps = {
  name: string;
  control: NotebookControl;
  value: unknown;
  onChange: (value: unknown) => void;
};

export function NotebookControlField({
  name,
  control,
  value,
  onChange,
}: NotebookControlProps) {
  const label = control.label ?? name;

  switch (control.type) {
    case "select":
      return (
        <Select
          label={label}
          selectedKey={value as Key}
          onSelectionChange={(key: Key) => onChange(key as Key)}
          items={control.options.map((option) => ({
            id: option.value,
            label: option.label,
          }))}
        />
      );

    case "toggle-group":
      return (
        <div className="flex flex-col">
          <Label className="mb-1.25 capitalize">{label}</Label>
          <ToggleGroup
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={new Set([value as Key])}
            onSelectionChange={(selected) => {
              const nextValue = selected.values().next().value;
              if (nextValue !== undefined) {
                onChange(nextValue as Key);
              }
            }}
          >
            {control.options.map((option) => (
              <ToggleItem key={option.value} id={option.value}>
                {option.label}
              </ToggleItem>
            ))}
          </ToggleGroup>
        </div>
      );

    case "boolean":
      return (
        <div className="flex size-fit items-center justify-between">
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
          onChange={(nextValue) => onChange(nextValue)}
        >
          <Label className="mb-1.25 capitalize">{label}</Label>
          <Input placeholder={control.placeholder} />
        </TextField>
      );

    case "textarea":
      return (
        <TextField
          value={String(value ?? "")}
          onChange={(nextValue) => onChange(nextValue)}
        >
          <Label className="mb-1.25 capitalize">{label}</Label>
          <Textarea placeholder={control.placeholder} />
        </TextField>
      );

    case "number":
      return (
        <NumberField
          value={Number(value ?? 0)}
          onChange={(nextValue) =>
            onChange(Number.isNaN(nextValue) ? 0 : nextValue)
          }
          minValue={control.min}
          maxValue={control.max}
        >
          <Label className="mb-1.25 capitalize">{label}</Label>
          <NumberInput placeholder={control.placeholder} />
        </NumberField>
      );

    default:
      return null;
  }
}
