"use client";

import {
  LineChart as RechartsLineChart,
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
import type { CartesianChartProps } from "./chart-types";
import {
  getVisibleSeriesKeys,
  getSeriesColor,
  getSeriesConfig,
  getSeriesLabel,
} from "./chart-utils";
import { cn } from "@/lib/utils";

export function LineChart<TData extends Record<string, unknown>>({
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
  renderXAxis,
  renderYAxis,
}: CartesianChartProps<TData>) {
  const seriesKeys = getVisibleSeriesKeys(config);

  return (
    <ChartContainer
      height={containerHeight}
      classNames={classNames}
    >
      <div className={cn("h-full min-h-0", classNames?.chart)}>
        <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart data={data} margin={margin}>
          {showGrid ? (
            <CartesianGrid
              stroke="var(--border)"
              strokeDasharray="3 3"
              vertical={false}
              {...gridProps}
            />
          ) : null}

          {renderXAxis ? (
            renderXAxis({
              dataKey,
              tickLine: false,
              axisLine: false,
              tickMargin: 10,
              ...xAxisProps,
            } as unknown as Parameters<typeof renderXAxis>[0])
          ) : (
            <XAxis
              dataKey={dataKey}
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              {...xAxisProps}
            />
          )}

          {renderYAxis ? (
            renderYAxis({
              tickLine: false,
              axisLine: false,
              tickMargin: 10,
              ...yAxisProps,
            } as unknown as Parameters<typeof renderYAxis>[0])
          ) : (
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              {...yAxisProps}
            />
          )}

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

            return (
              <Line
                key={seriesKey}
                dataKey={seriesKey}
                name={getSeriesLabel(config, seriesKey)}
                type={series?.type ?? "monotone"}
                stroke={color}
                strokeWidth={series?.strokeWidth ?? 2}
                dot={false}
                activeDot={{ r: 4 }}
                unit={series?.unit}
                hide={series?.hide}
              />
            );
          })}
        </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </ChartContainer>
  );
}
