"use client";

import { Button, type ButtonProps } from "@/components/ui/core/button";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";

export default function BasicButton({
  tone = "default",
  size = "default",
  radius = "md",
  iconOnly = false,
  isDisabled = false,
  isLoading = false,
}: ButtonProps) {
  return (
    <Button
      tone={tone}
      size={size}
      radius={radius}
      iconOnly={iconOnly}
      isDisabled={isDisabled}
      isLoading={isLoading}
      onPress={() => toast.info("Pressed", { position: "top-center" })}
    >
      {iconOnly ? <ArrowRight /> : "Button"}
    </Button>
  );
}
