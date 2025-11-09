"use client";

import { Input } from "@/components/ui/core/field";

export default function PasswordInput() {
  return (
    <Input
      id="password-example"
      label="Password"
      type="password"
      placeholder="it's a secret..."
      className="w-72"
    />
  );
}
