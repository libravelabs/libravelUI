"use client";

import { RadarChart } from "@/components/ui/core/charts/radar-chart";

const data = [
  { subject: "Speed", desktop: 88, mobile: 70 },
  { subject: "Reliability", desktop: 76, mobile: 82 },
  { subject: "UX", desktop: 92, mobile: 85 },
  { subject: "Support", desktop: 68, mobile: 73 },
  { subject: "Scalability", desktop: 81, mobile: 64 },
];

export default function BasicRadarChartExample() {
  return (
    <RadarChart
      data={data}
      dataKey="subject"
      config={{
        desktop: { label: "Desktop" },
        mobile: { label: "Mobile" },
      }}
    />
  );
}
