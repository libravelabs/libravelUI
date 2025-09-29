"use client";

import { NumberField } from "@/components/ui/number-field";

export function FormatOptionsNumberFieldBase() {
  return (
    <section>
      <NumberField
        minValue={0}
        defaultValue={100}
        formatOptions={{
          style: "currency",
          currency: "EUR",
          currencyDisplay: "code",
          currencySign: "accounting",
        }}
      />
    </section>
  );
}

export const FormatOptionsNumberFieldCode = `"use client";

import { NumberField } from "@/components/ui/number-field";

export function FormatOptionsNumberFieldBase() {
  return (
    <NumberField
      minValue={0}
      defaultValue={100}
      formatOptions={{
        style: "currency",
        currency: "EUR",
        currencyDisplay: "code",
        currencySign: "accounting",
      }}
    />
  );
}
`;
