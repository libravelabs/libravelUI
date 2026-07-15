import type { CSSProperties, ComponentProps } from "react";
import {
  Cell,
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar as RechartsRadialBar,
  RadialBarChart as RechartsRadialBarChart,
} from "recharts";
import {
  ChartSurface,
  getChartColor,
  type ChartSeriesConfig,
} from "./chart-shell";
import { ChartTooltip } from "./chart-tooltip";

export type RadialBarChartProps<TData extends Record<string, unknown>> = Omit<
  ComponentProps<typeof RechartsRadialBarChart>,
  "data" | "width" | "height" | "children"
> & {
  data: TData[];
  nameKey: Extract<keyof TData, string>;
  valueKey: Extract<keyof TData, string>;
  config?: ChartSeriesConfig;
  containerHeight?: number | string;
  className?: string;
  style?: CSSProperties;
  tooltipProps?: ComponentProps<typeof ChartTooltip>;
  legendProps?: ComponentProps<typeof Legend>;
  angleAxisProps?: Omit<ComponentProps<typeof PolarAngleAxis>, "dataKey">;
  radiusAxisProps?: ComponentProps<typeof PolarRadiusAxis>;
  hideTooltip?: boolean;
  hideLegend?: boolean;
  innerRadius?: number | string;
  outerRadius?: number | string;
  startAngle?: number;
  endAngle?: number;
  barSize?: number;
};

export function RadialBarChart<TData extends Record<string, unknown>>({
  data,
  nameKey,
  valueKey,
  config,
  containerHeight,
  className,
  style,
  tooltipProps,
  legendProps,
  angleAxisProps,
  radiusAxisProps,
  hideTooltip = false,
  hideLegend = true,
  innerRadius = "20%",
  outerRadius = "90%",
  startAngle = 180,
  endAngle = 0,
  barSize,
  ...chartProps
}: RadialBarChartProps<TData>): JSX.Element {
  const label = config?.label ?? valueKey;
  const seriesName =
    typeof label === "string" || typeof label === "number" ? String(label) : valueKey;
  const seriesColor = config?.color;

  return (
    <ChartSurface containerHeight={containerHeight} className={className} style={style}>
      <RechartsRadialBarChart
        data={data}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        barSize={barSize}
        {...chartProps}
      >
        <PolarGrid gridType="circle" />
        <PolarAngleAxis
          dataKey={nameKey}
          type="category"
          tickLine={false}
          axisLine={false}
          {...angleAxisProps}
        />
        <PolarRadiusAxis
          tick={false}
          tickLine={false}
          axisLine={false}
          {...radiusAxisProps}
        />
        {!hideTooltip ? <ChartTooltip {...tooltipProps} /> : null}
        {!hideLegend ? <Legend {...legendProps} /> : null}

        <RechartsRadialBar
          dataKey={valueKey}
          name={seriesName}
          fill={getChartColor(0, seriesColor)}
          cornerRadius={8}
        >
          {data.map((entry, index) => {
            const entryRecord = entry as Record<string, unknown>;
            const entryColor =
              typeof entryRecord.color === "string"
                ? entryRecord.color
                : getChartColor(index, seriesColor);

            return <Cell key={String(entryRecord[nameKey] ?? index)} fill={entryColor} />;
          })}
        </RechartsRadialBar>
      </RechartsRadialBarChart>
    </ChartSurface>
  );
}
