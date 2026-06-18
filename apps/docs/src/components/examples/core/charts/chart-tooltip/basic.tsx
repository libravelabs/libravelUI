"use client";

import { BarChart } from "@/components/ui/core/charts/bar-chart";

const data = [
  { month: "Jan", revenue: 120 },
  { month: "Feb", revenue: 180 },
  { month: "Mar", revenue: 160 },
  { month: "Apr", revenue: 220 },
  { month: "May", revenue: 260 },
];

export default function BasicChartTooltipExample() {
  return (
    <BarChart
      data={data}
      dataKey="month"
      config={{
        revenue: { label: "Revenue" },
      }}
      tooltipProps={{
        labelFormatter: (label) => `Month: ${label}`,
      }}
    />
  );
}
