"use client";

import { Button, type ButtonProps } from "@/components/ui/core/button";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { useState } from "react";

export default function ButtonSizes() {
  const [clicked, setClicked] = useState<boolean[]>(Array(6).fill(false));

  const toggleClicked = (index: number) => {
    setClicked((prev) => prev.map((val, i) => (i === index ? !val : val)));
  };

  return (
    <div className="flex items-center gap-4">
      <Button size="xs">Extra small</Button>
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>

      {["xs", "sm", "default", "lg", "xl", "2xl"].map((size, i) => (
        <Button
          key={size}
          size={size as ButtonProps["size"]}
          iconOnly
          onClick={() => toggleClicked(i)}
        >
          <Heart
            className={cn(clicked[i] ? "fill-primary-foreground" : "fill-none")}
          />
        </Button>
      ))}
    </div>
  );
}
