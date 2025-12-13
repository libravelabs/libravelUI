"use client";

import { Input, type InputProps } from "@/components/ui/core/input";

export default function VariantsInput({
  variant = "default",
  size = "default",
  radius = "md",
}: InputProps) {
  return (
    <Input
      variant={variant}
      size={size}
      radius={radius}
      placeholder={`This is ${variant} ${size} ${radius} input`}
    />
  );
}
