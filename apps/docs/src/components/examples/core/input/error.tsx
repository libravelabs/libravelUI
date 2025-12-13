"use client";

import { Input } from "@/components/ui/core/input";

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
