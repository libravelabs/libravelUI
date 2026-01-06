"use client";

import { cn } from "@/lib/utils";
import { LayoutPanelLeft, RefreshCw } from "lucide-react";
import { useState } from "react";
import { Button, ButtonGroup } from "@/components/ui/core/button";

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
    <div
      key={refresh.key}
      dir={direction}
      className={cn(
        "relative w-full not-prose p-2 md:p-8 overflow-hidden",
        className
      )}
    >
      {!hideButtons && (
        <div className="absolute top-4 start-4 z-50 ms-auto flex items-center gap-2">
          <ButtonGroup>
            <Button
              tone="outline"
              className="bg-secondary/20 border-2"
              iconOnly
              onClick={handleDirection}
            >
              <LayoutPanelLeft
                className={cn(
                  "size-4 text-foreground/60 transition-transform",
                  direction === "rtl" && "rotate-180"
                )}
              />
            </Button>

            <Button
              onClick={handleRefresh}
              tone="outline"
              className="bg-secondary/20 border-2"
              iconOnly
            >
              <RefreshCw
                className="size-4 text-foreground/60 transition-transform duration-500"
                style={{ transform: `rotate(${refresh.rotation}deg)` }}
              />
            </Button>
          </ButtonGroup>
        </div>
      )}
      {children}
    </div>
  );
};
