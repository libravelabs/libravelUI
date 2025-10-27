"use client";

import { TextField } from "@/components/ui/text-field";

export default function StartEndContentTextField() {
  return (
    <TextField
      aria-label="Name"
      label="Name"
      placeholder="Travis Bickle"
      className="max-w-64"
    />
  );
}
