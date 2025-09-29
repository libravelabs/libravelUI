import { Playground } from "@/components/playground";
import { NumberField } from "@/components/ui/number-field";
import {
  FormatOptionsNumberFieldBase,
  FormatOptionsNumberFieldCode,
} from "./format-options-number-field";
import { ChevronUp, ChevronDown } from "lucide-react";
import { WithFormNumberFieldBase, WithFormNumberFieldCode } from "./with-form";

export function BasicNumberField() {
  return (
    <Playground
      preview={
        <section>
          <NumberField defaultValue={0} />
        </section>
      }
      code={`"use client"

import { NumberField } from "@/components/ui/number-field";

export function BasicNumberField() {
    return <NumberField />
}`}
    />
  );
}

export function FormatOptionsNumberField() {
  return (
    <Playground
      preview={<FormatOptionsNumberFieldBase />}
      code={FormatOptionsNumberFieldCode}
    />
  );
}

export function CustomIndicatorNumberField() {
  return (
    <Playground
      preview={
        <section>
          <NumberField
            indicator={{
              increment: <ChevronUp className="size-4" />,
              decrement: <ChevronDown className="size-4" />,
            }}
          />
        </section>
      }
      code={`"use client";

import { NumberField } from "@/components/ui/number-field";
import { ChevronUp, ChevronDown } from "lucide-react";

export function CustomIndicatorNumberField() {
  return (
    <NumberField
      indicator={{
        increment: <ChevronUp className="size-4" />,
        decrement: <ChevronDown className="size-4" />,
      }}
    />
  );
}
`}
    />
  );
}

export function WithFormNumberField() {
  return (
    <Playground
      preview={<WithFormNumberFieldBase />}
      code={WithFormNumberFieldCode}
    />
  );
}

export function DisabledNumberField() {
  return (
    <Playground
      preview={
        <section>
          <NumberField isDisabled defaultValue={100} />
        </section>
      }
      code={`"use client"
  
  import { NumberField } from "@/components/ui/number-field";
  
  export function DisabledNumberField() {
      return <NumberField isDisabled defaultValue={100} />
  }`}
    />
  );
}
