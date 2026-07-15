import type { CSSProperties, ReactNode } from "react";
import { ResponsiveContainer } from "recharts";

export const CHART_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
] as const;

export type ChartSeriesType = "area" | "bar" | "line";

export type ChartSeriesConfig = {
  label?: ReactNode;
  color?: string;
  type?: ChartSeriesType;
};

export type ChartDatum = Record<string, unknown>;

export type NumericSeriesKey<TData extends ChartDatum> = Extract<{
  [K in keyof TData]-?: NonNullable<TData[K]> extends number ? K : never;
}[keyof TData], string>;

export type ChartConfig<TData extends ChartDatum> = Partial<
  Record<NumericSeriesKey<TData>, ChartSeriesConfig>
>;

export type RuntimeChartConfig = Record<string, ChartSeriesConfig | undefined>;

export type ChartSurfaceProps = {
  containerHeight?: number | string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

export function joinClassNames(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function getChartColor(index: number, color?: string): string {
  return color ?? CHART_COLORS[index % CHART_COLORS.length] ?? CHART_COLORS[0];
}

export function getSeriesLabel(label: ReactNode | undefined, key: string): ReactNode {
  return label ?? key;
}

export function ChartSurface({
  containerHeight = 320,
  className,
  style,
  children,
}: ChartSurfaceProps): JSX.Element {
  return (
    <div
      className={joinClassNames(
        "w-full min-w-0 overflow-hidden rounded-2xl border bg-card p-3 shadow-sm",
        className,
      )}
      style={{
        height: containerHeight,
        minWidth: 0,
        minHeight: 0,
        ...style,
      }}
    >
      <div className="h-full min-h-0 min-w-0">
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
          {children}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
