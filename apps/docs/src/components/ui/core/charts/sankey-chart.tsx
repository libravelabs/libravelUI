"use client";

import {
  Sankey as RechartsSankey,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { cn } from "@/lib/utils";
import { ChartContainer } from "./chart-container";
import { ChartTooltip } from "./chart-tooltip";
import type { SankeyChartProps } from "./chart-types";

export function SankeyChart({
  data,
  containerHeight = 320,
  classNames,
  showTooltip = true,
  nodeWidth = 12,
  nodePadding = 12,
  linkCurvature = 0.5,
  align = "justify",
  verticalAlign = "justify",
  renderTooltip,
}: SankeyChartProps) {
  return (
    <ChartContainer
      height={containerHeight}
      classNames={classNames}
    >
      <div className={cn("h-full min-h-0", classNames?.chart)}>
        <ResponsiveContainer width="100%" height="100%">
        <RechartsSankey
          data={data}
          nodeWidth={nodeWidth}
          nodePadding={nodePadding}
          linkCurvature={linkCurvature}
          align={align}
          verticalAlign={verticalAlign}
        >
          {showTooltip ? (
            renderTooltip ? (
              <Tooltip content={(props) => renderTooltip(props as never)} />
            ) : (
              <Tooltip content={(props) => <ChartTooltip {...props} classNames={{ root: classNames?.tooltip }} />} />
            )
          ) : null}
        </RechartsSankey>
        </ResponsiveContainer>
      </div>
    </ChartContainer>
  );
}
