"use client";

import { RollingText } from "@/components/ui/motion/rolling-text";
import { Music } from "lucide-react";
import { useState } from "react";

export default function OnIndexChangeRollingText() {
  const [direction, setDirection] = useState(-1);

  return (
    <div className="text-sm">
      <Music size={12} className="mr-1 inline-block" />{" "}
      <RollingText
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 19,
          mass: 1.2,
        }}
        interval={2.5}
        onIndexChange={(index) => {
          setDirection(index === 0 ? -1 : 1);
        }}
        variants={{
          initial: {
            y: -direction * 20,
            rotateX: -direction * 90,
            opacity: 0,
            filter: "blur(4px)",
          },
          animate: {
            y: 0,
            rotateX: 0,
            opacity: 1,
            filter: "blur(0px)",
          },
          exit: {
            y: -direction * 20,
            rotateX: -direction * 90,
            opacity: 0,
            filter: "blur(4px)",
          },
        }}
      >
        <span>Over the Hills and Far Away</span>
        <span>The Rain Song</span>
      </RollingText>
      ・Led Zeppelin
    </div>
  );
}
