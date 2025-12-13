"use client";

import { Input } from "@/components/ui/core/input";
import { Label } from "@/components/ui/core/field";

export default function BasicInput() {
  return (
    <div className="grid gap-4 w-72">
      <div className="grid gap-1">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="text" placeholder="email@example.com" />
      </div>

      <div className="grid gap-1">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" placeholder="it's a secret..." />
      </div>
    </div>
  );
}
