"use client";

import { AnimatedText } from "@/components/ui/motion/animated-text";

export default function BasicAnimatedText() {
  return (
    <div className="flex flex-col items-center w-full">
      <AnimatedText>
        {`"I know a guy who knows a guy... who knows another guy."`}
      </AnimatedText>
      <AnimatedText delay={1.5}>
        - Saul Goodman, to Walt (Breaking Bad, S2E11)
      </AnimatedText>
    </div>
  );
}
