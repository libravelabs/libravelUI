"use client";

import { RadialBarChart } from "@/components/ui/core/charts/radial-bar-chart";

const data = [
  { name: "Design", value: 82 },
  { name: "Development", value: 68 },
  { name: "Testing", value: 56 },
  { name: "Delivery", value: 91 },
];

export default function BasicRadialBarChartExample() {
  return (
    <RadialBarChart
      data={data}
      nameKey="name"
      valueKey="value"
      config={{
        label: "Progress",
      }}
    />
  );
}
