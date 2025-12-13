"use client";

import { Button } from "@/components/ui/core/button";
import { HighlightedText } from "@/components/ui/motion/highlighted-text";
import { Particles } from "@/components/ui/motion/particles";

export default function BasicParticles() {
  return (
    <div className="relative w-full h-[360px] bg-background border rounded-xl overflow-hidden">
      <Particles
        className="opacity-50"
        particleCount={500}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center justify-center text-center gap-4 px-4 sm:px-6">
        <h1 className="font-bold text-3xl leading-tight">
          {`I'm Driving Through the `}
          <HighlightedText>Stars</HighlightedText>
        </h1>
      </div>
    </div>
  );
}
