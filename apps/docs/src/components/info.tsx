"use client";

import { InfoIcon } from "lucide-react";
import { Alert, type AlertProps } from "./ui/alert";

export function Info({ children, variant, icon }: AlertProps) {
  return (
    <Alert variant={variant ?? "info"} icon={icon ?? <InfoIcon />}>
      {children}
    </Alert>
  );
}
