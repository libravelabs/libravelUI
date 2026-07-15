import type { CSSProperties, ComponentProps } from "react";
import {
  CartesianGrid,
  Scatter as RechartsScatter,
  ScatterChart as RechartsScatterChart,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import { ChartSurface, getChartColor, getSeriesLabel, type ChartSeriesConfig } from "./chart-shell";
import { ChartTooltip } from "./chart-tooltip";

export type ScatterChartProps<TData extends Record<string, unknown>> = Omit<
  ComponentProps<typeof RechartsScatterChart>,
  "data" | "width" | "height" | "children"
> & {
  data: TData[];
  xDataKey: Extract<keyof TData, string>;
  yDataKey: Extract<keyof TData, string>;
  zDataKey?: Extract<keyof TData, string>;
  config?: ChartSeriesConfig;
  containerHeight?: number | string;
  className?: string;
  style?: CSSProperties;
  xAxisProps?: Omit<ComponentProps<typeof XAxis>, "dataKey">;
  yAxisProps?: Omit<ComponentProps<typeof YAxis>, "dataKey">;
  zAxisProps?: Omit<ComponentProps<typeof ZAxis>, "dataKey">;
  cartesianGridProps?: ComponentProps<typeof CartesianGrid>;
  tooltipProps?: ComponentProps<typeof ChartTooltip>;
  hideGrid?: boolean;
  hideTooltip?: boolean;
};

export function ScatterChart<TData extends Record<string, unknown>>({
  data,
  xDataKey,
  yDataKey,
  zDataKey,
  config,
  containerHeight,
  className,
  style,
  xAxisProps,
  yAxisProps,
  zAxisProps,
  cartesianGridProps,
  tooltipProps,
  hideGrid = false,
  hideTooltip = false,
  margin,
  ...chartProps
}: ScatterChartProps<TData>): JSX.Element {
  const label = config?.label ?? "Points";
  const color = getChartColor(0, config?.color);

  return (
    <ChartSurface containerHeight={containerHeight} className={className} style={style}>
      <RechartsScatterChart data={data} margin={margin} {...chartProps}>
        {!hideGrid ? <CartesianGrid strokeDasharray="3 3" {...cartesianGridProps} /> : null}
        <XAxis type="number" dataKey={xDataKey} tickLine={false} axisLine={false} {...xAxisProps} />
        <YAxis type="number" dataKey={yDataKey} tickLine={false} axisLine={false} {...yAxisProps} />
        {zDataKey ? <ZAxis dataKey={zDataKey} range={[60, 400]} {...zAxisProps} /> : null}
        {!hideTooltip ? <ChartTooltip {...tooltipProps} /> : null}
        <RechartsScatter name={label} data={data} fill={color} />
      </RechartsScatterChart>
    </ChartSurface>
  );
}
