"use client";

import { usePlayground } from "./playground-context";
import { Select } from "@/components/ui/core/select";
import { Switch } from "@/components/ui/core/switch";
import { Input } from "@/components/ui/core/input";
import { Label } from "@/components/ui/core/field";
import { NumberField, NumberInput } from "@/components/ui/core/number-field";
import { ToggleGroup, ToggleItem } from "@/components/ui/core/toggle-group";
import { TextField } from "@/components/ui/core/text-field";
import { Textarea } from "@/components/ui/core/text-area";

export function Controls() {
  const { controls, values, setValue } = usePlayground();

  if (!controls || Object.keys(controls).length === 0) {
    return (
      <div className="text-sm text-muted-foreground p-4 text-center">
        No controls available
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-1">
      {Object.entries(controls).map(([key, schema]) => {
        const label = schema.label || key;

        switch (schema.type) {
          case "select":
            return (
              <Select
                key={key}
                label={label}
                selectedKey={values[key] as string | number}
                onSelectionChange={(k) => setValue(key, k ?? "")}
                items={(schema.options ?? []).map((opt) => ({
                  id: opt.value,
                  label: opt.label,
                }))}
              />
            );

          case "toggle-group":
            return (
              <div key={key} className="flex flex-col gap-2">
                <Label className="capitalize">{label}</Label>
                <ToggleGroup
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={new Set([values[key] as string | number])}
                  onSelectionChange={(selected) => {
                    const val = selected.values().next().value;
                    if (val !== undefined) setValue(key, val);
                  }}
                >
                  {(schema.options ?? []).map((item) => (
                    <ToggleItem key={item.value} id={item.value}>
                      {item.label}
                    </ToggleItem>
                  ))}
                </ToggleGroup>
              </div>
            );

          case "boolean":
            return (
              <div key={key} className="flex items-center justify-between">
                <Switch
                  isSelected={values[key] as boolean}
                  onChange={(v) => setValue(key, v)}
                >
                  {label}
                </Switch>
              </div>
            );

          case "text":
            return (
              <TextField
                key={key}
                value={(values[key] as string) || ""}
                onChange={(value) => setValue(key, value)}
              >
                <Label className="capitalize">{label}</Label>
                <Input placeholder={schema.placeholder} />
              </TextField>
            );

          case "textarea":
            return (
              <TextField
                key={key}
                value={(values[key] as string) || ""}
                onChange={(value) => setValue(key, value)}
              >
                <Label className="capitalize">{label}</Label>
                <Textarea placeholder={schema.placeholder} />
              </TextField>
            );

          case "number":
            return (
              <NumberField
                key={key}
                value={(values[key] as number) || 0}
                onChange={(val) => {
                  setValue(key, isNaN(val) ? 0 : val);
                }}
                minValue={schema.min}
                maxValue={schema.max}
              >
                <Label className="capitalize">{label}</Label>
                <NumberInput placeholder={schema.placeholder} />
              </NumberField>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
