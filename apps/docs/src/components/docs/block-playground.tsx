"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import {
  Monitor,
  Tablet,
  Smartphone,
  Maximize2,
  RotateCcw,
} from "lucide-react";
import { Button, ButtonGroup } from "@/components/ui/core/button";
import {
  AnimatedToggleGroup,
  AnimatedToggleItem,
} from "@/components/ui/motion/animated-toggle-group";
import { Separator } from "../ui/core/separator";
import { Mockup, MockupFrame } from "../ui/block/mockup";

interface BlockPlaygroundProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  title?: string;
  defaultHeight?: number | string;
}

type Viewport = "desktop" | "tablet" | "mobile";

const VIEWPORT_WIDTHS: Record<Viewport, number> = {
  desktop: 1280,
  tablet: 768,
  mobile: 375,
};

export function BlockPlayground({
  src,
  className,
  title = "Block Preview",
  defaultHeight = 600,
  ...props
}: BlockPlaygroundProps) {
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const [refreshKey, setRefreshKey] = useState(0);
  const [scale, setScale] = useState(1);

  const containerRef = useRef<HTMLDivElement>(null);
  const targetWidth = VIEWPORT_WIDTHS[viewport];

  const updateScale = useCallback(() => {
    if (!containerRef.current) return;
    setScale(Math.min(1, containerRef.current.offsetWidth / targetWidth));
  }, [targetWidth]);

  useEffect(() => {
    updateScale();
    const ro = new ResizeObserver(updateScale);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [updateScale]);

  return (
    <Mockup
      showHeader
      style={{ height: defaultHeight }}
      title={new URL(src, process.env.NEXT_PUBLIC_APP_URL).toString()}
      headerAction={
        <div className="flex items-center gap-1.5 sm:gap-2">
          <AnimatedToggleGroup
            value={viewport}
            onValueChange={(value) => setViewport(value as Viewport)}
          >
            {(["desktop", "tablet", "mobile"] as Viewport[]).map((vp) => (
              <AnimatedToggleItem key={vp} value={vp} className="size-6">
                {vp === "desktop" && <Monitor />}
                {vp === "tablet" && <Tablet />}
                {vp === "mobile" && <Smartphone />}
              </AnimatedToggleItem>
            ))}
          </AnimatedToggleGroup>

          <Separator orientation="vertical" className="h-8 mx-1" />

          <ButtonGroup>
            <Button
              tone="outline"
              iconOnly
              onClick={() => setRefreshKey((k) => k + 1)}
            >
              <RotateCcw />
            </Button>
            <Button
              tone="outline"
              iconOnly
              onClick={() => window.open(src, "_blank")}
            >
              <Maximize2 />
            </Button>
          </ButtonGroup>
        </div>
      }
      {...props}
    >
      <div
        style={{
          height: `${100 / scale}%`,
          transformOrigin: "top center",
          transform: `scale(${scale})`,
          flexShrink: 0,
          maxWidth:
            viewport === "tablet"
              ? VIEWPORT_WIDTHS.tablet
              : viewport === "mobile"
                ? VIEWPORT_WIDTHS.mobile
                : "100%",
        }}
        className="w-full transition-all duration-300 ease-in-out"
      >
        <iframe
          key={refreshKey}
          src={src}
          title={title}
          style={{
            display: "block",
            border: "none",
            width: "100%",
            height: "100%",
          }}
        />
      </div>
    </Mockup>
  );
}
