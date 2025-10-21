"use client";

import { Playground } from "@/components/playground";
import { BasicDropZoneBase, BasicDropZoneCode } from "./basic-drop-zone";
import { useState } from "react";
import { DropZoneProps } from "@/components/ui/drop-zone";
import {
  DropZoneVariantsBase,
  getDropZoneVariantsCode,
} from "./drop-zone-variants";

export function BasicDropZone() {
  return (
    <Playground preview={<BasicDropZoneBase />} code={BasicDropZoneCode} />
  );
}

export function DropZoneVariants() {
  const [variant, setVariant] = useState<DropZoneProps["variant"]>("dashed");
  const [size, setSize] = useState<DropZoneProps["size"]>("md");

  return (
    <Playground
      preview={
        <DropZoneVariantsBase
          variant={variant}
          size={size}
          onVariantChange={setVariant}
          onSizeChange={setSize}
        />
      }
      code={getDropZoneVariantsCode({ variant, size })}
    />
  );
}
