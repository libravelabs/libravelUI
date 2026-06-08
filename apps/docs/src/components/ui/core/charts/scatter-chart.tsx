"use client";

import {
  ScatterChart as RechartsScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { cn } from "@/lib/utils";
import { ChartContainer } from "./chart-container";
import { ChartLegend, ChartTooltip } from "./chart-tooltip";
import type { ScatterChartProps } from "./chart-types";
import { getSeriesColor } from "./chart-utils";

export function ScatterChart<TData extends Record<string, unknown>>({
  series,
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
}: ScatterChartProps<TData>) {
  const firstSeries = series[0];

  if (!firstSeries) {
    return null;
  }

  return (
    <ChartContainer
      height={containerHeight}
      classNames={classNames}
    >
      <div className={cn("h-full min-h-0", classNames?.chart)}>
        <ResponsiveContainer width="100%" height="100%">
        <RechartsScatterChart margin={margin}>
          {showGrid ? (
            <CartesianGrid
              stroke="var(--border)"
              strokeDasharray="3 3"
              vertical={false}
              {...gridProps}
            />
          ) : null}

          <XAxis
            dataKey={firstSeries.xKey}
            type="number"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            {...xAxisProps}
          />
          <YAxis
            dataKey={firstSeries.yKey}
            type="number"
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
                content={(props) => <ChartTooltip {...props} classNames={{ root: classNames?.tooltip }} />}
              />
            )
          ) : null}

          {showLegend ? (
            renderLegend ? (
              <Legend content={(props) => renderLegend(props as never)} {...legendProps} />
            ) : (
              <Legend
                content={() => (
                  <ChartLegend
                    config={Object.fromEntries(
                      series.map((item, index) => [
                        item.name,
                        {
                          label: item.name,
                          color: item.color ?? getSeriesColor({}, item.name, index),
                        },
                      ]),
                    )}
                    classNames={{ root: classNames?.legend }}
                  />
                )}
                {...legendProps}
              />
            )
          ) : null}

          {series.map((item, index) => (
            <Scatter
              key={item.name}
              name={item.name}
              data={item.data}
              fill={item.color ?? getSeriesColor({}, item.name, index)}
            />
          ))}
        </RechartsScatterChart>
        </ResponsiveContainer>
      </div>
    </ChartContainer>
  );
}
