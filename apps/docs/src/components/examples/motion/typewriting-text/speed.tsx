"use client";

import { TypewritingText } from "@/components/ui/motion/typewriting-text";

export default function SpeedTypewritingText() {
  return (
    <TypewritingText speed={20}>
      Float like a Cadillac, sting like a Beemer.
    </TypewritingText>
  );
}
