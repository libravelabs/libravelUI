"use client";

import type { ReactNode, PropsWithChildren } from "react";
import type {
  CartesianGridProps,
  LegendProps,
  PolarAngleAxisProps,
  PolarRadiusAxisProps,
  XAxisProps,
  YAxisProps,
} from "recharts";

export type ChartDatum = Record<string, unknown>;

export type ChartSeriesConfig = {
  label?: ReactNode;
  color?: string;
  unit?: string;
  hide?: boolean;
  strokeWidth?: number;
  fillOpacity?: number;
  stackId?: string;
  radius?: number | [number, number, number, number];
  type?:
    | "monotone"
    | "linear"
    | "basis"
    | "natural"
    | "step"
    | "stepBefore"
    | "stepAfter";
};

export type ChartConfig = Record<string, ChartSeriesConfig>;

export type ChartContainerClassNames = {
  root?: string;
  content?: string;
};

export type ChartTooltipClassNames = {
  root?: string;
  header?: string;
  row?: string;
  marker?: string;
  label?: string;
  value?: string;
};

export type ChartLegendClassNames = {
  root?: string;
  item?: string;
  marker?: string;
  label?: string;
};

export type CartesianChartClassNames = ChartContainerClassNames & {
  chart?: string;
  grid?: string;
  xAxis?: string;
  yAxis?: string;
  tooltip?: string;
  legend?: string;
};

export type PieChartClassNames = ChartContainerClassNames & {
  chart?: string;
  slice?: string;
  tooltip?: string;
  legend?: string;
  label?: string;
};

export type RadialChartClassNames = ChartContainerClassNames & {
  chart?: string;
  tooltip?: string;
  legend?: string;
};

export type TreemapChartClassNames = ChartContainerClassNames & {
  chart?: string;
  tooltip?: string;
  legend?: string;
};

export type TreemapCellClassNames = {
  root?: string;
  label?: string;
  value?: string;
};

export type ChartTooltipItem = {
  dataKey?: string | number;
  name?: string;
  value?: unknown;
  color?: string;
  payload?: Record<string, unknown>;
};

export type ChartLegendItem = {
  dataKey?: string | number;
  value?: ReactNode;
  type?: string;
  color?: string;
  inactive?: boolean;
};

export type ChartTooltipContext = {
  active?: boolean;
  label?: ReactNode;
  payload?: readonly ChartTooltipItem[];
};

export type ChartLegendContext = {
  payload?: readonly ChartLegendItem[];
};

export type ChartContainerProps = PropsWithChildren<{
  classNames?: ChartContainerClassNames;
  height?: number;
}>;

export type ChartTooltipProps = ChartTooltipContext & {
  config?: ChartConfig;
  classNames?: ChartTooltipClassNames;
};

export type ChartLegendProps = ChartLegendContext & {
  config?: ChartConfig;
  classNames?: ChartLegendClassNames;
};

export type CartesianChartProps<TData extends ChartDatum> = {
  data: readonly TData[];
  dataKey: keyof TData & string;
  config: ChartConfig;
  containerHeight?: number;
  classNames?: CartesianChartClassNames;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  margin?: { top?: number; right?: number; bottom?: number; left?: number };
  xAxisProps?: Partial<XAxisProps>;
  yAxisProps?: Partial<YAxisProps>;
  gridProps?: Partial<CartesianGridProps>;
  legendProps?: Partial<LegendProps>;
  renderTooltip?: (context: ChartTooltipContext) => ReactNode;
  renderLegend?: (context: ChartLegendContext) => ReactNode;
  renderXAxis?: (props: XAxisProps) => ReactNode;
  renderYAxis?: (props: YAxisProps) => ReactNode;
};

export type PieSliceDatum = ChartDatum & {
  fill?: string;
  stroke?: string;
  textColor?: string;
  label?: ReactNode;
};

export type PieSliceCellProps<TData extends PieSliceDatum = PieSliceDatum> = {
  item: TData;
  index: number;
  color: string;
  classNames?: PieChartClassNames;
};

export type PieChartProps<TData extends PieSliceDatum> = {
  data: readonly TData[];
  dataKey: keyof TData & string;
  nameKey: keyof TData & string;
  config?: ChartConfig;
  containerHeight?: number;
  classNames?: PieChartClassNames;
  showLegend?: boolean;
  showTooltip?: boolean;
  showLabels?: boolean;
  innerRadius?: number | string;
  outerRadius?: number | string;
  paddingAngle?: number;
  cornerRadius?: number;
  startAngle?: number;
  endAngle?: number;
  renderTooltip?: (context: ChartTooltipContext) => ReactNode;
  renderLegend?: (context: ChartLegendContext) => ReactNode;
  getCellClassName?: (item: TData, index: number) => string | undefined;
  getCellProps?: (
    item: TData,
    index: number,
  ) => Partial<Record<string, unknown>> | undefined;
  getTextColor?: (item: TData, index: number) => string | undefined;
};

