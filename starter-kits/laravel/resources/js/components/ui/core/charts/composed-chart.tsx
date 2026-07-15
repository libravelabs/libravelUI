import type { CSSProperties, ComponentProps } from "react";
import {
  Area as RechartsArea,
  Bar as RechartsBar,
  CartesianGrid,
  ComposedChart as RechartsComposedChart,
  Legend,
  Line as RechartsLine,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartSurface,
  getChartColor,
  getSeriesLabel,
  type ChartConfig,
  type ChartDatum,
  type NumericSeriesKey,
  type ChartSeriesType,
} from "./chart-shell";
import { ChartTooltip } from "./chart-tooltip";

export type ComposedChartProps<TData extends ChartDatum> = Omit<
  ComponentProps<typeof RechartsComposedChart>,
  "data" | "width" | "height" | "children"
> & {
  data: TData[];
  dataKey: Extract<keyof TData, string>;
  config: Partial<Record<NumericSeriesKey<TData>, ChartConfig<TData>[NumericSeriesKey<TData>] & { type?: ChartSeriesType }>>;
  containerHeight?: number | string;
  className?: string;
  style?: CSSProperties;
  xAxisProps?: Omit<ComponentProps<typeof XAxis>, "dataKey">;
  yAxisProps?: Omit<ComponentProps<typeof YAxis>, "dataKey">;
  cartesianGridProps?: ComponentProps<typeof CartesianGrid>;
  tooltipProps?: ComponentProps<typeof ChartTooltip>;
  legendProps?: ComponentProps<typeof Legend>;
  hideGrid?: boolean;
  hideXAxis?: boolean;
  hideYAxis?: boolean;
  hideTooltip?: boolean;
  hideLegend?: boolean;
};

export function ComposedChart<TData extends ChartDatum>({
  data,
  dataKey,
  config,
  containerHeight,
  className,
  style,
  xAxisProps,
  yAxisProps,
  cartesianGridProps,
  tooltipProps,
  legendProps,
  hideGrid = false,
  hideXAxis = false,
  hideYAxis = false,
  hideTooltip = false,
  hideLegend = false,
  margin,
  ...chartProps
}: ComposedChartProps<TData>): JSX.Element {
  const series = Object.entries(config) as Array<
    [NumericSeriesKey<TData>, NonNullable<ComposedChartProps<TData>["config"][NumericSeriesKey<TData>]>]
  >;

  return (
    <ChartSurface containerHeight={containerHeight} className={className} style={style}>
      <RechartsComposedChart data={data} margin={margin} {...chartProps}>
        {!hideGrid ? <CartesianGrid strokeDasharray="3 3" {...cartesianGridProps} /> : null}
        {!hideXAxis ? <XAxis dataKey={dataKey} tickLine={false} axisLine={false} {...xAxisProps} /> : null}
        {!hideYAxis ? <YAxis tickLine={false} axisLine={false} width={40} {...yAxisProps} /> : null}
        {!hideTooltip ? <ChartTooltip {...tooltipProps} /> : null}
        {!hideLegend ? <Legend {...legendProps} /> : null}

        {series.map(([seriesKey, seriesConfig], index) => {
          const color = getChartColor(index, seriesConfig.color);
          const label = getSeriesLabel(seriesConfig.label, seriesKey);
          const type = seriesConfig.type ?? "line";

          if (type === "area") {
            return (
              <RechartsArea
                key={seriesKey}
                dataKey={seriesKey}
                name={label}
                stroke={color}
                fill={color}
                fillOpacity={0.22}
                type="monotone"
              />
            );
          }

          if (type === "bar") {
            return (
              <RechartsBar
                key={seriesKey}
                dataKey={seriesKey}
                name={label}
                fill={color}
                radius={[8, 8, 0, 0]}
              />
            );
          }

          return (
            <RechartsLine
              key={seriesKey}
              dataKey={seriesKey}
              name={label}
              stroke={color}
              strokeWidth={2}
              dot={false}
              type="monotone"
            />
          );
        })}
      </RechartsComposedChart>
    </ChartSurface>
  );
}
