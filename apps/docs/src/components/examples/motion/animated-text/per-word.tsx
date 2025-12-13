"use client";

import { AnimatedText } from "@/components/ui/motion/animated-text";

export default function PerWordAnimatedText() {
  return (
    <AnimatedText per="word" as="h3" preset="blur">
      {`"Sneezes can spread aerosol particles several meters away, not just droplets."`}
    </AnimatedText>
  );
}
