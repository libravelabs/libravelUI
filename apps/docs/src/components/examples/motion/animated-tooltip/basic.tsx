import { Button } from "@/components/ui/core/button";
import {
  AnimatedTooltip,
  type AnimationStyle,
} from "@/components/ui/motion/animated-tooltip";

const ANIMATIONS: AnimationStyle[] = [
  "default",
  "roll",
  "flip",
  "wobble",
  "orbit",
  "punch",
  "elastic",
  "zoom",
  "swing",
];

export default function BasicAnimatedTooltip() {
  return (
    <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4">
      {ANIMATIONS.map((anim) => (
        <div
          key={anim}
          className="flex flex-col justify-between rounded-lg border bg-card/60 border-border p-4 shadow-sm min-h-40 h-full"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold capitalize">{anim}</h3>
          </div>

          <div className="flex items-center justify-center mt-auto">
            <AnimatedTooltip
              trigger={
                <Button tone="outline" aria-label={`${anim} tooltip`}>
                  Hover Me!
                </Button>
              }
              position="top"
              delay={300}
              showArrow={true}
              animationStyle={anim}
            >
              <strong className="block capitalize">{anim}</strong>
            </AnimatedTooltip>
          </div>
        </div>
      ))}
    </div>
  );
}
