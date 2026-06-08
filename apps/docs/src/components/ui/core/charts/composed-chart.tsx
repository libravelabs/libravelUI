"use client";

import {
  ComposedChart as RechartsComposedChart,
  Area,
  Bar,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChartContainer } from "./chart-container";
import { ChartLegend, ChartTooltip } from "./chart-tooltip";
import type { ComposedChartProps } from "./chart-types";
import { cn } from "@/lib/utils";
import {
  getVisibleSeriesKeys,
  getSeriesColor,
  getSeriesConfig,
  getSeriesLabel,
} from "./chart-utils";

export function ComposedChart<TData extends Record<string, unknown>>({
  data,
  dataKey,
  config,
  containerHeight = 320,
  classNames,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  margin = { top: 5, right: 8, bottom: 0, left: 0 },
  xAxisProps,
  yAxisProps,
  gridProps,
  legendProps,
  renderTooltip,
  renderLegend,
}: ComposedChartProps<TData>) {
  const seriesKeys = getVisibleSeriesKeys(config);

  return (
    <ChartContainer
      height={containerHeight}
      classNames={classNames}
    >
      <div className={cn("h-full min-h-0", classNames?.chart)}>
        <ResponsiveContainer width="100%" height="100%">
        <RechartsComposedChart data={data} margin={margin}>
          {showGrid ? (
            <CartesianGrid
              stroke="var(--border)"
              strokeDasharray="3 3"
              vertical={false}
              {...gridProps}
            />
          ) : null}

          <XAxis
            dataKey={dataKey}
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            {...xAxisProps}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            {...yAxisProps}
          />

          {showTooltip ? (
            renderTooltip ? (
              <Tooltip
                cursor={{ stroke: "var(--border)" }}
                content={(props) => renderTooltip(props as never)}
              />
            ) : (
              <Tooltip
                cursor={{ stroke: "var(--border)" }}
                content={(props) => <ChartTooltip {...props} config={config} classNames={{ root: classNames?.tooltip }} />}
              />
            )
          ) : null}

          {showLegend ? (
            renderLegend ? (
              <Legend content={(props) => renderLegend(props as never)} {...legendProps} />
            ) : (
              <Legend content={(props) => <ChartLegend {...props} config={config} classNames={{ root: classNames?.legend }} />} {...legendProps} />
            )
          ) : null}

          {seriesKeys.map((seriesKey, index) => {
            const series = getSeriesConfig(config, seriesKey);
            const color = getSeriesColor(config, seriesKey, index);
            const label = getSeriesLabel(config, seriesKey);

            switch (series?.type) {
              case "bar":
                return (
                  <Bar
                    key={seriesKey}
                    dataKey={seriesKey}
                    name={label}
                    fill={color}
                    radius={series.radius ?? 4}
                    stackId={series.stackId}
                    hide={series.hide}
                    unit={series.unit}
                  />
                );
              case "area":
                return (
                  <Area
                    key={seriesKey}
                    dataKey={seriesKey}
                    name={label}
                    type="monotone"
                    stroke={color}
                    fill={color}
                    fillOpacity={series.fillOpacity ?? 0.2}
                    strokeWidth={series.strokeWidth ?? 2}
                    hide={series.hide}
                    unit={series.unit}
                  />
                );
              default:
                return (
                  <Line
                    key={seriesKey}
                    dataKey={seriesKey}
                    name={label}
                    type={series?.type ?? "monotone"}
                    stroke={color}
                    strokeWidth={series?.strokeWidth ?? 2}
                    dot={false}
                    activeDot={{ r: 4 }}
                    hide={series?.hide}
                    unit={series?.unit}
                  />
                );
            }
          })}
        </RechartsComposedChart>
        </ResponsiveContainer>
      </div>
    </ChartContainer>
  );
}
