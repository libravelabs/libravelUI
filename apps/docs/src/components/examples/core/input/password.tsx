"use client";

import { Input } from "@/components/ui/core/input";

export default function PasswordInput() {
  return (
    <Input
      id="password-example"
      type="password"
      placeholder="it's a secret..."
      className="w-72"
    />
  );
}
