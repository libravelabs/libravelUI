"use client";

import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";
import { useUiPreferences } from "@/hooks/use-ui-preferences";

export type TexturedBackgroundPrimitiveProps = React.ComponentProps<"div"> & {
  children?: ReactNode;
};

export function TexturedBackgroundPrimitive({
  children,
  className,
}: TexturedBackgroundPrimitiveProps) {
  return (
    <div className={cn("relative", className)}>
      <div
        className="
          pointer-events-none absolute inset-0 z-9999
          bg-[url(/assets/paper-bg.jpg)]
          mask-image:[radial-gradient(circle_at_center,white_60%,transparent_100%)]
          bg-repeat
          mix-blend-overlay
          opacity-40
        "
      />

      <div
        className="
          pointer-events-none absolute inset-0 z-9998
          bg-[url(/assets/paper-bg.jpg)]
          mask-image:[radial-gradient(circle_at_center,white_60%,transparent_100%)]
          bg-repeat
          mix-blend-multiply
          opacity-20
        "
      />
      <div className="relative z-10 min-h-screen bg-textured **:border-foreground/10">
        {children}
      </div>
    </div>
  );
  9;
}

export function TexturedBackground({ children }: { children: ReactNode }) {
  const isTextured = useUiPreferences((s) => s.isTextured);

  return isTextured ? (
    <TexturedBackgroundPrimitive>{children}</TexturedBackgroundPrimitive>
  ) : (
    <>{children}</>
  );
}
