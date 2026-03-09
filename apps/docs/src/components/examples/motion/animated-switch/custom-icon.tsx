"use client";

import { AnimatedSwitch } from "@/components/ui/motion/animated-switch";
import { Sun, Moon } from "lucide-react";

export default function CustomIconAnimatedSwitch() {
  return (
    <div className="m-auto flex items-center gap-6">
      <AnimatedSwitch onIcon={<Sun />} offIcon={<Moon />} />
      <div className="text-sm">
        <div className="font-medium">Emoji icons</div>
        <div className="text-xs text-muted-foreground">
          Any React node can be used as icon
        </div>
      </div>
    </div>
  );
}
