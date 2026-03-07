import { AnimatedCircleIndicator } from "@/components/ui/motion/animated-circle-indicator";

export default function ActivityIndicatorExample() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between p-3 rounded-xl border bg-card w-64 shadow-xs">
        <span className="text-sm font-medium">System Processing...</span>
        <AnimatedCircleIndicator size="sm" tone="primary" animation="shimmer" />
      </div>

      <div className="flex items-center justify-between p-3 rounded-xl border bg-card w-64 shadow-xs">
        <div className="flex items-center gap-2">
          <AnimatedCircleIndicator
            size="xs"
            tone="success"
            animation="ripple"
          />
          <span className="text-sm font-medium text-muted-foreground">
            Live Sync Active
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between p-3 rounded-xl border bg-card w-64 shadow-xs">
        <div className="flex items-center gap-2">
          <AnimatedCircleIndicator
            size="xs"
            tone="destructive"
            animation="flash"
            duration={2}
          />
          <span className="text-sm font-medium text-destructive">
            Critical Error
          </span>
        </div>
      </div>
    </div>
  );
}
