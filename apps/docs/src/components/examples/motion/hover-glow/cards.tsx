"use client";

import { HoverGlow } from "@/components/ui/motion/hover-glow";
import {
  Code2,
  Database,
  Layers,
  Rocket,
  Zap,
  Globe,
  Palette,
  Cpu,
  Cloud,
} from "lucide-react";

const icons = [
  Code2,
  Database,
  Layers,
  Rocket,
  Zap,
  Globe,
  Palette,
  Cpu,
  Cloud,
];

export default function GlowCards() {
  return (
    <div className="group relative isolate hidden w-full overflow-hidden xl:block">
      <div className="h-full">
        <HoverGlow className="bg-accent" />
        <div className="relative isolate grid md:grid-cols-3 gap-6 overflow-hidden rounded-lg p-6">
          <div className="absolute top-0 bottom-0 left-0 z-40 h-full w-80 bg-gradient-to-r from-background via-background to-transparent"></div>
          <div className="absolute top-0 bottom-0 right-0 z-40 h-full w-80 bg-gradient-to-l from-background via-background to-transparent"></div>
          <div className="absolute inset-x-0 bottom-0 z-40 h-24 w-full bg-gradient-to-t from-background via-background to-transparent"></div>
          <div className="absolute inset-x-0 top-0 z-40 h-20 w-full bg-gradient-to-b from-background via-background to-transparent"></div>
          <div className="absolute inset-0 z-10 h-full w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-background via-background to-background"></div>

          {icons.map((Icon, i) => (
            <div
              key={i}
              className="relative flex h-28 flex-1 items-center justify-center overflow-hidden rounded-lg border border-foreground/20 z-20 hover:border-foreground transition"
            >
              <Icon className="h-12 w-12 text-foreground" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
