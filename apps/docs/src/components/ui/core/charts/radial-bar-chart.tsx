"use client";

import {
  RadialBarChart as RechartsRadialBarChart,
  RadialBar,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChartContainer } from "./chart-container";
import { ChartLegend, ChartTooltip } from "./chart-tooltip";
import type { RadialBarChartProps } from "./chart-types";
import { cn } from "@/lib/utils";
import {
  getVisibleSeriesKeys,
  getSeriesColor,
  getSeriesConfig,
  getSeriesLabel,
} from "./chart-utils";

export function RadialBarChart<TData extends Record<string, unknown>>({
  data,
  dataKey,
  config,
  containerHeight = 320,
  classNames,
  showLegend = true,
  showTooltip = true,
  startAngle = 90,
  endAngle = -270,
  innerRadius = 30,
  outerRadius = 120,
  barSize,
  angleAxisProps,
  radiusAxisProps,
  renderTooltip,
  renderLegend,
}: RadialBarChartProps<TData>) {
  const seriesKeys = getVisibleSeriesKeys(config);

  return (
    <ChartContainer
      height={containerHeight}
      classNames={classNames}
    >
      <div className={cn("h-full min-h-0", classNames?.chart)}>
        <ResponsiveContainer width="100%" height="100%">
        <RechartsRadialBarChart
          data={data}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
        >
          <PolarAngleAxis
            dataKey={dataKey}
            type="category"
            tick={{ fill: "var(--muted-foreground)" }}
            {...angleAxisProps}
          />
          <PolarRadiusAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--muted-foreground)" }}
            {...radiusAxisProps}
          />

          {showTooltip ? (
            renderTooltip ? (
              <Tooltip content={(props) => renderTooltip(props as never)} />
            ) : (
              <Tooltip content={(props) => <ChartTooltip {...props} config={config} classNames={{ root: classNames?.tooltip }} />} />
            )
          ) : null}

          {showLegend ? (
            renderLegend ? (
              <Legend content={(props) => renderLegend(props as never)} />
            ) : (
              <Legend content={(props) => <ChartLegend {...props} config={config} classNames={{ root: classNames?.legend }} />} />
            )
          ) : null}

          {seriesKeys.map((seriesKey, index) => {
            const series = getSeriesConfig(config, seriesKey);
            const color = getSeriesColor(config, seriesKey, index);

            return (
              <RadialBar
                key={seriesKey}
                dataKey={seriesKey}
                name={getSeriesLabel(config, seriesKey)}
                fill={color}
                barSize={barSize}
                cornerRadius={series?.radius ?? 4}
                hide={series?.hide}
              />
            );
          })}
        </RechartsRadialBarChart>
        </ResponsiveContainer>
      </div>
    </ChartContainer>
  );
}
