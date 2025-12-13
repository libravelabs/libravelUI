"use client";

import { AnimatedText } from "@/components/ui/motion/animated-text";

export default function PerLineAnimatedText() {
  return (
    <AnimatedText
      per="line"
      preset="blur"
      speedReveal={0.5}
      className="text-center"
    >
      {`
    The first computer programmer was a woman named Ada Lovelace.
    She wrote the first algorithm intended for a machine in the 1800s.
    Today, she's considered a pioneer of modern computing.
`}
    </AnimatedText>
  );
}
