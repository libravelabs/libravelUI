import type { ChartConfig, ChartSeriesConfig, ChartTooltipItem } from "./chart-types";

export const CHART_TOKENS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
] as const;

export function getVisibleSeriesKeys(config?: ChartConfig): string[] {
  return Object.keys(config ?? {}).filter((key) => !config?.[key]?.hide);
}

export function getSeriesColor(
  config: ChartConfig | undefined,
  key: string,
  index: number,
): string {
  const token = CHART_TOKENS[index % CHART_TOKENS.length];
  return config?.[key]?.color ?? token;
}

export function getSeriesLabel(
  config: ChartConfig | undefined,
  key: string,
): string {
  const label = config?.[key]?.label;
  if (typeof label === "string") return label;
  return startCase(key);
}

export function getSeriesUnit(
  config: ChartConfig | undefined,
  key: string,
): string | undefined {
  return config?.[key]?.unit;
}

export function getSeriesConfig(
  config: ChartConfig | undefined,
  key: string,
): ChartSeriesConfig | undefined {
  return config?.[key];
}

export function startCase(value: string): string {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\w/g, (match) => match.toUpperCase());
}

export function formatChartValue(value: unknown, unit?: string): string {
  if (typeof value === "number") {
    return `${formatNumber(value)}${unit ? ` ${unit}` : ""}`;
  }

  if (typeof value === "string") {
    const numeric = Number(value);
    if (!Number.isNaN(numeric) && value.trim() !== "") {
      return `${formatNumber(numeric)}${unit ? ` ${unit}` : ""}`;
    }
    return unit ? `${value} ${unit}` : value;
  }

  if (typeof value === "bigint") {
    return `${value.toString()}${unit ? ` ${unit}` : ""}`;
  }

  return value == null ? "—" : String(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  }).format(value);
}

export function getChartItemKey(item: ChartTooltipItem): string {
  if (typeof item.dataKey === "string") return item.dataKey;
  if (typeof item.name === "string") return item.name;
  return "";
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
