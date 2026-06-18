"use client";

import { AreaChart } from "@/components/ui/core/charts/area-chart";

const marketplaceTrendData = [
  { month: "Jan", revenue: 25000000 },
  { month: "Feb", revenue: 97000000 },
  { month: "Mar", revenue: 18000000 },
  { month: "Apr", revenue: 135000000 },
  { month: "May", revenue: 42000000 },
  { month: "Jun", revenue: 176000000 },
  { month: "Jul", revenue: 28000000 },
  { month: "Aug", revenue: 149000000 },
  { month: "Sep", revenue: 51000000 },
  { month: "Oct", revenue: 215000000 },
  { month: "Nov", revenue: 73000000 },
  { month: "Dec", revenue: 268000000 },
];

const marketplaceTrendConfig = {
  revenue: {
    label: "Revenue",
  },
};

export function DashboardChart() {
  return (
    <AreaChart
      data={marketplaceTrendData}
      dataKey="month"
      config={marketplaceTrendConfig}
      yAxisProps={{
        tickFormatter: (value) => `$${(value / 1000).toFixed(0)}k`,
      }}
    />
  );
}
