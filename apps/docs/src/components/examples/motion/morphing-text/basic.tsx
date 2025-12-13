"use client";

import { useState, useEffect } from "react";
import { MorphingText } from "@/components/ui/motion/morphing-text";

const words = ["Hello, World!", "Halo Dunia!", "¡Hola Mundo!"];

export default function BasicMorphingText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <MorphingText
      as="h1"
      className="text-5xl sm:text-6xl font-bold tracking-tight"
    >
      {words[index]}
    </MorphingText>
  );
}
