"use client";

import {
  Treemap as RechartsTreemap,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartContainer } from "./chart-container";
import { ChartLegend, ChartTooltip } from "./chart-tooltip";
import type {
  ChartConfig,
  TreemapChartProps,
  TreemapNode,
} from "./chart-types";
import { getSeriesColor, getSeriesLabel } from "./chart-utils";

type TreemapContentProps = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  name?: string;
  value?: number;
  depth?: number;
  payload?: TreemapNode;
  fill?: string;
  textColor?: string;
};

function TreemapCell({
  x = 0,
  y = 0,
  width = 0,
  height = 0,
  name,
  value,
  fill,
  textColor,
}: TreemapContentProps) {
  if (width <= 0 || height <= 0) return null;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={12}
        ry={12}
        fill={fill}
        stroke="var(--border)"
        strokeWidth={1}
      />
      <foreignObject x={x} y={y} width={width} height={height}>
        <div className="flex h-full w-full items-end p-3">
          <div className="min-w-0">
            <div
              className="truncate text-sm font-medium invert"
              style={{ color: textColor }}
            >
              {name}
            </div>
            <div
              className="text-xs invert opacity-70"
              style={{ color: textColor }}
            >
              {typeof value === "number" ? value.toLocaleString("en-US") : null}
            </div>
          </div>
        </div>
      </foreignObject>
    </g>
  );
}

export function TreemapChart<TData extends TreemapNode>({
  data,
  dataKey = "value" as keyof TData & string,
  nameKey = "name" as keyof TData & string,
  config,
  containerHeight = 320,
  className,
  contentClassName,
  showTooltip = true,
  showLegend = true,
  aspectRatio = 1.618,
  renderTooltip,
  renderLegend,
}: TreemapChartProps<TData>) {
  const colorMap = new Map(data.map((d) => [String(d.name), (d as any).fill]));

  const legendConfig: ChartConfig = Object.fromEntries(
    data.map((item, index) => [
      String(item.name),
      {
        label: getSeriesLabel(config, String(item.name)),
        color:
          (item as any).fill ??
          getSeriesColor(config ?? {}, String(item.name), index),
      },
    ]),
  );

  return (
    <ChartContainer
      height={containerHeight}
      className={className}
      contentClassName={contentClassName}
    >
      <div className="flex h-full flex-col gap-3">
        <div className="min-h-0 flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsTreemap
              data={data}
              dataKey={dataKey}
              nameKey={nameKey}
              aspectRatio={aspectRatio}
              content={(props: any) => {
                const key = String(props[nameKey] ?? props.name ?? "");
                const color = colorMap.get(key) ?? "var(--muted)";
                const node = props.payload;
                console.log(node);

                return (
                  <TreemapCell
                    {...props}
                    name={key}
                    value={props.value}
                    fill={color}
                    textColor={node?.textColor}
                  />
                );
              }}
            >
              {showTooltip ? (
                renderTooltip ? (
                  <Tooltip content={(p) => renderTooltip(p as any)} />
                ) : (
                  <Tooltip
                    content={(p) => (
                      <ChartTooltip {...p} config={legendConfig} />
                    )}
                  />
                )
              ) : null}
            </RechartsTreemap>
          </ResponsiveContainer>
        </div>

        {showLegend ? (
          renderLegend ? (
            <div>{renderLegend({ payload: [] })}</div>
          ) : (
            <ChartLegend config={legendConfig} className="px-1" />
          )
        ) : null}
      </div>
    </ChartContainer>
  );
}
