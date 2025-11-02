"use client";

import { Input } from "@/components/ui/field";

export default function ErrorInput() {
  return (
    <Input
      id="error"
      label="Email"
      placeholder="Enter your email"
      error="Email is invalid"
      className="w-72"
    />
  );
}
