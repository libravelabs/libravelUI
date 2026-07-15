import type { CSSProperties, ComponentProps, ReactNode } from "react";
import { Treemap as RechartsTreemap } from "recharts";
import { ChartSurface, getChartColor, type RuntimeChartConfig } from "./chart-shell";
import { ChartTooltip } from "./chart-tooltip";

export type TreemapNode = {
  name: string;
  size?: number;
  valueLabel?: ReactNode;
  color?: string;
  children?: TreemapNode[];
};

export type TreemapChartProps = Omit<
  ComponentProps<typeof RechartsTreemap>,
  "width" | "height" | "children"
> & {
  data: TreemapNode[];
  dataKey?: "size";
  config?: RuntimeChartConfig;
  containerHeight?: number | string;
  className?: string;
  style?: CSSProperties;
  hideValue?: boolean;
  tooltipProps?: ComponentProps<typeof ChartTooltip>;
  hideTooltip?: boolean;
};

type TreemapContentProps = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  depth?: number;
  name?: string;
  size?: number;
  valueLabel?: ReactNode;
  color?: string;
  hideValue?: boolean;
  tooltipProps?: ComponentProps<typeof ChartTooltip>;
  hideTooltip?: boolean;
};

function formatSize(size: number): string {
  if (size >= 1024) {
    return `${(size / 1024).toFixed(1)} GB`;
  }

  return `${size.toFixed(1)} MB`;
}

type TreemapNodeColorable = TreemapNode & {
  color?: string;
};

function attachTreeColors(
  nodes: TreemapNode[],
  palette: RuntimeChartConfig,
  depth = 0,
): TreemapNodeColorable[] {
  return nodes.map((node, index) => {
    const color = node.color ?? palette[node.name]?.color ?? getChartColor(index, palette[node.name]?.color);
    const children = node.children ? attachTreeColors(node.children, palette, depth + 1) : undefined;

    return {
      ...node,
      color,
      children,
    };
  });
}

function TreemapContent(props: TreemapContentProps): JSX.Element | null {
  const { x = 0, y = 0, width = 0, height = 0, depth = 0, name, size = 0, valueLabel, color, hideValue = false } = props;

  if (depth !== 2) {
    return null;
  }

  const showText = width >= 70 && height >= 40;
  const fill = color ?? "var(--primary)";

  return (
    <g>
      <rect x={x} y={y} width={width} height={height} fill={fill} stroke="var(--background)" strokeWidth={1} />
      {showText ? (
        <>
          <text x={x + 8} y={y + 18} fill="white" fontSize={12} fontWeight={600}>
            {name}
          </text>
          {!hideValue ? (
            <text x={x + 8} y={y + 36} fill="rgba(255,255,255,0.82)" fontSize={11}>
              {valueLabel ?? formatSize(size)}
            </text>
          ) : null}
        </>
      ) : null}
    </g>
  );
}

export function TreemapChart({
  data,
  dataKey = "size",
  config,
  containerHeight,
  className,
  style,
  hideValue = false,
  tooltipProps,
  hideTooltip = false,
  ...chartProps
}: TreemapChartProps): JSX.Element {
  const palette = config ?? {};

  const dataWithColors = attachTreeColors(data, palette);

  return (
    <ChartSurface containerHeight={containerHeight} className={className} style={style}>
      <RechartsTreemap
        data={dataWithColors}
        dataKey={dataKey}
        content={(props) => <TreemapContent {...props} hideValue={hideValue} />}
        {...chartProps}
      >
        {!hideTooltip ? <ChartTooltip {...tooltipProps} /> : null}
      </RechartsTreemap>
    </ChartSurface>
  );
}
