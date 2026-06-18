import type { ChartConfig, PieDatum, FunnelDatum, TreemapNode } from "@/components/ui/core/charts";

export type TrafficDatum = {
  day: string;
  sessions: number;
  orders: number;
  returningCustomers: number;
};

export type RevenueDatum = {
  month: string;
  revenue: number;
  grossProfit: number;
  adSpend: number;
};

export type CategorySalesDatum = {
  category: string;
  revenue: number;
  refunds: number;
  units: number;
};

export type FunnelStageDatum = FunnelDatum;
export type ChannelDatum = PieDatum;

export type HealthDatum = {
  subject: string;
  current: number;
  target: number;
};

export type OperationsDatum = {
  metric: string;
  actual: number;
  target: number;
};

export type ScatterPoint = {
  cost: number;
  roas: number;
};

export const shopTrafficData: readonly TrafficDatum[] = [
  { day: "Mon", sessions: 1240, orders: 84, returningCustomers: 310 },
  { day: "Tue", sessions: 1385, orders: 92, returningCustomers: 340 },
  { day: "Wed", sessions: 1268, orders: 88, returningCustomers: 322 },
  { day: "Thu", sessions: 1492, orders: 105, returningCustomers: 381 },
  { day: "Fri", sessions: 1710, orders: 126, returningCustomers: 430 },
  { day: "Sat", sessions: 1608, orders: 118, returningCustomers: 392 },
  { day: "Sun", sessions: 1422, orders: 97, returningCustomers: 355 },
];

export const shopTrafficConfig: ChartConfig<keyof TrafficDatum & string> = {
  sessions: { label: "Sessions", color: "var(--chart-1)", fill: "var(--chart-1)", stroke: "var(--chart-1)", strokeWidth: 2 },
  orders: { label: "Orders", color: "var(--chart-2)", fill: "var(--chart-2)", stroke: "var(--chart-2)", strokeWidth: 2 },
  returningCustomers: { label: "Returning customers", color: "var(--chart-3)", fill: "var(--chart-3)", stroke: "var(--chart-3)", strokeWidth: 2 },
};

export const revenueData: readonly RevenueDatum[] = [
  { month: "Jan", revenue: 42000, grossProfit: 24500, adSpend: 8200 },
  { month: "Feb", revenue: 46800, grossProfit: 27100, adSpend: 9100 },
  { month: "Mar", revenue: 50100, grossProfit: 28800, adSpend: 9800 },
  { month: "Apr", revenue: 53900, grossProfit: 31400, adSpend: 10200 },
  { month: "May", revenue: 58400, grossProfit: 33900, adSpend: 10800 },
  { month: "Jun", revenue: 62200, grossProfit: 36100, adSpend: 11400 },
];

export const revenueConfig: ChartConfig<keyof RevenueDatum & string> = {
  revenue: { label: "Revenue", color: "var(--chart-4)", fill: "var(--chart-4)", stroke: "var(--chart-4)", fillOpacity: 0.18 },
  grossProfit: { label: "Gross profit", color: "var(--chart-2)", fill: "var(--chart-2)", stroke: "var(--chart-2)", fillOpacity: 0.18 },
  adSpend: { label: "Ad spend", color: "var(--chart-1)", fill: "var(--chart-1)", stroke: "var(--chart-1)", fillOpacity: 0.18 },
};

export const categorySalesData: readonly CategorySalesDatum[] = [
  { category: "Electronics", revenue: 124000, refunds: 6200, units: 310 },
  { category: "Accessories", revenue: 73000, refunds: 2800, units: 540 },
  { category: "Home", revenue: 98000, refunds: 4100, units: 460 },
  { category: "Beauty", revenue: 54000, refunds: 1900, units: 370 },
];

export const categorySalesConfig: ChartConfig<keyof CategorySalesDatum & string> = {
  revenue: { label: "Revenue", color: "var(--chart-4)", fill: "var(--chart-4)", radius: 8 },
  refunds: { label: "Refunds", color: "var(--chart-2)", fill: "var(--chart-2)", radius: 8 },
  units: { label: "Units sold", color: "var(--chart-1)", fill: "var(--chart-1)", radius: 8 },
};

export const checkoutFunnelData: readonly FunnelStageDatum[] = [
  { label: "Product view", value: 14000, valueLabel: "14.0k sessions", color: "var(--chart-1)" },
  { label: "Add to cart", value: 5200, valueLabel: "5.2k sessions", color: "var(--chart-2)" },
  { label: "Shipping", value: 3100, valueLabel: "3.1k sessions", color: "var(--chart-3)" },
  { label: "Payment", value: 1900, valueLabel: "1.9k sessions", color: "var(--chart-4)" },
  { label: "Purchase", value: 1240, valueLabel: "1.24k orders", color: "var(--chart-5)" },
];

