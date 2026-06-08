"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type {
  ChartConfig,
  ChartLegendProps,
  ChartTooltipItem,
  ChartTooltipProps,
} from "./chart-types";
import {
  formatChartValue,
  getChartItemKey,
  getSeriesColor,
  getSeriesLabel,
  getSeriesUnit,
  isRecord,
} from "./chart-utils";

function isNumericLike(value: ReactNode): boolean {
  if (typeof value === "number") return true;
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed !== "" && !Number.isNaN(Number(trimmed));
  }
  return false;
}

function getPayloadLabel(item: ChartTooltipItem): string | undefined {
  if (typeof item.name === "string" && item.name.trim() !== "") {
    return item.name;
  }

  if (!isRecord(item.payload)) {
    return undefined;
  }

  const candidateName = item.payload.name;
  if (typeof candidateName === "string" && candidateName.trim() !== "") {
    return candidateName;
  }

  const candidateLabel = item.payload.label;
  if (typeof candidateLabel === "string" && candidateLabel.trim() !== "") {
    return candidateLabel;
  }

  return undefined;
}

function resolveHeaderLabel(
  label: ReactNode,
  firstItem: ChartTooltipItem | undefined,
): ReactNode | undefined {
  const payloadLabel = firstItem ? getPayloadLabel(firstItem) : undefined;
  if (payloadLabel) {
    if (!isNumericLike(label)) {
      return label ?? payloadLabel;
    }
    return payloadLabel;
  }
  return label;
}

export function ChartTooltip({
  active,
  label,
  payload,
  config,
  classNames,
}: ChartTooltipProps) {
  if (!active || !payload?.length) return null;

  const items = payload.filter((item) => item.value !== undefined);
  const firstItem = items[0];
  const headerLabel = resolveHeaderLabel(label, firstItem);

  return (
    <div
      className={cn(
        "min-w-[12rem] rounded-xl border border-border bg-popover px-3 py-2 text-popover-foreground shadow-lg backdrop-blur",
        classNames?.root,
      )}
    >
      {headerLabel != null ? (
        <div
          className={cn(
            "mb-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground",
            classNames?.header,
          )}
        >
          {String(headerLabel)}
        </div>
      ) : null}

      <div className="grid gap-1.5">
        {items.map((item, index) => {
          const key = getChartItemKey(item);
          const configuredLabel = config?.[key]?.label;
          const payloadLabel = getPayloadLabel(item);
          const labelText =
            payloadLabel ??
            (typeof configuredLabel === "string" ? configuredLabel : undefined) ??
            item.name ??
            getSeriesLabel(config, key) ??
            key;
          const unit = getSeriesUnit(config, key);
          const color = item.color ?? getSeriesColor(config, key, index);

          return (
            <div
              key={`${key}-${index}`}
              className={cn(
                "flex items-center justify-between gap-3",
                classNames?.row,
              )}
            >
              <div className="flex min-w-0 items-center gap-2">
                <span
                  className={cn("size-2.5 shrink-0 rounded-full", classNames?.marker)}
                  style={{ backgroundColor: color }}
                />
                <span className={cn("truncate text-xs text-muted-foreground", classNames?.label)}>
                  {labelText}
                </span>
              </div>
              <span className={cn("text-xs font-medium text-foreground", classNames?.value)}>
                {formatChartValue(item.value, unit)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ChartLegend({
  payload,
  config,
  classNames,
}: ChartLegendProps) {
  const entries = payload?.length
    ? payload
    : Object.entries(config ?? {}).map(([key, value], index) => ({
        dataKey: key,
        value: value.label ?? key,
        color: value.color ?? getSeriesColor(config, key, index),
      }));

  if (!entries?.length) return null;

  return (
    <div className={cn("flex flex-wrap items-center gap-3 text-xs", classNames?.root)}>
      {entries.map((entry, index) => {
        const key = typeof entry.dataKey === "string" ? entry.dataKey : `legend-${index}`;
        const color = entry.color ?? getSeriesColor(config, key, index);
        const label = entry.value ?? key;

        return (
          <div key={`${key}-${index}`} className={cn("flex items-center gap-2", classNames?.item)}>
            <span
              className={cn("size-2.5 rounded-full", classNames?.marker)}
              style={{ backgroundColor: color }}
            />
            <span className={cn("text-muted-foreground", classNames?.label)}>{label}</span>
          </div>
        );
      })}
    </div>
  );
}
