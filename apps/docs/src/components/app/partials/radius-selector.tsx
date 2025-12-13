"use client";

import React from "react";
import {
  AnimatedToggleGroup,
  AnimatedToggleItem,
} from "@/components/ui/motion/animated-toggle-group";
import { useUiPreferences } from "@/hooks/use-ui-preferences";
import { RADIUS_MAP } from "@/constants/radius";
import type { RadiusKey } from "@/types/ui-preferences";

const radiusKeys = Object.keys(RADIUS_MAP) as RadiusKey[];

export function RadiusSelector() {
  const radius = useUiPreferences((s) => s.radius);
  const setRadius = useUiPreferences((s) => s.setRadius);

  return (
    <AnimatedToggleGroup
      value={radius}
      onValueChange={(val) => setRadius(val as RadiusKey)}
    >
      {radiusKeys.map((key) => (
        <AnimatedToggleItem key={key} value={key}>
          <RadiusIcon radius={key} />
        </AnimatedToggleItem>
      ))}
    </AnimatedToggleGroup>
  );
}

interface RadiusIconProps {
  radius: RadiusKey;
}

function RadiusIcon({ radius }: RadiusIconProps) {
  const radiusValues = {
    sm: 3, // 6px
    md: 4, // 8px
    xl: 5, // 10px
    "3xl": 12, // 24px
  };

  const r = radiusValues[radius];

  if (radius === "3xl") {
    return (
      <svg
        className="size-6"
        viewBox="0 0 20 20"
        fill="var(--foreground)"
        fillOpacity="0.35"
        stroke="var(--foreground)"
        strokeWidth="1.5"
      >
        {/* Fill area - closed path */}
        <path
          d="M4 4 L4 4 Q4 16 16 16 L16 4 Z"
          fill="var(--foreground)"
          fillOpacity="0.35"
          stroke="none"
        />
        {/* Stroke outline */}
        <path
          d="M4 4 L4 4 Q4 16 16 16 L16 16"
          fill="none"
          stroke="var(--foreground)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      className="size-6"
      viewBox="0 0 20 20"
      fill="var(--foreground)"
      stroke="var(--foreground)"
      strokeWidth="1.5"
    >
      {/* Fill area - closed path */}
      <path
        d={`M4 4 L4 ${16 - r} Q4 16 ${4 + r} 16 L16 16 L16 4 Z`}
        fill="var(--foreground)"
        fillOpacity="0.35"
        stroke="none"
      />
      {/* Stroke outline */}
      <path
        d={`M4 4 L4 ${16 - r} Q4 16 ${4 + r} 16 L16 16`}
        fill="none"
        stroke="var(--foreground)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
