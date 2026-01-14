"use client";

import { Loader, type LoaderProps } from "@/components/ui/core/loader";

export default function LoaderExample({
  color = "foreground",
  size = "sm",
  type = "spin",
}: LoaderProps) {
  return <Loader color={color} size={size} type={type} />;
}

export const controls = {
  color: {
    type: "select",
    options: [
      { label: "Foreground", value: "foreground" },
      { label: "Primary", value: "primary" },
      { label: "Secondary", value: "secondary" },
      { label: "Success", value: "success" },
      { label: "Warning", value: "warning" },
      { label: "Destructive", value: "destructive" },
    ],
    defaultValue: "foreground",
  },
  size: {
    type: "select",
    options: [
      { label: "Small", value: "sm" },
      { label: "Medium", value: "md" },
      { label: "Large", value: "lg" },
    ],
    defaultValue: "sm",
  },
  type: {
    type: "select",
    options: [
      { label: "Spin", value: "spin" },
      { label: "Ring", value: "ring" },
      { label: "Bars", value: "bars" },
    ],
    defaultValue: "spin",
  },
};
