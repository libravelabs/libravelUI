"use client";

import { HighlightedText } from "@/components/ui/motion/highlighted-text";

export default function BasicHighlightedText() {
  return (
    <h1 className="text-4xl font-bold">
      Beautifully <HighlightedText>Highlighted</HighlightedText> Text
    </h1>
  );
}
