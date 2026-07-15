import type { ComponentProps, CSSProperties, ReactNode } from "react";
import { Tooltip as RechartsTooltip } from "recharts";
import type {
  NameType,
  Payload,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import { cn } from "@/lib/utils";

export type ChartTooltipProps = Omit<
  ComponentProps<typeof RechartsTooltip>,
  "content"
> & {
  className?: string;
  labelClassName?: string;
  indicatorClassName?: string;
};

type TooltipItem = Payload<ValueType, NameType> & {
  color?: string;
  fill?: string;
  stroke?: string;
};

function formatTooltipValue(value: unknown): ReactNode {
  if (value === null || value === undefined) return "—";
  if (typeof value === "number") return value.toLocaleString();
  if (typeof value === "boolean") return value ? "true" : "false";
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.join(", ");

  return String(value);
}

function getItemColor(item: TooltipItem): string {
  return item.color ?? item.fill ?? item.stroke ?? "var(--chart-1)";
}

function getItemLabel(item: TooltipItem): string {
  const rawName = item.name;
  if (typeof rawName === "string" && rawName.trim().length > 0) return rawName;
  if (typeof rawName === "number") return String(rawName);
  if (typeof item.dataKey === "string") return item.dataKey;

  return "Value";
}

function getItemValue(item: TooltipItem): ReactNode {
  if (Array.isArray(item.value)) {
    return item.value.map(formatTooltipValue).join(" – ");
  }

  return formatTooltipValue(item.value);
}

export function ChartTooltip({
  labelFormatter,
  formatter,
  separator,
  className,
  labelClassName,
  indicatorClassName,
  cursor,
  wrapperStyle,
  contentStyle,
  itemStyle,
  ...tooltipProps
}: ChartTooltipProps): JSX.Element {
  return (
    <RechartsTooltip
      {...tooltipProps}
      labelFormatter={labelFormatter}
      formatter={formatter}
      separator={separator}
      cursor={cursor ?? { stroke: "var(--border)", strokeDasharray: "4 4" }}
      wrapperStyle={{ outline: "none", ...wrapperStyle }}
      content={({
        active: isActive,
        payload: contentPayload,
        label: contentLabel,
      }) => {
        if (!isActive || !contentPayload || contentPayload.length === 0) {
          return null;
        }

        const normalized = contentPayload as TooltipItem[];
        const header = labelFormatter
          ? labelFormatter(contentLabel, normalized)
          : contentLabel;

        return (
          <div
            className={cn(
              "min-w-[12rem] rounded-2xl border border-border/70 bg-popover/80 p-3 text-sm text-popover-foreground shadow-lg backdrop-blur-md",
              className,
            )}
            style={contentStyle}
          >
            {header !== undefined && header !== null && header !== "" ? (
              <div
                className={cn(
                  "mb-2 text-xs font-medium text-muted-foreground",
                  labelClassName,
                )}
              >
                {formatTooltipValue(header)}
              </div>
            ) : null}

            <div className="space-y-1.5">
              {normalized.map((item, index) => {
                const itemName = getItemLabel(item);
                const rawValue = getItemValue(item);
                const renderedValue = formatter
                  ? formatter(
                      item.value as ValueType,
                      item.name,
                      item,
                      index,
                      normalized,
                    )
                  : rawValue;
                const color = getItemColor(item);

                return (
                  <div
                    key={`${String(item.dataKey ?? itemName)}-${index}`}
                    className={cn(
                      "flex items-center justify-between gap-2 rounded-xl",
                    )}
                    style={itemStyle as CSSProperties | undefined}
                  >
                    <div className="flex min-w-0 items-center gap-2">
                      <span
                        className={cn(
                          "size-2.5 shrink-0 rounded-full",
                          indicatorClassName,
                        )}
                        style={{ backgroundColor: color }}
                      />
                      <span className="truncate text-muted-foreground">
                        {itemName}
                      </span>
                    </div>
                    <span className="font-medium tabular-nums text-foreground">
                      {renderedValue as ReactNode}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      }}
    />
  );
}
