import type { CSSProperties, ComponentProps } from "react";
import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar as RechartsRadar,
  RadarChart as RechartsRadarChart,
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

export type RadarChartProps<TData extends ChartDatum> = Omit<
  ComponentProps<typeof RechartsRadarChart>,
  "data" | "width" | "height" | "children"
> & {
  data: TData[];
  dataKey: Extract<keyof TData, string>;
  config: ChartConfig<TData>;
  containerHeight?: number | string;
  className?: string;
  style?: CSSProperties;
  tooltipProps?: ComponentProps<typeof ChartTooltip>;
  legendProps?: ComponentProps<typeof Legend>;
  angleAxisProps?: Omit<ComponentProps<typeof PolarAngleAxis>, "dataKey">;
  radiusAxisProps?: ComponentProps<typeof PolarRadiusAxis>;
  gridProps?: ComponentProps<typeof PolarGrid>;
  hideTooltip?: boolean;
  hideLegend?: boolean;
};

export function RadarChart<TData extends ChartDatum>({
  data,
  dataKey,
  config,
  containerHeight,
  className,
  style,
  tooltipProps,
  legendProps,
  angleAxisProps,
  radiusAxisProps,
  gridProps,
  hideTooltip = false,
  hideLegend = false,
  ...chartProps
}: RadarChartProps<TData>): JSX.Element {
  const series = Object.entries(config) as Array<
    [NumericSeriesKey<TData>, NonNullable<ChartConfig<TData>[NumericSeriesKey<TData>]>]
  >;

  return (
    <ChartSurface containerHeight={containerHeight} className={className} style={style}>
      <RechartsRadarChart data={data} {...chartProps}>
        <PolarGrid {...gridProps} />
        <PolarAngleAxis dataKey={dataKey} {...angleAxisProps} />
        <PolarRadiusAxis {...radiusAxisProps} />
        {!hideTooltip ? <ChartTooltip {...tooltipProps} /> : null}
        {!hideLegend ? <Legend {...legendProps} /> : null}

        {series.map(([seriesKey, seriesConfig], index) => (
          <RechartsRadar
            key={seriesKey}
            name={getSeriesLabel(seriesConfig.label, seriesKey)}
            dataKey={seriesKey}
            stroke={getChartColor(index, seriesConfig.color)}
            fill={getChartColor(index, seriesConfig.color)}
            fillOpacity={0.18}
          />
        ))}
      </RechartsRadarChart>
    </ChartSurface>
  );
}
