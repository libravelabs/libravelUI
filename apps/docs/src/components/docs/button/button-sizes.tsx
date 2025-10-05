"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { useState } from "react";

export function ButtonSizesBase() {
  const [clicked, setClicked] = useState<boolean>(false);

  return (
    <div className="flex items-center gap-4">
      <Button size="xs">Extra small</Button>
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon" onClick={() => setClicked(!clicked)}>
        <Heart
          className={cn(
            "size-5",
            clicked ? "fill-primary-foreground" : "fill-none"
          )}
        />
      </Button>
    </div>
  );
}

export const ButtonSizesCode = `"use client";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export function ButtonSizes() {
  return (
    <div className="flex items-center gap-4">
      <Button size="xs">
        Extra small
      </Button>
      <Button size="sm">
        Small
      </Button>
      <Button size="default">
        Default
      </Button>
      <Button size="lg">
        Large
      </Button>
      <Button size="icon">
        <Heart />
      </Button>
    </div>
  );
}
`;
