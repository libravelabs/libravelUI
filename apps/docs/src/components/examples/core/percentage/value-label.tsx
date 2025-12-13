"use client";

import { Percentage } from "@/components/ui/core/percentage";

export default function BasicPercentage() {
  return (
    <Percentage valueLabel="25GB of 100GB" label="Storage space" value={25} />
  );
}
