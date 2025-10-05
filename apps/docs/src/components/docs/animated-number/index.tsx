"use client";

import { AnimatedNumber } from "@/components/ui/animated-number";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

export function BasicDialog() {
  const [value, setValue] = useState<number>(0);

  return (
    <div className="flex items-center gap-4">
      <Button
        size="icon"
        variant="outline"
        onClick={() => setValue((prev) => prev - 10)}
      >
        <Minus />
      </Button>
      <AnimatedNumber value={value} />
      <Button
        size="icon"
        variant="outline"
        onClick={() => setValue((prev) => prev + 10)}
      >
        <Plus />
      </Button>
    </div>
  );
}
