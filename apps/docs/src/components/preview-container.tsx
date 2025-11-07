"use client";

import { cn } from "@/lib/utils";
import { RefreshCw } from "lucide-react";
import { useState } from "react";
import { DirectionProvider } from "@radix-ui/react-direction";
import { Button } from "./ui/button";

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
  const [key, setKey] = useState(0);
  const [rotation, setRotation] = useState(0);

  const handleRefresh = () => {
    setKey((prev) => prev + 1);
    setRotation((prev) => prev + 360);
  };

  const handleDirection = () =>
    setDirection((prev) => (prev === "ltr" ? "rtl" : "ltr"));

  return (
    <DirectionProvider dir={direction}>
      <div className="grid w-full overflow-hidden">
        {!hideButtons && (
          <div className="ms-auto flex items-center gap-2">
            <Button variant="secondary" size={"icon"} onClick={handleDirection}>
              {direction}
            </Button>
            <Button
              onClick={handleRefresh}
              variant="secondary"
              size={"icon"}
              aria-label="Refresh preview"
            >
              <RefreshCw
                className="w-4 h-4 transition-transform duration-300"
                style={{ transform: `rotate(${rotation}deg)` }}
              />
            </Button>
          </div>
        )}
        <div
          key={key}
          dir={direction}
          className={cn(
            "min-h-56 rounded-xl bg-background flex items-center justify-center not-prose p-2 md:p-8 overflow-hidden",
            className
          )}
        >
          {children}
        </div>
      </div>
    </DirectionProvider>
  );
};
