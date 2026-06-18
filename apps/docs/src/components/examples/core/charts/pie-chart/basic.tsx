"use client";

import { PieChart } from "@/components/ui/core/charts/pie-chart";

const data = [
  { name: "Desktop", value: 46 },
  { name: "Mobile", value: 38 },
  { name: "Tablet", value: 16 },
];

export default function BasicPieChartExample() {
  return (
    <PieChart
      data={data}
      dataKey="value"
      nameKey="name"
      innerRadius={56}
      outerRadius={92}
    />
  );
}
