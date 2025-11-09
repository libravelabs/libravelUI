"use client";

import { InfoIcon } from "lucide-react";
import {
  AlertDescription,
  AlertTitle,
  AlertRoot,
  type AlertProps,
} from "@/components/ui/core/alert";

export function Info({
  children,
  variant,
  title,
  icon = <InfoIcon />,
}: AlertProps) {
  return (
    <AlertRoot
      variant={variant ?? "info"}
      className="flex flex-col gap-4 w-full"
    >
      <div className="flex gap-2 [&_svg:not([class*='size-'])]:size-4">
        <div className="shrink-0">{icon}</div>
        <div>
          {title && <AlertTitle>{title}</AlertTitle>}
          <AlertDescription>{children}</AlertDescription>
        </div>
      </div>
    </AlertRoot>
  );
}
