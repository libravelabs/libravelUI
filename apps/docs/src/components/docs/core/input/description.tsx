"use client";

import { Input } from "@/components/ui/core/field";

export default function DescrpitionInput() {
  return (
    <Input
      id="phone-number"
      label="Phone number"
      placeholder="Enter your phone number"
      description="We'll never share your number"
      className="w-72"
    />
  );
}
