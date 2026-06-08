export type ShopTrafficPoint = {
  day: string;
  sessions: number;
  addToCart: number;
  orders: number;
  returningCustomers: number;
};

export type RevenuePoint = {
  month: string;
  revenue: number;
  grossProfit: number;
  adSpend: number;
};

export type CategorySalesPoint = {
  category: string;
  revenue: number;
  refunds: number;
  units: number;
};

export type CheckoutStagePoint = {
  stage: string;
  value: number;
};

export type ChannelMixPoint = {
  name: string;
  value: number;
};

export type StoreHealthPoint = {
  subject: string;
  current: number;
  target: number;
};

export type OperationsKpiPoint = {
  metric: string;
  actual: number;
  target: number;
};

export type CampaignPoint = {
  cac: number;
  roas: number;
};

export type ScatterSeriesPoint = {
  name: string;
  color: string;
  data: readonly CampaignPoint[];
  xKey: "cac";
  yKey: "roas";
};

export type PartitionLayoutPoint = {
  name: string;
  value: number;
  fill?: string;
};

export const shopTrafficData: readonly ShopTrafficPoint[] = [
  {
    day: "Mon",
    sessions: 4120,
    addToCart: 398,
    orders: 164,
    returningCustomers: 71,
  },
  {
    day: "Tue",
    sessions: 4380,
    addToCart: 425,
    orders: 181,
    returningCustomers: 78,
  },
  {
    day: "Wed",
    sessions: 4510,
    addToCart: 441,
    orders: 176,
    returningCustomers: 82,
  },
  {
    day: "Thu",
    sessions: 4870,
    addToCart: 489,
    orders: 210,
    returningCustomers: 91,
  },
  {
    day: "Fri",
    sessions: 5290,
    addToCart: 540,
    orders: 228,
    returningCustomers: 97,
  },
  {
    day: "Sat",
    sessions: 4680,
    addToCart: 472,
    orders: 201,
    returningCustomers: 88,
  },
  {
    day: "Sun",
    sessions: 5015,
    addToCart: 498,
    orders: 217,
    returningCustomers: 94,
  },
] as const;

export const revenueData: readonly RevenuePoint[] = [
  { month: "Jan", revenue: 28400, grossProfit: 9800, adSpend: 4200 },
  { month: "Feb", revenue: 30100, grossProfit: 10350, adSpend: 4600 },
  { month: "Mar", revenue: 29650, grossProfit: 10120, adSpend: 4400 },
  { month: "Apr", revenue: 33800, grossProfit: 11640, adSpend: 4900 },
  { month: "May", revenue: 36250, grossProfit: 12480, adSpend: 5300 },
  { month: "Jun", revenue: 38850, grossProfit: 13390, adSpend: 5600 },
] as const;

export const categorySalesData: readonly CategorySalesPoint[] = [
  { category: "Apparel", revenue: 18400, refunds: 620, units: 960 },
  { category: "Footwear", revenue: 22100, refunds: 840, units: 730 },
  { category: "Accessories", revenue: 14900, refunds: 310, units: 1180 },
  { category: "Home", revenue: 17350, refunds: 540, units: 510 },
  { category: "Beauty", revenue: 12600, refunds: 260, units: 640 },
] as const;

export const checkoutFunnelData: readonly CheckoutStagePoint[] = [
  { stage: "Product view", value: 12600 },
  { stage: "Add to cart", value: 4680 },
  { stage: "Shipping", value: 2860 },
  { stage: "Payment", value: 1890 },
  { stage: "Purchase", value: 1460 },
] as const;

export const channelMixData: readonly ChannelMixPoint[] = [
  {
    name: "Organic search",
    value: 38,
    fill: "var(--chart-1)",
    stroke: "var(--background)",
    className: "fill-[var(--chart-1)] hover:opacity-80",
    textColor: "var(--foreground)",
    labelClassName: "font-semibold text-[11px]",
  },
  {
    name: "Paid search",
    value: 24,
    fill: "var(--chart-2)",
    stroke: "var(--background)",
    className: "fill-[var(--chart-2)]",
    textColor: "var(--foreground)",
  },
  {
    name: "Email",
    value: 15,
    fill: "var(--chart-3)",
    stroke: "var(--background)",
    className: "fill-[var(--chart-3)]",
    textColor: "var(--foreground)",
  },
] as const;

export const storeHealthData: readonly StoreHealthPoint[] = [
  { subject: "Speed", current: 86, target: 92 },
  { subject: "UX", current: 89, target: 90 },
  { subject: "Trust", current: 84, target: 88 },
  { subject: "Support", current: 91, target: 89 },
  { subject: "Retention", current: 77, target: 82 },
] as const;

export const operationsKpiData: readonly OperationsKpiPoint[] = [
  { metric: "Pick accuracy", actual: 97, target: 99 },
  { metric: "On-time dispatch", actual: 94, target: 96 },
  { metric: "Return handling", actual: 89, target: 92 },
  { metric: "Inventory sync", actual: 98, target: 99 },
] as const;

export const acquisitionScatterData: readonly ScatterSeriesPoint[] = [
  {
    name: "Prospecting",
    color: "var(--chart-1)",
    xKey: "cac",
    yKey: "roas",
    data: [
      { cac: 18, roas: 3.1 },
      { cac: 21, roas: 2.9 },
      { cac: 24, roas: 2.7 },
      { cac: 27, roas: 2.4 },
    ],
  },
  {
    name: "Retargeting",
    color: "var(--chart-3)",
    xKey: "cac",
    yKey: "roas",
    data: [
      { cac: 9, roas: 5.2 },
      { cac: 11, roas: 4.8 },
      { cac: 13, roas: 4.4 },
      { cac: 15, roas: 4.1 },
    ],
  },
] as const;

export const storageAllocationData = [
  {
    name: "EFI System",
    value: Math.log10(17 + 1),
    fill: "var(--chart-1)",
    textColor: "#000",
  },
  {
    name: "Microsoft Reserved",
    value: Math.log10(16 + 1),
    fill: "var(--chart-2)",
    textColor: "#000",
  },
  {
    name: "NTFS (C:)",
    value: Math.log10(512000 + 1),
    fill: "var(--chart-3)",
    textColor: "#000",
  },
  {
    name: "Free Space",
    value: Math.log10(980 + 1),
    fill: "var(--muted)",
  },
] as const;
