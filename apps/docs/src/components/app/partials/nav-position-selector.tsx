"use client";

import type { NavPosition } from "@/types/ui-preferences";
import { NAV_POSITIONS } from "@/constants/nav-positions";
import {
  AnimatedToggleGroup,
  AnimatedToggleItem,
} from "@/components/ui/motion/animated-toggle-group";
import { PanelLeft, PanelRight, PanelBottom } from "lucide-react";

interface NavPositionSelectorProps {
  value: NavPosition;
  onChange: (value: NavPosition) => void;
}

export function NavPositionSelector({
  value,
  onChange,
}: NavPositionSelectorProps) {
  return (
    <AnimatedToggleGroup
      value={value}
      onValueChange={(v: string) => onChange(v as NavPosition)}
      className="ml-2"
    >
      <AnimatedToggleItem value="left">
        <PanelLeft />
      </AnimatedToggleItem>
      <AnimatedToggleItem value="center">
        <PanelBottom />
      </AnimatedToggleItem>
      <AnimatedToggleItem value="right">
        <PanelRight />
      </AnimatedToggleItem>
    </AnimatedToggleGroup>
  );
}
