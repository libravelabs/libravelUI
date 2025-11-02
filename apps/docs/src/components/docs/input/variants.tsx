"use client";

import { Input, type InputProps } from "@/components/ui/field";
import { Select } from "@/components/ui/select";
import { useState } from "react";

const variantItems = [
  { id: "default", label: "default" },
  { id: "destructive", label: "destructive" },
  { id: "ghost", label: "ghost" },
  { id: "line", label: "line" },
];

const sizeItems = [
  { id: "sm", label: "sm" },
  { id: "default", label: "default (md)" },
  { id: "lg", label: "lg" },
  { id: "xl", label: "xl" },
];

const radiusItems = [
  { id: "none", label: "none" },
  { id: "sm", label: "sm" },
  { id: "md", label: "md" },
  { id: "lg", label: "lg" },
  { id: "full", label: "full" },
];

export default function VariantsInput() {
  const [variant, setVariant] = useState(variantItems[0]);
  const [size, setSize] = useState(sizeItems[1]);
  const [radius, setRadius] = useState(radiusItems[2]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Select
          items={variantItems}
          selectedKey={variant.id}
          onSelectionChange={(key) => {
            const selected = variantItems.find((v) => v.id === key);
            if (selected) setVariant(selected);
          }}
          classNames={{ trigger: "min-w-32", content: "min-w-32" }}
          aria-label="Select Input Variant"
        />

        <Select
          items={sizeItems}
          selectedKey={size.id}
          onSelectionChange={(key) => {
            const selected = sizeItems.find((s) => s.id === key);
            if (selected) setSize(selected);
          }}
          classNames={{ trigger: "min-w-32", content: "min-w-32" }}
          aria-label="Select Input Size"
        />

        <Select
          items={radiusItems}
          selectedKey={radius.id}
          onSelectionChange={(key) => {
            const selected = radiusItems.find((r) => r.id === key);
            if (selected) setRadius(selected);
          }}
          classNames={{ trigger: "min-w-32", content: "min-w-32" }}
          aria-label="Select Input Radius"
        />
      </div>

      <Input
        variant={variant.id as unknown as InputProps["variant"]}
        size={size.id as unknown as InputProps["size"]}
        radius={radius.id as unknown as InputProps["radius"]}
        placeholder={`This is ${variant.label} ${size.label} ${radius.label} input`}
      />
    </div>
  );
}
