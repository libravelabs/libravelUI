"use client";

import { useState, useRef, useEffect, useCallback } from "react";
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
import { Heading } from "../ui/core/heading";
import { TabContent, TabList, Tabs, TabTrigger } from "../ui/core/tabs";
import { PackageInstall } from "./package-install";

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

export function BlockPlayground({ title, src }: BlockPlaygroundProps) {
  return (
    <div className="grid gap-4 w-full h-full">
      <Tabs width="full">
        <div className="flex items-center justify-between">
          {title && <Heading level={4}>{title}</Heading>}
          <div className="flex items-center gap-4">
            <PackageInstall
              command="add"
              packageName="block/navbar-01"
              showHeader={false}
            />

            <Separator orientation="vertical" className="h-10" />

            <TabList size="sm" className="p-0.5">
              <TabTrigger id="preview" className="h-8" radius="lg">
                Preview
              </TabTrigger>
              <TabTrigger id="code" className="h-8" radius="lg">
                Code
              </TabTrigger>
            </TabList>
          </div>
        </div>
        <BlockPreview src={src} />
      </Tabs>
    </div>
  );
}

export function BlockPreview({
  src,
  className,
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

            <Separator orientation="vertical" className="h-4" />

            <Button
              size="xs"
              tone="ghost"
              iconOnly
              onClick={() => setRefreshKey((k) => k + 1)}
            >
              <RotateCcw />
            </Button>

            <Separator orientation="vertical" className="h-4" />

            <Button
              size="xs"
              tone="ghost"
              iconOnly
              onClick={() => window.open(src, "_blank")}
            >
              <Maximize2 />
            </Button>
          </AnimatedToggleGroup>
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
        <TabContent id="preview" className="p-0">
          <iframe
            key={refreshKey}
            src={src}
            style={{
              display: "block",
              border: "none",
              width: "100%",
              height: "100%",
            }}
          />
        </TabContent>
      </div>
    </Mockup>
  );
}
