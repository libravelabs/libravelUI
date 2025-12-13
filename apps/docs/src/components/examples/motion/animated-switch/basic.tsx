"use client";

import { useState } from "react";
import { AnimatedSwitch } from "@/components/ui/motion/animated-switch";

export default function BasicAnimatedSwitch() {
  const [controlled, setControlled] = useState<boolean>(false);

  return (
    <div className="m-auto">
      <AnimatedSwitch
        value={controlled}
        onValueChange={() => setControlled((s) => !s)}
      />
    </div>
  );
}
