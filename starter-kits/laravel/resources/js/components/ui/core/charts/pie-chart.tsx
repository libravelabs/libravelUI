import type { CSSProperties, ComponentProps } from "react";
import { Cell, Legend, Pie as RechartsPie, PieChart as RechartsPieChart } from "recharts";
import { ChartSurface, getChartColor, type RuntimeChartConfig } from "./chart-shell";
import { ChartTooltip } from "./chart-tooltip";

export type PieChartProps<TData extends Record<string, unknown>> = Omit<
  ComponentProps<typeof RechartsPieChart>,
  "width" | "height" | "children"
> & {
  data: TData[];
  dataKey: Extract<keyof TData, string>;
  nameKey: Extract<keyof TData, string>;
  config?: RuntimeChartConfig;
  containerHeight?: number | string;
  className?: string;
  style?: CSSProperties;
  tooltipProps?: ComponentProps<typeof ChartTooltip>;
  legendProps?: ComponentProps<typeof Legend>;
  hideTooltip?: boolean;
  hideLegend?: boolean;
  outerRadius?: number | string;
  innerRadius?: number | string;
  label?: boolean;
};

export function PieChart<TData extends Record<string, unknown>>({
  data,
  dataKey,
  nameKey,
  config,
  containerHeight,
  className,
  style,
  tooltipProps,
  legendProps,
  hideTooltip = false,
  hideLegend = false,
  outerRadius = 90,
  innerRadius,
  label = true,
  margin,
  ...chartProps
}: PieChartProps<TData>): JSX.Element {
  const colorConfig = config ?? {};

  return (
    <ChartSurface containerHeight={containerHeight} className={className} style={style}>
      <RechartsPieChart margin={margin} {...chartProps}>
        {!hideTooltip ? <ChartTooltip {...tooltipProps} /> : null}
        {!hideLegend ? <Legend {...legendProps} /> : null}
        <RechartsPie data={data} dataKey={dataKey} nameKey={nameKey} outerRadius={outerRadius} innerRadius={innerRadius} label={label}>
          {data.map((entry, index) => {
            const rawKey = String(entry[nameKey]);
            const color = colorConfig[rawKey]?.color;
            return <Cell key={rawKey} fill={getChartColor(index, color)} />;
          })}
        </RechartsPie>
      </RechartsPieChart>
    </ChartSurface>
  );
}
