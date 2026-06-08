"use client";

import {
  Cell,
  Legend,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { cn } from "@/lib/utils";
import { ChartContainer } from "./chart-container";
import { ChartLegend, ChartTooltip } from "./chart-tooltip";
import type { ChartConfig, PieChartProps, PieSliceDatum } from "./chart-types";
import { getSeriesColor } from "./chart-utils";

type PieLabelProps = {
  cx?: number;
  cy?: number;
  midAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
  percent?: number;
  payload?: PieSliceDatum;
  className?: string;
};

function resolveSliceKey<TData extends PieSliceDatum>(
  item: TData,
  nameKey: keyof TData & string,
  index: number,
): string {
  const keyed = item[nameKey];

  if (typeof keyed === "string" && keyed.trim().length > 0) {
    return keyed;
  }

  if (typeof item.label === "string" && item.label.trim().length > 0) {
    return item.label;
  }

  if (typeof item.name === "string" && item.name.trim().length > 0) {
    return item.name;
  }

  return `Item ${index + 1}`;
}

function buildPieConfig<TData extends PieSliceDatum>(
  data: readonly TData[],
  nameKey: keyof TData & string,
  config?: ChartConfig,
): ChartConfig {
  if (config) {
    return config;
  }

  return Object.fromEntries(
    data.map((item, index) => {
      const key = resolveSliceKey(item, nameKey, index);
      return [
        key,
        {
          label: key,
          color: item.fill ?? getSeriesColor(undefined, key, index),
        },
      ];
    }),
  );
}

function PieSliceLabel({
  cx = 0,
  cy = 0,
  midAngle = 0,
  innerRadius = 0,
  outerRadius = 0,
  percent = 0,
  payload,
  className,
}: PieLabelProps) {
  if (!payload) {
    return null;
  }

  const radians = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.62;
  const x = cx + radius * Math.cos(-midAngle * radians);
  const y = cy + radius * Math.sin(-midAngle * radians);

  const label =
    typeof payload.label === "string"
      ? payload.label
      : typeof payload.name === "string"
        ? payload.name
        : "Item";

  const value = typeof payload.value === "number" ? payload.value : undefined;
  const textColor = payload.textColor ?? "var(--foreground)";
  const anchor = x > cx ? "start" : "end";
  const showSecondLine = value !== undefined || percent > 0;

  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      dominantBaseline="middle"
      fill={textColor}
      className={cn(
        "pointer-events-none select-none text-[11px] font-medium leading-none",
        className,
      )}
    >
      <tspan x={x} dy={0}>
        {label}
      </tspan>
      {showSecondLine ? (
        <tspan x={x} dy={14}>
          {value !== undefined ? value.toLocaleString("en-US") : null}
          {value !== undefined && percent > 0 ? " · " : null}
          {percent > 0 ? `${Math.round(percent * 100)}%` : null}
        </tspan>
      ) : null}
    </text>
  );
}

export function PieChart<TData extends PieSliceDatum>({
  data,
  dataKey,
  nameKey,
  config,
  containerHeight = 320,
  classNames,
  showLegend = true,
  showTooltip = true,
  showLabels = false,
  innerRadius = "52%",
  outerRadius = "82%",
  paddingAngle = 3,
  cornerRadius = 10,
  startAngle = 90,
  endAngle = -270,
  renderTooltip,
  renderLegend,
  getCellClassName,
  getCellProps,
  getTextColor,
}: PieChartProps<TData>) {
  const enrichedData = data.map((item, index) => ({
    ...item,
    textColor: getTextColor?.(item, index) ?? item.textColor,
  }));

  const resolvedConfig = buildPieConfig(enrichedData, nameKey, config);

  return (
    <ChartContainer height={containerHeight} classNames={classNames}>
      <div className={cn("h-full min-h-0", classNames?.chart)}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
            {showTooltip ? (
              renderTooltip ? (
                <Tooltip content={(props) => renderTooltip(props as never)} />
              ) : (
                <Tooltip
                  content={(props) => (
                    <ChartTooltip
                      {...props}
                      config={resolvedConfig}
                      classNames={{ root: classNames?.tooltip }}
                    />
                  )}
                />
              )
            ) : null}

            {showLegend ? (
              renderLegend ? (
                <Legend content={(props) => renderLegend(props as never)} />
              ) : (
                <Legend
                  content={(props) => (
                    <ChartLegend
                      {...props}
                      config={resolvedConfig}
                      classNames={{ root: classNames?.legend }}
                    />
                  )}
                />
              )
            ) : null}

            <Pie
              data={enrichedData}
              dataKey={dataKey}
              nameKey={nameKey}
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              startAngle={startAngle}
              endAngle={endAngle}
              paddingAngle={paddingAngle}
              cornerRadius={cornerRadius}
              labelLine={false}
              label={showLabels ? (props) => <PieSliceLabel {...props} className={classNames?.label} /> : false}
              isAnimationActive="auto"
            >
              {data.map((item, index) => {
                const key = resolveSliceKey(item, nameKey, index);
                const color =
                  item.fill ?? getSeriesColor(resolvedConfig, key, index);
                const tailwindClass = getCellClassName?.(item, index);
                const merged = getCellProps?.(item, index);
                const { className: mergedClassName, ...restMerged } =
                  (merged ?? {}) as { className?: string } & Record<string, unknown>;

                return (
                  <Cell
                    key={`${key}-${index}`}
                    fill={color}
                    stroke={item.stroke ?? "var(--background)"}
                    strokeWidth={1}
                    className={cn(
                      "transition-opacity duration-200 hover:opacity-90",
                      classNames?.slice,
                      tailwindClass,
                      mergedClassName,
                    )}
                    {...restMerged}
                  />
                );
              })}
            </Pie>
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
    </ChartContainer>
  );
}
