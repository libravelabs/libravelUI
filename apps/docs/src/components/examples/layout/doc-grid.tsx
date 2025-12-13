"use client";

import { cn } from "@/lib/utils";
import React from "react";

export function DocGrid({ children, className }: React.ComponentProps<"div">) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-12 gap-4", className)}>
      {children}
    </div>
  );
}
