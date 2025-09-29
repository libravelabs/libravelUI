"use client";

import { Playground } from "@/components/playground";
import { DisclosureBasicBase, DisclosureBasicCode } from "./disclosure-basic";
import { useState } from "react";
import { DisclosureProps } from "@/components/ui/disclosure";
import {
  DisclosureVariantsBase,
  getDisclosureVariantsCode,
} from "./disclosure-variants";

export function DisclosureBasic() {
  return (
    <Playground preview={<DisclosureBasicBase />} code={DisclosureBasicCode} />
  );
}

export function DisclosureVariants() {
  const [variant, setVariant] = useState<DisclosureProps["variant"]>("default");
  const [size, setSize] = useState<DisclosureProps["size"]>("sm");

  return (
    <Playground
      preview={
        <DisclosureVariantsBase
          variant={variant}
          size={size}
          onVariantChange={setVariant}
          onSizeChange={setSize}
        />
      }
      code={getDisclosureVariantsCode({ variant, size })}
    />
  );
}
