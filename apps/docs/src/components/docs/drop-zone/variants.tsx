"use client";

import { useState } from "react";
import { DropZone, type DropZoneProps } from "@/components/ui/drop-zone";
import { Select } from "@/components/ui/select";

export default function DropZoneVariants() {
  const [variant, setVariant] = useState<DropZoneProps["variant"]>("dashed");
  const [size, setSize] = useState<DropZoneProps["size"]>("md");

  return (
    <section className="flex flex-col gap-4 w-full min-h-48">
      <div className="flex flex-wrap gap-2">
        <Select
          items={[
            { id: "default", label: "Default" },
            { id: "dashed", label: "Dashed" },
            { id: "ghost", label: "Ghost" },
          ]}
          selectedKey={variant}
          onSelectionChange={(key) =>
            setVariant(key as DropZoneProps["variant"])
          }
          classNames={{ trigger: "min-w-32", content: "min-w-32" }}
          aria-label="Select DropZone Variant"
        />

        <Select
          items={[
            { id: "xs", label: "XS" },
            { id: "sm", label: "SM" },
            { id: "md", label: "MD" },
            { id: "lg", label: "LG" },
            { id: "xl", label: "XL" },
            { id: "2xl", label: "2XL" },
            { id: "3xl", label: "3XL" },
            { id: "4xl", label: "4XL" },
            { id: "5xl", label: "5XL" },
            { id: "6xl", label: "6XL" },
            { id: "7xl", label: "7XL" },
            { id: "full", label: "Full" },
          ]}
          selectedKey={size}
          onSelectionChange={(key) => setSize(key as DropZoneProps["size"])}
          classNames={{ trigger: "min-w-32", content: "min-w-32" }}
          aria-label="Select DropZone Size"
        />
      </div>

      <DropZone variant={variant} size={size} className="m-auto">
        Hit us with your best shot!
      </DropZone>
    </section>
  );
}

export function getDropZoneVariantsCode({
  variant,
  size,
}: {
  variant: DropZoneProps["variant"];
  size: DropZoneProps["size"];
}) {
  return `"use client";

import { DropZone } from "@/components/ui/drop-zone";

export function DropZoneVariants() {
  return (
    <DropZone variant="${variant}" size="${size}">
      Hit us with your best shot!
    </DropZone>
  );
}`;
}
