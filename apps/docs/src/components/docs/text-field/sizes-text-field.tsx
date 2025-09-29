"use client";

import { TextField } from "@/components/ui/text-field";

export function SizesTextFieldBase() {
  return (
    <section className="w-full max-w-72 space-y-4">
      <TextField placeholder="Small size input" size="sm" />
      <TextField placeholder="Default size input" size="default" />
      <TextField placeholder="Large size input" size="lg" />
      <TextField placeholder="Extra large size input" size="xl" />
    </section>
  );
}

export const SizesTextFieldCode = `"use client";

import { TextField } from "@/components/ui/text-field";

export function SizesTextField() {
  return (
    <section className="w-full max-w-72 space-y-4">
      <TextField placeholder="Small size input" size="sm" />
      <TextField placeholder="Default size input" size="default" />
      <TextField placeholder="Large size input" size="lg" />
      <TextField placeholder="Extra large size input" size="xl" />
    </section>
  );
}
`;
