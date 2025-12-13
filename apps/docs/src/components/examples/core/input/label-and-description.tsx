"use client";

import { Description, Label } from "@/components/ui/core/field";
import { Input } from "@/components/ui/core/input";

export default function LabelDescrpitionInput() {
  return (
    <div className="grid gap-1 w-72">
      <Label htmlFor="phone-number">Phone Number</Label>
      <Input id="phone-number" placeholder="Enter your phone number" />
      <Description>We’ll never share your number</Description>
    </div>
  );
}