export type RadarChartProps<TData extends ChartDatum> = {
  data: readonly TData[];
  dataKey: keyof TData & string;
  config: ChartConfig;
  containerHeight?: number;
  classNames?: RadialChartClassNames;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  margin?: { top?: number; right?: number; bottom?: number; left?: number };
  angleAxisProps?: Partial<PolarAngleAxisProps>;
  radiusAxisProps?: Partial<PolarRadiusAxisProps>;
  renderTooltip?: (context: ChartTooltipContext) => ReactNode;
  renderLegend?: (context: ChartLegendContext) => ReactNode;
};

export type RadialBarChartProps<TData extends ChartDatum> = {
  data: readonly TData[];
  dataKey: keyof TData & string;
  config: ChartConfig;
  containerHeight?: number;
  classNames?: RadialChartClassNames;
  showLegend?: boolean;
  showTooltip?: boolean;
  startAngle?: number;
  endAngle?: number;
  innerRadius?: number | string;
  outerRadius?: number | string;
  barSize?: number;
  angleAxisProps?: Partial<PolarAngleAxisProps>;
  radiusAxisProps?: Partial<PolarRadiusAxisProps>;
  renderTooltip?: (context: ChartTooltipContext) => ReactNode;
  renderLegend?: (context: ChartLegendContext) => ReactNode;
};

export type ComposedSeriesKind = "line" | "bar" | "area";

export type ComposedSeriesConfig = ChartSeriesConfig & {
  kind: ComposedSeriesKind;
};

export type ComposedChartProps<TData extends ChartDatum> = {
  data: readonly TData[];
  dataKey: keyof TData & string;
  config: Record<string, ComposedSeriesConfig>;
  containerHeight?: number;
  classNames?: CartesianChartClassNames;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  margin?: { top?: number; right?: number; bottom?: number; left?: number };
  xAxisProps?: Partial<XAxisProps>;
  yAxisProps?: Partial<YAxisProps>;
  gridProps?: Partial<CartesianGridProps>;
  legendProps?: Partial<LegendProps>;
  renderTooltip?: (context: ChartTooltipContext) => ReactNode;
  renderLegend?: (context: ChartLegendContext) => ReactNode;
};

export type ScatterSeriesData<TDatum extends ChartDatum> = {
  name: string;
  data: readonly TDatum[];
  xKey: keyof TDatum & string;
  yKey: keyof TDatum & string;
  zKey?: keyof TDatum & string;
  color?: string;
};

export type ScatterChartProps<TDatum extends ChartDatum> = {
  series: readonly ScatterSeriesData<TDatum>[];
  containerHeight?: number;
  classNames?: CartesianChartClassNames;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  margin?: { top?: number; right?: number; bottom?: number; left?: number };
  xAxisProps?: Partial<XAxisProps>;
  yAxisProps?: Partial<YAxisProps>;
  gridProps?: Partial<CartesianGridProps>;
  legendProps?: Partial<LegendProps>;
  renderTooltip?: (context: ChartTooltipContext) => ReactNode;
  renderLegend?: (context: ChartLegendContext) => ReactNode;
};

export type FunnelChartProps<TData extends ChartDatum> = {
  data: readonly TData[];
  dataKey: keyof TData & string;
  nameKey: keyof TData & string;
  config?: ChartConfig;
  containerHeight?: number;
  classNames?: RadialChartClassNames;
  showLegend?: boolean;
  showTooltip?: boolean;
  renderTooltip?: (context: ChartTooltipContext) => ReactNode;
  renderLegend?: (context: ChartLegendContext) => ReactNode;
};

export type SankeyNode = {
  name: string;
};

export type SankeyLink = {
  source: number;
  target: number;
  value: number;
};

export type SankeyChartData = {
  nodes: readonly SankeyNode[];
  links: readonly SankeyLink[];
};

export type SankeyChartClassNames = ChartContainerClassNames & {
  chart?: string;
  tooltip?: string;
};

export type SankeyChartProps = {
  data: SankeyChartData;
  containerHeight?: number;
  classNames?: SankeyChartClassNames;
  showTooltip?: boolean;
  showLegend?: boolean;
  nodeWidth?: number;
  nodePadding?: number;
  linkCurvature?: number;
  align?: "justify" | "left";
  verticalAlign?: "justify" | "top";
  renderTooltip?: (context: ChartTooltipContext) => ReactNode;
};

export type TreemapNode = ChartDatum & {
  name?: string;
  value?: number;
  fill?: string;
  textColor?: string;
  children?: readonly TreemapNode[];
};

export type TreemapCellProps<TNode extends TreemapNode = TreemapNode> = {
  node: TNode;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  depth?: number;
  fill?: string;
  textColor?: string;
  classNames?: TreemapCellClassNames;
};

export type TreemapChartProps<TData extends TreemapNode> = {
  data: readonly TData[];
  dataKey?: keyof TData & string;
  nameKey?: keyof TData & string;
  config?: ChartConfig;
  containerHeight?: number;
  classNames?: TreemapChartClassNames;
  showTooltip?: boolean;
  showLegend?: boolean;
  aspectRatio?: number;
  renderTooltip?: (context: ChartTooltipContext) => ReactNode;
  renderLegend?: (context: ChartLegendContext) => ReactNode;
  renderCell?: (props: TreemapCellProps<TData>) => ReactNode;
};
