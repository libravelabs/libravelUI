"use client";

import { Playground } from "@/components/playground";
import { TextField } from "@/components/ui/text-field";
import { SizesTextFieldBase, SizesTextFieldCode } from "./sizes-text-field";
import {
  VariantsTextFieldBase,
  VariantsTextFieldCode,
} from "./variants-text-field";
import { WithFormTextFieldBase, WithFormTextFieldCode } from "./with-form";

export function BasiceTextField() {
  return (
    <Playground
      preview={
        <section className="w-full max-w-72">
          <TextField
            aria-label="Name"
            label="Name"
            placeholder="Travis Bickle"
          />
        </section>
      }
      code={`"use client";

import { TextField } from "@/components/ui/text-field";

export function BasiceTextField() {
  return (
    <TextField aria-label="Name" label="Name" placeholder="Travis Bickle" />
  );
}
`}
    />
  );
}

export function SizesTextField() {
  return (
    <Playground preview={<SizesTextFieldBase />} code={SizesTextFieldCode} />
  );
}

export function VariantsTextField() {
  return (
    <Playground
      preview={<VariantsTextFieldBase />}
      code={VariantsTextFieldCode}
    />
  );
}

export function WithFormTextField() {
  return (
    <Playground
      preview={<WithFormTextFieldBase />}
      code={WithFormTextFieldCode}
    />
  );
}

export function StartEndContentTextField() {
  return (
    <Playground
      preview={
        <section className="w-full max-w-72">
          <TextField
            aria-label="Site"
            label="Site"
            startContent="https://"
            endContent=".com"
          />
        </section>
      }
      code={`"use client";
  
  import { TextField } from "@/components/ui/text-field";
  
  export function StartEndContentTextField() {
    return (
      <TextField aria-label="Name" label="Name" placeholder="Travis Bickle" />
    );
  }
  `}
    />
  );
}
