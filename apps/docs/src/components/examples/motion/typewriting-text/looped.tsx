"use client";

import { TypewritingText } from "@/components/ui/motion/typewriting-text";

export default function LoopedTypewritingText() {
  return (
    <TypewritingText loop>
      The quick brown fox jumps over the lazy dog.
    </TypewritingText>
  );
}
