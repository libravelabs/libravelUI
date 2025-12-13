"use client";

import { HighlightedText } from "@/components/ui/motion/highlighted-text";

export default function BasicHighlightedText2() {
  return (
    <p>
      This component adds a subtle animated highlight to any{" "}
      <HighlightedText>inline text</HighlightedText> you place inside it.
    </p>
  );
}
