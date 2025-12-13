"use client";

import { useState, useEffect } from "react";
import { MorphingText } from "@/components/ui/motion/morphing-text";
import { Badge } from "@/components/ui/core/badge";

export default function WithBadgeMorphingText() {
  const statuses = ["Draft", "Pending", "Approved", "Rejected"];
  const tones = ["secondary", "warning", "success", "destructive"] as const;

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % statuses.length);
    }, 1500);
    return () => clearInterval(interval);
  }, [statuses.length]);

  return (
    <Badge tone={tones[index]}>
      <MorphingText as="span" className="font-medium">
        {statuses[index]}
      </MorphingText>
    </Badge>
  );
}
