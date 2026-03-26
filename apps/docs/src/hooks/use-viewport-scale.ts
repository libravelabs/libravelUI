"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type Viewport = "desktop" | "tablet" | "mobile";

export const VIEWPORT_WIDTH: Record<Viewport, number> = {
  desktop: 1280,
  tablet: 768,
  mobile: 375,
};

export function useViewportScale(viewport: Viewport) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const targetWidth = VIEWPORT_WIDTH[viewport];

  const updateScale = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const next = Math.min(1, container.offsetWidth / targetWidth);
    setScale(next);
  }, [targetWidth]);

  useEffect(() => {
    updateScale();

    const observer = new ResizeObserver(updateScale);
    const el = containerRef.current;

    if (el) observer.observe(el);

    return () => observer.disconnect();
  }, [updateScale]);

  return {
    containerRef,
    scale,
    targetWidth,
  };
}
