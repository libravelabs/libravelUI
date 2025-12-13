import { Particles } from "@/components/ui/motion/particles";
import { TypewritingText } from "@/components/ui/motion/typewriting-text";

export default function NotFound() {
  return (
    <div className="relative w-full h-screen">
      <Particles
        particleCount={200}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
      />

      <div className="absolute inset-0 flex flex-col gap-4 items-center justify-center bg-transparent font-mono">
        <TypewritingText className="text-4xl">404</TypewritingText>
        <TypewritingText>
          Sorry, the page you are looking for could not be found.
        </TypewritingText>
      </div>
    </div>
  );
}
