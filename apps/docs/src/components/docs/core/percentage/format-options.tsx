"use client";

import { Percentage } from "@/components/ui/core/percentage";

export default function FormatOptionsPercentage() {
  return (
    <Percentage
      formatOptions={{
        style: "decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }}
      label="Disk Usage"
      value={43.44}
    />
  );
}
