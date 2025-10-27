"use client";

import { TextField } from "@/components/ui/text-field";

export default function VariantsTextField() {
  return (
    <section className="w-full max-w-72 space-y-4">
      <TextField placeholder="Default input variant" variant="default" />
      <TextField
        placeholder="Destructive input variant"
        variant="destructive"
      />
      <TextField placeholder="Ghost input variant" variant="ghost" />
    </section>
  );
}
