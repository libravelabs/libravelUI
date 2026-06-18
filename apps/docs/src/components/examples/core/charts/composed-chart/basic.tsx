"use client";

import { ComposedChart } from "@/components/ui/core/charts/composed-chart";

const data = [
  { month: "Jan", revenue: 120, profit: 48, visitors: 140 },
  { month: "Feb", revenue: 180, profit: 72, visitors: 180 },
  { month: "Mar", revenue: 160, profit: 58, visitors: 165 },
  { month: "Apr", revenue: 220, profit: 96, visitors: 210 },
  { month: "May", revenue: 260, profit: 110, visitors: 240 },
];

export default function BasicComposedChartExample() {
  return (
    <ComposedChart
      data={data}
      dataKey="month"
      config={{
        revenue: { label: "Revenue", type: "bar" },
        profit: { label: "Profit", type: "line" },
        visitors: { label: "Visitors", type: "area" },
      }}
    />
  );
}
