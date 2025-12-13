import { Badge } from "@/components/ui/core/badge";
import { AnimatedCircleIndicator } from "@/components/ui/motion/animated-circle-indicator";

export function InstallationBadge() {
  return (
    <Badge size="sm" radius="full">
      <AnimatedCircleIndicator animation="pulseTransparent" tone="success" />
      <span>Works with npm, pnpm, yarn, and bun</span>
    </Badge>
  );
}
