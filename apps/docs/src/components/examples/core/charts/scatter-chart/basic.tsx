"use client";

import { ScatterChart } from "@/components/ui/core/charts/scatter-chart";

const data = [
  { x: 12, y: 18, z: 80 },
  { x: 18, y: 24, z: 100 },
  { x: 24, y: 30, z: 120 },
  { x: 30, y: 26, z: 140 },
  { x: 36, y: 42, z: 160 },
  { x: 42, y: 48, z: 180 },
];

export default function BasicScatterChartExample() {
  return (
    <ScatterChart
      data={data}
      xDataKey="x"
      yDataKey="y"
      zDataKey="z"
      config={{
        label: "Sessions",
      }}
    />
  );
}
