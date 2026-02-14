"use client";

import { cn } from "@/lib/utils";
import { LibraryBig } from "lucide-react";

interface LogoProps {
  variant?: "icon" | "name" | "full";
  size?: number;
  className?: string;
}

export function Logo({ variant = "full", size = 20, className }: LogoProps) {
  const text = (
    <h1 className="text-lg font-semibold">
      libravel<span className="text-primary">UI</span>
    </h1>
  );

  const icon = <LibraryBig size={size} />;

  if (variant === "icon") {
    return <div className={cn("relative flex", className)}>{icon}</div>;
  }

  if (variant === "name") {
    return <div className={className}>{text}</div>;
  }

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {icon}
      {text}
    </div>
  );
}