export const checkoutFunnelConfig: ChartConfig<string> = {
  "Product view": { label: "Product view", color: "var(--chart-1)" },
  "Add to cart": { label: "Add to cart", color: "var(--chart-2)" },
  Shipping: { label: "Shipping", color: "var(--chart-3)" },
  Payment: { label: "Payment", color: "var(--chart-4)" },
  Purchase: { label: "Purchase", color: "var(--chart-5)" },
};

export const channelMixData: readonly ChannelDatum[] = [
  { label: "Organic search", value: 42, valueLabel: "42%", color: "var(--chart-1)", textColor: "var(--background)" },
  { label: "Paid search", value: 21, valueLabel: "21%", color: "var(--chart-2)", textColor: "var(--background)" },
  { label: "Email", value: 14, valueLabel: "14%", color: "var(--chart-3)", textColor: "var(--background)" },
  { label: "Social", value: 13, valueLabel: "13%", color: "var(--chart-4)", textColor: "var(--background)" },
  { label: "Direct", value: 10, valueLabel: "10%", color: "var(--chart-5)", textColor: "var(--background)" },
];

export const channelMixConfig: ChartConfig<string> = {
  "Organic search": { label: "Organic search", color: "var(--chart-1)", fill: "var(--chart-1)", textColor: "var(--background)" },
  "Paid search": { label: "Paid search", color: "var(--chart-2)", fill: "var(--chart-2)", textColor: "var(--background)" },
  Email: { label: "Email", color: "var(--chart-3)", fill: "var(--chart-3)", textColor: "var(--background)" },
  Social: { label: "Social", color: "var(--chart-4)", fill: "var(--chart-4)", textColor: "var(--background)" },
  Direct: { label: "Direct", color: "var(--chart-5)", fill: "var(--chart-5)", textColor: "var(--background)" },
};

export const storeHealthData: readonly HealthDatum[] = [
  { subject: "Checkout", current: 82, target: 92 },
  { subject: "Search", current: 74, target: 88 },
  { subject: "Support", current: 69, target: 85 },
  { subject: "Inventory", current: 77, target: 90 },
  { subject: "Delivery", current: 71, target: 87 },
];

export const storeHealthConfig: ChartConfig<keyof HealthDatum & string> = {
  current: { label: "Current", color: "var(--chart-1)", fill: "var(--chart-1)" },
  target: { label: "Target", color: "var(--chart-3)", fill: "var(--chart-3)" },
};

export const operationsKpiData: readonly OperationsDatum[] = [
  { metric: "Uptime", actual: 98, target: 99 },
  { metric: "On-time", actual: 91, target: 95 },
  { metric: "Accuracy", actual: 96, target: 98 },
  { metric: "Satisfaction", actual: 88, target: 92 },
];

export const operationsKpiConfig: ChartConfig<keyof OperationsDatum & string> = {
  actual: { label: "Actual", color: "var(--chart-1)", fill: "var(--chart-1)" },
  target: { label: "Target", color: "var(--chart-2)", fill: "var(--chart-2)" },
};

export const acquisitionScatterData = [
  { name: "Brand A", data: [
    { cost: 12, roas: 4.6 }, { cost: 16, roas: 4.1 }, { cost: 18, roas: 3.8 },
  ], xKey: "cost", yKey: "roas", color: "var(--chart-1)" },
  { name: "Brand B", data: [
    { cost: 20, roas: 3.2 }, { cost: 24, roas: 3.0 }, { cost: 28, roas: 2.8 },
  ], xKey: "cost", yKey: "roas", color: "var(--chart-3)" },
] as const;

export const storageAllocationData: readonly TreemapNode[] = [
  { id: "efi", label: "EFI System", value: 2, valueLabel: "2 GB", color: "var(--chart-1)", textColor: "var(--background)" },
  { id: "msr", label: "Microsoft Reserved", value: 1, valueLabel: "1 GB", color: "var(--chart-2)", textColor: "var(--background)" },
  { id: "windows", label: "Windows (C:)", value: 68, valueLabel: "68 GB", color: "var(--chart-3)", textColor: "var(--background)" },
  { id: "recovery", label: "Recovery", value: 7, valueLabel: "7 GB", color: "var(--chart-4)", textColor: "var(--background)" },
  { id: "free", label: "Free Space", value: 22, valueLabel: "22 GB", color: "var(--muted)", textColor: "var(--foreground)" },
];
