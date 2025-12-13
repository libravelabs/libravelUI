"use client";

import { useUiPreferences } from "@/hooks/use-ui-preferences";
import { AnimatedToggleButton } from "../../ui/motion/animated-toggle-button";

export function TextureToggle() {
  const { isTextured, toggleTextured } = useUiPreferences();

  return (
    <AnimatedToggleButton checked={isTextured} onCheckedChange={toggleTextured}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        fill="none"
        className="size-5"
      >
        <rect width="48" height="48" fill="white" fillOpacity="0.01" />
        <path
          d="M12 6L6 12"
          stroke="var(--foreground)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M42 36L36 42"
          stroke="var(--foreground)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22 6L6 22"
          stroke="var(--foreground)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M32 6L6 32"
          stroke="var(--foreground)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M42 6L6 42"
          stroke="var(--foreground)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M42 16L16 42"
          stroke="var(--foreground)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M42 26L26 42"
          stroke="var(--foreground)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </AnimatedToggleButton>
  );
}
