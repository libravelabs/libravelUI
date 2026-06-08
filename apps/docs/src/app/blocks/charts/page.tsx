"use client";

import {
  AreaChart,
  BarChart,
  ComposedChart,
  FunnelChart,
  LineChart,
  PieChart,
  RadarChart,
  RadialBarChart,
  ScatterChart,
  TreemapChart,
} from "@/components/ui/core/charts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/core/card";
import { Badge } from "@/components/ui/core/badge";
import type { ReactNode } from "react";
import {
  acquisitionScatterData,
  categorySalesData,
  checkoutFunnelData,
  channelMixData,
  operationsKpiData,
  revenueData,
  shopTrafficData,
  storageAllocationData,
  storeHealthData,
} from "./chart-example-data";

function ExampleCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="gap-2">
        <CardTitle className="text-base sm:text-lg">{title}</CardTitle>
        <CardDescription className="max-w-2xl">{description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">{children}</CardContent>
    </Card>
  );
}

export default function ChartsDemoPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 py-10">
      <header className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="secondary">Charts Examples</Badge>
          <Badge tone="outline">Realistic data</Badge>
          <Badge tone="outline">No dashboard shell</Badge>
        </div>

        <div className="max-w-3xl space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            LibravelUI Charts in real application contexts
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            The datasets below are synthetic, but shaped like the data you would
            actually see in an online shop or an operations panel. The goal is
            to show charts as embedded components, not as a dashboard.
          </p>
        </div>
      </header>

      <section className="space-y-4">
        <div className="space-y-2">
          <Badge tone="outline">E-commerce</Badge>
          <h2 className="text-2xl font-semibold tracking-tight">
            Store performance and conversion
          </h2>
          <p className="max-w-3xl text-sm text-muted-foreground">
            A small-to-mid-sized online shop: traffic, revenue, product mix, and
            checkout behavior over time.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <ExampleCard
            title="Traffic and returning customers"
            description="Weekly sessions, add-to-cart activity, and completed orders."
          >
            <LineChart
              data={shopTrafficData}
              dataKey="day"
              config={{
                sessions: { label: "Sessions" },
                addToCart: { label: "Add to cart" },
                orders: { label: "Orders" },
                returningCustomers: { label: "Returning customers" },
              }}
              containerHeight={300}
            />
          </ExampleCard>

          <ExampleCard
            title="Revenue, gross profit, and ad spend"
            description="A compact monthly trend that looks like a finance review in a real commerce team."
          >
            <AreaChart
              data={revenueData}
              dataKey="month"
              config={{
                revenue: { label: "Revenue", fillOpacity: 0.22 },
                grossProfit: { label: "Gross profit", fillOpacity: 0.16 },
                adSpend: { label: "Ad spend", fillOpacity: 0.12 },
              }}
              containerHeight={300}
            />
          </ExampleCard>

          <ExampleCard
            title="Category mix"
            description="Where the store actually makes money across product categories."
          >
            <BarChart
              data={categorySalesData}
              dataKey="category"
              config={{
                revenue: { label: "Revenue" },
                refunds: { label: "Refunds" },
                units: { label: "Units sold" },
              }}
              containerHeight={300}
            />
          </ExampleCard>

          <ExampleCard
            title="Checkout funnel"
            description="A realistic conversion funnel from product view to purchase."
          >
            <FunnelChart
              data={checkoutFunnelData}
              dataKey="value"
              nameKey="stage"
              containerHeight={300}
            />
          </ExampleCard>

          <ExampleCard
            title="Channel mix"
            description="Order share by acquisition channel, useful for a campaign review."
          >
            <PieChart
              data={channelMixData}
              dataKey="value"
              nameKey="name"
              containerHeight={300}
            />
          </ExampleCard>

          <ExampleCard
            title="Campaign efficiency"
            description="Scatter plot of customer acquisition cost against ROAS."
          >
            <ScatterChart
              series={acquisitionScatterData}
              containerHeight={300}
            />
          </ExampleCard>

          <ExampleCard
            title="Store health"
            description="A radar view of product experience and service quality."
          >
            <RadarChart
              data={storeHealthData}
              dataKey="subject"
              config={{
                current: { label: "Current" },
                target: { label: "Target", fillOpacity: 0.12 },
              }}
              containerHeight={300}
            />
          </ExampleCard>

          <ExampleCard
            title="Fulfillment KPI"
            description="Operational targets for the warehouse and support team."
          >
            <RadialBarChart
              data={operationsKpiData}
              dataKey="metric"
              config={{
                actual: { label: "Actual" },
                target: { label: "Target" },
              }}
              containerHeight={300}
            />
          </ExampleCard>
        </div>

        <ExampleCard
          title="Conversion and revenue in one view"
          description="A composed chart is useful when the team wants to compare multiple chart types without switching screens."
        >
          <ComposedChart
            data={shopTrafficData}
            dataKey="day"
            config={{
              sessions: { label: "Sessions", type: "area", fillOpacity: 0.16 },
              orders: { label: "Orders", type: "bar", radius: 6 },
              returningCustomers: {
                label: "Returning customers",
                type: "line",
              },
            }}
            containerHeight={300}
          />
        </ExampleCard>
      </section>

      <section className="space-y-4">
        <div className="space-y-2">
          <Badge tone="outline">Infrastructure</Badge>
          <h2 className="text-2xl font-semibold tracking-tight">
            Disk partition layout like a partition manager
          </h2>
          <p className="max-w-3xl text-sm text-muted-foreground">
            This is not a storage-contents treemap. It is a partition map: one
            disk row, many partitions, and a free-space segment, just like a
            qdisk or disk manager view.
          </p>
        </div>

        <ExampleCard
          title="Disk 0 partitions"
          description="A single-row partition map with system, reserved, primary, recovery, and free-space segments."
        >
          <TreemapChart
            data={storageAllocationData}
            dataKey="value"
            nameKey="name"
            showLegend={false}
          />
        </ExampleCard>
      </section>
    </main>
  );
}
