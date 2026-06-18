"use client";

import { TreemapChart } from "@/components/ui/core/charts/treemap-chart";

const data = [
  {
    name: "Documents",
    children: [
      { name: "report.pdf", size: 12.5, valueLabel: "12.5 MB" },
      { name: "proposal.docx", size: 8.2, valueLabel: "8.2 MB" },
      { name: "notes.txt", size: 1.1, valueLabel: "1.1 MB" },
    ],
  },
  {
    name: "Images",
    children: [
      { name: "banner.png", size: 24.3, valueLabel: "24.3 MB" },
      { name: "logo.svg", size: 2.4, valueLabel: "2.4 MB" },
      { name: "photo.jpg", size: 18.7, valueLabel: "18.7 MB" },
    ],
  },
  {
    name: "Videos",
    children: [
      { name: "intro.mp4", size: 120.5, valueLabel: "120.5 MB" },
      { name: "tutorial.mp4", size: 85.9, valueLabel: "85.9 MB" },
    ],
  },
];

export default function BasicTreemapChartExample() {
  return <TreemapChart data={data} dataKey="size" />;
}
