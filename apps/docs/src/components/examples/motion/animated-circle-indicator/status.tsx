import { AnimatedCircleIndicator } from "@/components/ui/motion/animated-circle-indicator";

export default function StatusIndicatorExample() {
  return (
    <div className="flex flex-wrap gap-6">
      <div className="flex items-center gap-2">
        <AnimatedCircleIndicator size="sm" tone="success" animation="none" />
        <span className="text-sm font-medium">Online</span>
      </div>
      <div className="flex items-center gap-2">
        <AnimatedCircleIndicator size="sm" tone="warning" animation="breathe" />
        <span className="text-sm font-medium">Away</span>
      </div>
      <div className="flex items-center gap-2">
        <AnimatedCircleIndicator
          size="sm"
          tone="destructive"
          animation="pulseSolid"
        />
        <span className="text-sm font-medium">Busy</span>
      </div>
      <div className="flex items-center gap-2">
        <AnimatedCircleIndicator size="sm" tone="muted" animation="none" />
        <span className="text-sm font-medium text-muted-foreground">
          Offline
        </span>
      </div>
    </div>
  );
}
