"use client";

import {
  RadarChart as RechartsRadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChartContainer } from "./chart-container";
import { ChartLegend, ChartTooltip } from "./chart-tooltip";
import type { RadarChartProps } from "./chart-types";
import { cn } from "@/lib/utils";
import {
  getVisibleSeriesKeys,
  getSeriesColor,
  getSeriesConfig,
  getSeriesLabel,
} from "./chart-utils";

export function RadarChart<TData extends Record<string, unknown>>({
  data,
  dataKey,
  config,
  containerHeight = 320,
  classNames,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  margin = { top: 5, right: 8, bottom: 0, left: 0 },
  angleAxisProps,
  radiusAxisProps,
  renderTooltip,
  renderLegend,
}: RadarChartProps<TData>) {
  const seriesKeys = getVisibleSeriesKeys(config);

  return (
    <ChartContainer
      height={containerHeight}
      classNames={classNames}
    >
      <div className={cn("h-full min-h-0", classNames?.chart)}>
        <ResponsiveContainer width="100%" height="100%">
        <RechartsRadarChart data={data} margin={margin}>
          {showGrid ? <PolarGrid stroke="var(--border)" /> : null}

          <PolarAngleAxis
            dataKey={dataKey}
            tick={{ fill: "var(--muted-foreground)" }}
            {...angleAxisProps}
          />
          <PolarRadiusAxis
            tick={{ fill: "var(--muted-foreground)" }}
            axisLine={false}
            tickLine={false}
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
              <Radar
                key={seriesKey}
                name={getSeriesLabel(config, seriesKey)}
                dataKey={seriesKey}
                stroke={color}
                fill={color}
                fillOpacity={series?.fillOpacity ?? 0.2}
                strokeWidth={series?.strokeWidth ?? 2}
                hide={series?.hide}
              />
            );
          })}
        </RechartsRadarChart>
        </ResponsiveContainer>
      </div>
    </ChartContainer>
  );
}
