import { AnimatedCircleIndicator } from "@/components/ui/motion/animated-circle-indicator";
import { Bell } from "lucide-react";

export default function NotificationIndicatorExample() {
  return (
    <div className="relative inline-flex p-2 rounded-full cursor-pointer hover:bg-secondary/50">
      <Bell className="size-5" />
      <AnimatedCircleIndicator
        size="xs"
        tone="destructive"
        animation="pulseTransparent"
        className="absolute top-1.5 right-1.5"
      />
    </div>
  );
}
