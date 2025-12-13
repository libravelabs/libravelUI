"use client";

import { Button } from "@/components/ui/core/button";
import { ArrowRight, Check, Play, Plus } from "lucide-react";
import { useState } from "react";

export default function WithIconButton() {
  const [clicked, setClicked] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    if (loading) return;

    setLoading(true);

    setTimeout(() => {
      setClicked((prev) => !prev);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <Button tone="secondary" className="w-full max-w-40">
        <Play /> Play
      </Button>
      <Button tone="outline" className="w-full max-w-40">
        More Info <ArrowRight />
      </Button>
      <Button iconOnly tone="outline" onPress={handleClick} isLoading={loading}>
        {clicked ? <Check /> : <Plus />}
      </Button>
    </div>
  );
}
