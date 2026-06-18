"use client";

import * as React from "react";
import { Badge } from "@/components/ui/core/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/core/card";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  AreaChart,
  BarChart,
  LineChart,
  PieChart,
  RadarChart,
  RadialBarChart,
  TreemapChart,
  ComposedChart,
  ScatterChart,
  FunnelChart,
} from "@/components/ui/core/charts";

type EngagementPoint = {
  day: string;
  likes: number;
  comments: number;
  shares: number;
};

type TrafficPoint = {
  day: string;
  desktop: number;
  mobile: number;
  tablet: number;
};

type SalesPoint = {
  month: string;
  revenue: number;
  profit: number;
};

type ChannelPoint = {
  name: string;
  value: number;
};

type RadarPoint = {
  subject: string;
  current: number;
  target: number;
  fullMark: number;
};

type BubblePoint = {
  x: number;
  y: number;
  z: number;
};

type TreemapNode = {
  name: string;
  size?: number;
  valueLabel?: string;
  children?: TreemapNode[];
};

const fileTree: TreemapNode[] = [
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
] as const;

function ShowcaseCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-72 min-w-0">{children}</div>
      </CardContent>
    </Card>
  );
}

export default function ChartShowcasePage() {
  const isMobile = useIsMobile();

  const engagementData = React.useMemo<EngagementPoint[]>(
    () =>
      Array.from({ length: 7 }, (_, i) => ({
        day: `Day ${i + 1}`,
        likes: Math.floor(100 + Math.random() * 300),
        comments: Math.floor(20 + Math.random() * 80),
        shares: Math.floor(10 + Math.random() * 50),
      })),
    [],
  );

  const trafficData = React.useMemo<TrafficPoint[]>(
    () =>
      Array.from({ length: 7 }, (_, i) => ({
        day: `Day ${i + 1}`,
        desktop: Math.floor(100 + Math.random() * 200),
        mobile: Math.floor(120 + Math.random() * 220),
        tablet: Math.floor(30 + Math.random() * 80),
      })),
    [],
  );

  const salesData = React.useMemo<SalesPoint[]>(
    () => [
      { month: "Jan", revenue: 1200, profit: 420 },
      { month: "Feb", revenue: 1800, profit: 520 },
      { month: "Mar", revenue: 1600, profit: 600 },
      { month: "Apr", revenue: 2400, profit: 910 },
      { month: "May", revenue: 2100, profit: 760 },
      { month: "Jun", revenue: 2600, profit: 1040 },
    ],
    [],
  );

  const channelsData = React.useMemo<ChannelPoint[]>(
    () => [
      { name: "Organic", value: 42 },
      { name: "Paid", value: 28 },
      { name: "Referral", value: 18 },
      { name: "Direct", value: 12 },
    ],
    [],
  );

  const radarData = React.useMemo<RadarPoint[]>(
    () => [
      { subject: "UI", current: 120, target: 150, fullMark: 150 },
      { subject: "Perf", current: 98, target: 130, fullMark: 150 },
      { subject: "DX", current: 86, target: 130, fullMark: 150 },
      { subject: "A11y", current: 99, target: 100, fullMark: 150 },
      { subject: "Scale", current: 85, target: 90, fullMark: 150 },
      { subject: "Docs", current: 65, target: 85, fullMark: 150 },
    ],
    [],
  );

  const radialData = React.useMemo(
    () => [
      { name: "Completion", value: 78 },
      { name: "Retention", value: 64 },
      { name: "Satisfaction", value: 91 },
    ],
    [],
  );

  const scatterData = React.useMemo<BubblePoint[]>(
    () => [
      { x: 12, y: 18, z: 120 },
      { x: 18, y: 25, z: 180 },
      { x: 25, y: 30, z: 140 },
      { x: 32, y: 44, z: 260 },
      { x: 42, y: 51, z: 210 },
      { x: 51, y: 54, z: 320 },
      { x: 61, y: 67, z: 220 },
      { x: 72, y: 73, z: 380 },
    ],
    [],
  );

  return (
    <div
      header={{
        title: "Charts",
        description:
          "Reusable chart components with Recharts-like data shape. User only passes data, config, and chart props.",
      }}
    >
      <div className="flex flex-wrap gap-2">
        <Badge tone="secondary">v2.3</Badge>
        <Badge tone="outline">Mentahan</Badge>
        <Badge tone="outline">Reusable</Badge>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <ShowcaseCard
          title="AreaChart"
          description="Cukup data, dataKey, config, dan containerHeight."
        >
          <AreaChart
            containerHeight={isMobile ? 220 : 300}
            data={engagementData}
            dataKey="day"
            xAxisProps={{ interval: 0 }}
            config={{
              likes: { label: "Likes" },
              comments: { label: "Comments" },
              shares: { label: "Shares" },
            }}
          />
        </ShowcaseCard>

        <ShowcaseCard
          title="BarChart"
          description="Grouped bar chart tanpa nyusun axis manual."
        >
          <BarChart
            containerHeight={isMobile ? 220 : 300}
            data={trafficData}
            dataKey="day"
            xAxisProps={{ interval: 0 }}
            config={{
              desktop: { label: "Desktop" },
              mobile: { label: "Mobile" },
              tablet: { label: "Tablet" },
            }}
          />
        </ShowcaseCard>

        <ShowcaseCard
          title="LineChart"
          description="Line chart standar dengan label series konsisten."
        >
          <LineChart
            containerHeight={isMobile ? 220 : 300}
            data={salesData}
            dataKey="month"
            xAxisProps={{ interval: 0 }}
            config={{
              revenue: { label: "Revenue" },
              profit: { label: "Profit" },
            }}
          />
        </ShowcaseCard>

        <ShowcaseCard
          title="ComposedChart"
          description="Campur bar dan line tetap dari wrapper yang sama."
        >
          <ComposedChart
            containerHeight={isMobile ? 220 : 300}
            data={salesData}
            dataKey="month"
            xAxisProps={{ interval: 0 }}
            config={{
              revenue: { label: "Revenue", type: "bar" },
              profit: { label: "Profit", type: "line" },
            }}
          />
        </ShowcaseCard>

        <ShowcaseCard
          title="PieChart"
          description="Distribusi sederhana dengan default LibravelUI colors."
        >
          <PieChart
            containerHeight={isMobile ? 220 : 300}
            data={channelsData}
            dataKey="value"
            nameKey="name"
            config={{
              Organic: { label: "Organic" },
              Paid: { label: "Paid" },
              Referral: { label: "Referral" },
              Direct: { label: "Direct" },
            }}
          />
        </ShowcaseCard>

        <ShowcaseCard
          title="RadarChart"
          description="Bandingkan current vs target tanpa manual polar setup."
        >
          <RadarChart
            containerHeight={isMobile ? 220 : 300}
            data={radarData}
            dataKey="subject"
            config={{
              current: { label: "Current" },
              target: { label: "Target" },
            }}
          />
        </ShowcaseCard>

        <ShowcaseCard
          title="RadialBarChart"
          description="Ring metrics yang fix, satu series saja."
        >
          <RadialBarChart
            containerHeight={isMobile ? 220 : 300}
            data={radialData}
            nameKey="name"
            valueKey="value"
            config={{ label: "Score" }}
          />
        </ShowcaseCard>

        <ShowcaseCard
          title="ScatterChart"
          description="Cocok untuk korelasi dan distribusi titik."
        >
          <ScatterChart
            containerHeight={isMobile ? 220 : 300}
            data={scatterData}
            xDataKey="x"
            yDataKey="y"
            zDataKey="z"
            config={{ label: "Points" }}
          />
        </ShowcaseCard>

        <ShowcaseCard
          title="FunnelChart"
          description="Flow sederhana yang tetap mentahan."
        >
          <FunnelChart
            containerHeight={isMobile ? 220 : 300}
            data={[
              { name: "Visited", value: 1000 },
              { name: "Clicked", value: 742 },
              { name: "Signed up", value: 428 },
              { name: "Activated", value: 192 },
              { name: "Paid", value: 84 },
            ]}
            dataKey="value"
            nameKey="name"
            config={{
              Visited: { label: "Visited" },
              Clicked: { label: "Clicked" },
              "Signed up": { label: "Signed up" },
              Activated: { label: "Activated" },
              Paid: { label: "Paid" },
            }}
          />
        </ShowcaseCard>

        <ShowcaseCard
          title="Treemap"
          description="Data hirarkis mentahan, label leaf menampilkan valueLabel."
        >
          <TreemapChart
            containerHeight={isMobile ? 220 : 300}
            data={fileTree}
            dataKey="size"
          />
        </ShowcaseCard>
      </div>
    </div>
  );
}
