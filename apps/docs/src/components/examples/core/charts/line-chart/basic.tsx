"use client";

import { LineChart } from "@/components/ui/core/charts/line-chart";

const data = [
  { month: "Jan", revenue: 120, profit: 48 },
  { month: "Feb", revenue: 180, profit: 72 },
  { month: "Mar", revenue: 160, profit: 58 },
  { month: "Apr", revenue: 220, profit: 96 },
  { month: "May", revenue: 260, profit: 110 },
];

export default function BasicLineChartExample() {
  return (
    <LineChart
      data={data}
      dataKey="month"
      config={{
        revenue: { label: "Revenue" },
        profit: { label: "Profit" },
      }}
    />
  );
}
