import { AnimatedCircleIndicator } from "@/components/ui/motion/animated-circle-indicator";

export default function BasicAnimatedCircleIndicator() {
  return (
    <div className="flex items-center gap-2">
      <AnimatedCircleIndicator
        size="md"
        tone="primary"
        animation="pulseTransparent"
      />
      <span className="text-sm font-medium">Status</span>
    </div>
  );
}
