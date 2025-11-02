"use client";

import { Input } from "@/components/ui/field";

export default function BasicInput() {
  return (
    <div className="grid gap-4 w-72">
      <Input
        id="email"
        label="Email"
        type="text"
        placeholder="email@example.com"
      />
      <Input
        id="password"
        label="Password"
        type="password"
        placeholder="it's a secret..."
      />
    </div>
  );
}
