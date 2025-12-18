"use client";

import { Input } from "@/components/ui/core/input";
import { TextField } from "@/components/ui/core/text-field";

export default function BasiceTextField() {
  return (
    <TextField className="w-72">
      <Input placeholder="Travis Bickle" />
    </TextField>
  );
}
