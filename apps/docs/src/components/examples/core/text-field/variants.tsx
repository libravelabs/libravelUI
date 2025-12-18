"use client";

import { Input, type InputProps } from "@/components/ui/core/input";
import { TextField } from "@/components/ui/core/text-field";

export default function VariantsTextField({
  tone = "default",
  size = "default",
  radius = "md",
}: InputProps) {
  return (
    <TextField className="w-72">
      <Input
        tone={tone}
        size={size}
        radius={radius}
        placeholder={`This is ${tone} ${size} ${radius} text field`}
      />
    </TextField>
  );
}
