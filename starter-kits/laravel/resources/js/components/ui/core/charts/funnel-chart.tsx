import type { CSSProperties, ComponentProps } from "react";
import { Cell, Funnel as RechartsFunnel, FunnelChart as RechartsFunnelChart, Legend, LabelList } from "recharts";
import { ChartSurface, getChartColor, type RuntimeChartConfig } from "./chart-shell";
import { ChartTooltip } from "./chart-tooltip";

export type FunnelChartProps<TData extends Record<string, unknown>> = Omit<
  ComponentProps<typeof RechartsFunnelChart>,
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
  labelListProps?: ComponentProps<typeof LabelList>;
  hideTooltip?: boolean;
  hideLegend?: boolean;
};

export function FunnelChart<TData extends Record<string, unknown>>({
  data,
  dataKey,
  nameKey,
  config,
  containerHeight,
  className,
  style,
  tooltipProps,
  legendProps,
  labelListProps,
  hideTooltip = false,
  hideLegend = false,
  ...chartProps
}: FunnelChartProps<TData>): JSX.Element {
  const palette = config ?? {};

  return (
    <ChartSurface containerHeight={containerHeight} className={className} style={style}>
      <RechartsFunnelChart {...chartProps}>
        {!hideTooltip ? <ChartTooltip {...tooltipProps} /> : null}
        {!hideLegend ? <Legend {...legendProps} /> : null}
        <RechartsFunnel dataKey={dataKey} data={data} isAnimationActive>
          <LabelList position="right" dataKey={nameKey} {...labelListProps} />
          {data.map((entry, index) => {
            const key = String(entry[nameKey]);
            const color = palette[key]?.color;
            return <Cell key={key} fill={getChartColor(index, color)} />;
          })}
        </RechartsFunnel>
      </RechartsFunnelChart>
    </ChartSurface>
  );
}
