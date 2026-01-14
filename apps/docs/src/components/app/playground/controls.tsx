"use client";

import { usePlayground } from "./playground-context";
import { Select } from "@/components/ui/core/select";
import { Switch } from "@/components/ui/core/switch";
import { Input } from "@/components/ui/core/input";
import { Label } from "@/components/ui/core/field";
import { NumberField } from "@/components/ui/core/number-field";
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
        if (schema.type === "select" && schema.options) {
          return (
            <Select
              key={key}
              label={schema.label || key}
              selectedKey={values[key] as string | number}
              onSelectionChange={(k) => setValue(key, k ?? "")}
              items={schema.options.map((opt) => ({
                id: opt.value,
                label: opt.label,
              }))}
            />
          );
        }

        if (schema.type === "toggle-group" && schema.options) {
          return (
            <div key={key} className="flex flex-col gap-2">
              <Label className="capitalize">{schema.label || key}</Label>
              <ToggleGroup
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={new Set([values[key] as string | number])}
                onSelectionChange={(selected) => {
                  const val = selected.values().next().value;
                  if (val !== undefined) setValue(key, val);
                }}
              >
                {schema.options.map((item) => (
                  <ToggleItem key={item.value} id={item.value}>
                    {item.label}
                  </ToggleItem>
                ))}
              </ToggleGroup>
            </div>
          );
        }

        if (schema.type === "boolean") {
          return (
            <div key={key} className="flex items-center justify-between">
              <Switch
                isSelected={values[key] as boolean}
                onChange={(v) => setValue(key, v)}
              >
                {schema.label || key}
              </Switch>
            </div>
          );
        }

        if (schema.type === "text") {
          return (
            <div key={key}>
              <TextField
                value={(values[key] as string) || ""}
                onChange={(value) => setValue(key, value)}
              >
                <Label className="capitalize">{schema.label || key}</Label>
                <Input placeholder={schema.placeholder} />
              </TextField>
            </div>
          );
        }

        if (schema.type === "textarea") {
          return (
            <div key={key}>
              <TextField
                value={(values[key] as string) || ""}
                onChange={(value) => setValue(key, value)}
              >
                <Label className="capitalize">{schema.label || key}</Label>
                <Textarea placeholder={schema.placeholder} />
              </TextField>
            </div>
          );
        }

        if (schema.type === "number") {
          return (
            <div key={key} className="grid gap-2">
              <NumberField
                value={(values[key] as number) || 0}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setValue(key, isNaN(val) ? 0 : val);
                }}
                minValue={schema.min}
                maxValue={schema.max}
              >
                <Label className="capitalize">{schema.label || key}</Label>
                <Input placeholder={schema.placeholder} />
              </NumberField>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
