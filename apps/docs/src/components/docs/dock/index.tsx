"use client";

import { Playground } from "@/components/playground";
import { BasicDockBase, BasicDockCode } from "./basic-dock";
import { DockPositionsBase, DockPositionsCode } from "./dock-positions";
import { FloatDockBase, FloatDockCode } from "./float-dock";
import { StickyDockBase, StickyDockCode } from "./sticky-dock";

export function BasicDock() {
  return <Playground preview={<BasicDockBase />} code={BasicDockCode} />;
}

export function DockPositions() {
  return (
    <Playground preview={<DockPositionsBase />} code={DockPositionsCode} />
  );
}

export function FloatDock() {
  return <Playground preview={<FloatDockBase />} code={FloatDockCode} />;
}

export function StickyDock() {
  return <Playground preview={<StickyDockBase />} code={StickyDockCode} />;
}
