"use client";

import { NumberField } from "@/components/ui/number-field";

export default function FormatOptionsNumberField() {
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
        className="max-w-72"
      />
    </section>
  );
}
