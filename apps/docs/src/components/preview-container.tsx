"use client";

import { cn } from "@/lib/utils";
import { LayoutPanelLeft, RefreshCw } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/core/button";
import { AnimatedTooltip } from "@/components/ui/motion/animated-tooltip";

interface PreviewContainerProps {
  children: React.ReactNode;
  className?: string;
  hideButtons?: boolean;
}

export const PreviewContainer = ({
  children,
  className,
  hideButtons = false,
}: PreviewContainerProps) => {
  const [direction, setDirection] = useState<"ltr" | "rtl">("ltr");
  const [refresh, setRefresh] = useState<{ key: number; rotation: number }>({
    key: 0,
    rotation: 0,
  });

  const handleRefresh = () => {
    setRefresh((prev) => ({
      key: prev.key + 1,
      rotation: prev.rotation + 360,
    }));
  };

  const handleDirection = () =>
    setDirection((prev) => (prev === "ltr" ? "rtl" : "ltr"));

  return (
    <div className="relative grid w-full overflow-hidden p-4">
      <div className="absolute inset-0 bg-dots -z-1 rounded-sm" />
      {!hideButtons && (
        <div className="absolute top-4 end-4 z-50 ms-auto flex items-center gap-2">
          <AnimatedTooltip
            position="left"
            trigger={
              <Button tone="secondary" iconOnly onClick={handleDirection}>
                {direction === "ltr" ? (
                  <LayoutPanelLeft />
                ) : (
                  <LayoutPanelLeft className="rotate-180" />
                )}
              </Button>
            }
          >
            <span className="capitalize">{direction}</span>
          </AnimatedTooltip>

          <Button onClick={handleRefresh} tone="secondary" iconOnly>
            <RefreshCw
              className="size-4 transition-transform duration-300"
              style={{ transform: `rotate(${refresh.rotation}deg)` }}
            />
          </Button>
        </div>
      )}
      <div
        key={refresh.key}
        dir={direction}
        className={cn(
          "min-h-56 rounded-xl flex items-center justify-center not-prose p-2 md:p-8 overflow-hidden",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};
