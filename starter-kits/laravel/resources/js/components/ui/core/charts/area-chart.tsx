import type { CSSProperties, ComponentProps } from "react";
import {
  Area as RechartsArea,
  AreaChart as RechartsAreaChart,
  CartesianGrid,
  Legend,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartSurface,
  getChartColor,
  getSeriesLabel,
  joinClassNames,
  type ChartConfig,
  type ChartDatum,
  type NumericSeriesKey,
} from "./chart-shell";
import { ChartTooltip } from "./chart-tooltip";

export type AreaChartProps<TData extends ChartDatum> = Omit<
  ComponentProps<typeof RechartsAreaChart>,
  "data" | "width" | "height" | "children"
> & {
  data: TData[];
  dataKey: Extract<keyof TData, string>;
  config: ChartConfig<TData>;
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
  stacked?: boolean;
  type?: ComponentProps<typeof RechartsArea>["type"];
};

export function AreaChart<TData extends ChartDatum>({
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
  stacked = false,
  type = "monotone",
  margin,
  ...chartProps
}: AreaChartProps<TData>) {
  const series = Object.entries(config) as Array<
    [
      NumericSeriesKey<TData>,
      NonNullable<ChartConfig<TData>[NumericSeriesKey<TData>]>,
    ]
  >;

  return (
    <ChartSurface
      containerHeight={containerHeight}
      className={className}
      style={style}
    >
      <RechartsAreaChart data={data} margin={margin} {...chartProps}>
        {!hideGrid ? (
          <CartesianGrid strokeDasharray="3 3" {...cartesianGridProps} />
        ) : null}
        {!hideXAxis ? (
          <XAxis
            dataKey={dataKey}
            tickLine={false}
            axisLine={false}
            {...xAxisProps}
          />
        ) : null}
        {!hideYAxis ? (
          <YAxis tickLine={false} axisLine={false} width={40} {...yAxisProps} />
        ) : null}
        {!hideTooltip ? <ChartTooltip {...tooltipProps} /> : null}
        {!hideLegend ? <Legend {...legendProps} /> : null}

        {series.map(([seriesKey, seriesConfig], index) => (
          <RechartsArea
            key={seriesKey}
            dataKey={seriesKey}
            name={getSeriesLabel(seriesConfig.label, seriesKey)}
            stroke={getChartColor(index, seriesConfig.color)}
            fill={getChartColor(index, seriesConfig.color)}
            fillOpacity={0.22}
            type={type}
            stackId={stacked ? "stack" : undefined}
            dot={false}
            activeDot={{ r: 4 }}
          />
        ))}
      </RechartsAreaChart>
    </ChartSurface>
  );
}
