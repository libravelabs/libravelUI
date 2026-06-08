"use client";

import {
  FunnelChart as RechartsFunnelChart,
  Funnel,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { cn } from "@/lib/utils";
import { ChartContainer } from "./chart-container";
import { ChartLegend, ChartTooltip } from "./chart-tooltip";
import type { FunnelChartProps } from "./chart-types";
import { getSeriesColor, getSeriesLabel } from "./chart-utils";

export function FunnelChart<TData extends Record<string, unknown>>({
  data,
  dataKey,
  nameKey,
  config,
  containerHeight = 320,
  classNames,
  showLegend = true,
  showTooltip = true,
  renderTooltip,
  renderLegend,
}: FunnelChartProps<TData>) {
  return (
    <ChartContainer
      height={containerHeight}
      classNames={classNames}
    >
      <div className={cn("h-full min-h-0", classNames?.chart)}>
        <ResponsiveContainer width="100%" height="100%">
        <RechartsFunnelChart>
          {showTooltip ? (
            renderTooltip ? (
              <Tooltip content={(props) => renderTooltip(props as never)} />
            ) : (
              <Tooltip content={(props) => <ChartTooltip {...props} config={config ?? {}} classNames={{ root: classNames?.tooltip }} />} />
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
                    config={
                      config ??
                      Object.fromEntries(
                        data.map((item, index) => {
                          const key = String(item[nameKey]);
                          return [
                            key,
                            {
                              label: getSeriesLabel(config, key),
                              color: getSeriesColor(config, key, index),
                            },
                          ];
                        }),
                      )
                    }
                    classNames={{ root: classNames?.legend }}
                  />
                )}
              />
            )
          ) : null}

          <Funnel dataKey={dataKey} nameKey={nameKey} data={data}>
            {data.map((entry, index) => {
              const key = String(entry[nameKey]);
              const color = config?.[key]?.color ?? getSeriesColor(config ?? {}, key, index);

              return <Cell key={`${key}-${index}`} fill={color} />;
            })}
          </Funnel>
        </RechartsFunnelChart>
        </ResponsiveContainer>
      </div>
    </ChartContainer>
  );
}
