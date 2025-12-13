"use client";

import { AnimatedText } from "@/components/ui/motion/animated-text";

export default function PresetAnimatedText() {
  return (
    <AnimatedText per="word" as="span" preset="slide">
      Honey never spoils — archaeologists have found edible honey in ancient
      tombs.
    </AnimatedText>
  );
}
