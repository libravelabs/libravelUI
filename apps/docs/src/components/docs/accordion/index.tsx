"use client";

import { Playground } from "@/components/playground";

import { AccordionBasicCode, AccordionBasicBase } from "./accordion-basic";
import { AccordionVariantsBase } from "./accordion-variants";
import { getVariantsCode } from "./accordion-variants";
import { useState } from "react";
import { type AccordionProps } from "@/components/ui/accordion";

export function AccordionBasic() {
  return (
    <Playground preview={<AccordionBasicBase />} code={AccordionBasicCode} />
  );
}

export function AccordionVariants() {
  const [variant, setVariant] = useState<AccordionProps["variant"]>("default");
  const [size, setSize] = useState<AccordionProps["size"]>("sm");

  return (
    <Playground
      preview={
        <AccordionVariantsBase
          variant={variant}
          size={size}
          onVariantChange={setVariant}
          onSizeChange={setSize}
        />
      }
      code={getVariantsCode({ variant, size })}
    />
  );
}
