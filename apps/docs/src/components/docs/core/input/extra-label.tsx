"use client";

import { Input } from "@/components/ui/core/field";

export default function LabelExtraInput() {
  return (
    <Input
      id="label-extra"
      label="Password"
      type="password"
      labelExtra={
        <a
          href="#"
          className="text-sm underline decoration-primary decoration-[0.1rem] opacity-100 hover:opacity-80"
        >
          Forgot passsword?
        </a>
      }
      placeholder="it's a secret..."
      className="w-72"
    />
  );
}
