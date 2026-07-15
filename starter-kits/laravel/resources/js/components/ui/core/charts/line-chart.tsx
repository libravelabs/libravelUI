import type { CSSProperties, ComponentProps } from "react";
import {
  CartesianGrid,
  Legend,
  Line as RechartsLine,
  LineChart as RechartsLineChart,
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
} from "./chart-shell";
import { ChartTooltip } from "./chart-tooltip";

export type LineChartProps<TData extends ChartDatum> = Omit<
  ComponentProps<typeof RechartsLineChart>,
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
  dot?: ComponentProps<typeof RechartsLine>["dot"];
  activeDot?: ComponentProps<typeof RechartsLine>["activeDot"];
  type?: ComponentProps<typeof RechartsLine>["type"];
};

export function LineChart<TData extends ChartDatum>({
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
  dot = false,
  activeDot = { r: 4 },
  type = "monotone",
  margin,
  ...chartProps
}: LineChartProps<TData>): JSX.Element {
  const series = Object.entries(config) as Array<
    [NumericSeriesKey<TData>, NonNullable<ChartConfig<TData>[NumericSeriesKey<TData>]>]
  >;

  return (
    <ChartSurface containerHeight={containerHeight} className={className} style={style}>
      <RechartsLineChart data={data} margin={margin} {...chartProps}>
        {!hideGrid ? <CartesianGrid strokeDasharray="3 3" {...cartesianGridProps} /> : null}
        {!hideXAxis ? <XAxis dataKey={dataKey} tickLine={false} axisLine={false} {...xAxisProps} /> : null}
        {!hideYAxis ? <YAxis tickLine={false} axisLine={false} width={40} {...yAxisProps} /> : null}
        {!hideTooltip ? <ChartTooltip {...tooltipProps} /> : null}
        {!hideLegend ? <Legend {...legendProps} /> : null}

        {series.map(([seriesKey, seriesConfig], index) => (
          <RechartsLine
            key={seriesKey}
            dataKey={seriesKey}
            name={getSeriesLabel(seriesConfig.label, seriesKey)}
            stroke={getChartColor(index, seriesConfig.color)}
            dot={dot}
            activeDot={activeDot}
            type={type}
            strokeWidth={2}
          />
        ))}
      </RechartsLineChart>
    </ChartSurface>
  );
}
