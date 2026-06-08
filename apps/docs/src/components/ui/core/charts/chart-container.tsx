"use client";

import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";
import type { ChartContainerProps } from "./chart-types";

export function ChartContainer({
  children,
  classNames,
  height = 320,
}: PropsWithChildren<ChartContainerProps>) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-sm",
        classNames?.root,
      )}
      style={{ height }}
    >
      <div className={cn("h-full w-full p-4", classNames?.content)}>
        {children}
      </div>
    </div>
  );
}
