"use client";

import { AreaChart } from "@/components/ui/core/charts/area-chart";

const marketplaceTrendData = [
  { month: "Jan", revenue: 2500 },
  { month: "Feb", revenue: 9700 },
  { month: "Mar", revenue: 1800 },
  { month: "Apr", revenue: 13500 },
  { month: "May", revenue: 4200 },
  { month: "Jun", revenue: 17600 },
  { month: "Jul", revenue: 2800 },
  { month: "Aug", revenue: 14900 },
  { month: "Sep", revenue: 5100 },
  { month: "Oct", revenue: 21500 },
  { month: "Nov", revenue: 7300 },
  { month: "Dec", revenue: 26800 },
];

const marketplaceTrendConfig = {
  revenue: {
    label: "Revenue",
  },
};

export function DashboardChart() {
  return (
    <AreaChart
      containerHeight={500}
      data={marketplaceTrendData}
      dataKey="month"
      config={marketplaceTrendConfig}
      yAxisProps={{
        tickFormatter: (value) => `$${(value / 1000).toFixed(0)}k`,
      }}
    />
  );
}
