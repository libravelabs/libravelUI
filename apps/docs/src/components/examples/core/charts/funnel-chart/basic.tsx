"use client";

import { FunnelChart } from "@/components/ui/core/charts/funnel-chart";

const data = [
  { stage: "Visitors", value: 4200 },
  { stage: "Signups", value: 2500 },
  { stage: "Trials", value: 1500 },
  { stage: "Paid", value: 780 },
];

export default function BasicFunnelChartExample() {
  return (
    <FunnelChart
      data={data}
      dataKey="value"
      nameKey="stage"
    />
  );
}
