"use client";

import { Input, type InputProps } from "@/components/ui/core/input";

export default function VariantsInput({
  tone = "default",
  size = "default",
  radius = "md",
}: InputProps) {
  return (
    <Input
      tone={tone}
      size={size}
      radius={radius}
      placeholder={`This is ${tone} ${size} ${radius} input`}
    />
  );
}
