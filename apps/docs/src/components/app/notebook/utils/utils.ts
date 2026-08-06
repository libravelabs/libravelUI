import type { NotebookArgs } from "@/components/app/notebook/types";

export const controlColumns = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
  5: "sm:grid-cols-5",
  6: "sm:grid-cols-6",
} as const;

export const controlColSpan = {
  1: "sm:col-span-1",
  2: "sm:col-span-2",
  3: "sm:col-span-3",
  4: "sm:col-span-4",
  5: "sm:col-span-5",
  6: "sm:col-span-6",
} as const;

export type ControlColumns = keyof typeof controlColumns;
export type ControlColSpan = keyof typeof controlColSpan;

export function typedEntries<T extends object>(obj: T) {
  return Object.entries(obj) as {
    [K in keyof T]: [K, T[K]];
  }[keyof T][];
}

export function getDefaultArgs<TArgs extends object>(
  fields: NotebookArgs<TArgs>,
) {
  return Object.fromEntries(
    typedEntries(fields).map(([key, field]) => [key, field.defaultValue]),
  ) as TArgs;
}

export function getControlColumnClass(columns?: number) {
  return columns && columns in controlColumns
    ? controlColumns[columns as ControlColumns]
    : undefined;
}

export function getControlSpanClass(colSpan?: number) {
  return colSpan && colSpan in controlColSpan
    ? controlColSpan[colSpan as ControlColSpan]
    : undefined;
}
