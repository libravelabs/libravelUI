"use client";

import * as React from "react";
import type {
  CellProps,
  ColumnProps,
  ColumnResizerProps,
  TableHeaderProps as HeaderProps,
  RowProps,
  TableBodyProps,
  TableProps as TablePrimitiveProps,
} from "react-aria-components";
import {
  Button,
  Cell,
  Collection,
  Column,
  ColumnResizer as ColumnResizerPrimitive,
  composeRenderProps,
  ResizableTableContainer,
  Row,
  TableBody as TableBodyPrimitive,
  TableHeader as TableHeaderPrimitive,
  Table as TablePrimitive,
  useTableOptions,
} from "react-aria-components";
import { composeTailwindRenderProps } from "@/lib/render-props";
import { Checkbox } from "@/components/ui/core/checkbox";
import { ChevronDown, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface TableProps extends Omit<TablePrimitiveProps, "className"> {
  allowResize?: boolean;
  className?: string;
  bleed?: boolean;
  ref?: React.Ref<HTMLTableElement>;
}

const TableContext = React.createContext<TableProps>({
  allowResize: false,
});

function useTableContext() {
  const ctx = React.useContext(TableContext);
  if (!ctx) throw new Error("Must be used within <MultiSelectRoot>");
  return ctx;
}

function TableRoot(props: TableProps) {
  return (
    <TablePrimitive
      aria-label={props["aria-label"] ?? "table"}
      className="w-full min-w-full caption-bottom text-sm/6 outline-hidden"
      {...props}
    />
  );
}

function Table({ allowResize, className, bleed, ref, ...props }: TableProps) {
  return (
    <TableContext.Provider value={{ allowResize, bleed }}>
      <div className="flow-root">
        <div
          className={cn(
            "-mx-4 relative overflow-x-auto whitespace-nowrap has-data-[slot=table-resizable-container]:overflow-auto",
            className
          )}
        >
          <div
            className={cn(
              "inline-block min-w-full align-middle",
              !bleed && "sm:px-4"
            )}
          >
            {allowResize ? (
              <ResizableTableContainer data-slot="table-resizable-container">
                <TableRoot ref={ref} {...props} />
              </ResizableTableContainer>
            ) : (
              <TableRoot {...props} ref={ref} />
            )}
          </div>
        </div>
      </div>
    </TableContext.Provider>
  );
}

function ColumnResizer({ className, ...props }: ColumnResizerProps) {
  return (
    <ColumnResizerPrimitive
      {...props}
      className={composeTailwindRenderProps(
        className,
        "absolute top-0 end-0 bottom-0 grid w-px &[data-resizable-direction=left]:cursor-e-resize &[data-resizable-direction=right]:cursor-w-resize touch-none place-content-center px-1 data-[resizable-direction=both]:cursor-ew-resize [&[data-resizing]>div]:bg-primary"
      )}
    >
      <div className="h-full w-px bg-border py-2" />
    </ColumnResizerPrimitive>
  );
}

function TableBody<T extends object>(props: TableBodyProps<T>) {
  return (
    <TableBodyPrimitive
      data-slot="table-body"
      {...props}
      className={cn(
        "*:data-drop-target:border-[0.09rem] *:data-drop-target:border-primary",
        props.className
      )}
    />
  );
}

interface TableColumnProps extends ColumnProps {
  className?: string;
  isResizable?: boolean;
}

function TableColumn({
  isResizable = false,
  className,
  ...props
}: TableColumnProps) {
  const { bleed } = useTableContext();
  return (
    <Column
      data-slot="table-column"
      {...props}
      className={composeTailwindRenderProps(
        className,
        cn(
          "text-left font-medium text-muted-foreground",
          "relative allows-sorting:cursor-pointer outline-hidden data-dragging:cursor-grabbing",
          "px-4 py-2 first:ps-4 last:pe-4",
          !bleed && "sm:last:pe-1 sm:first:ps-1",
          isResizable && "overflow-hidden truncate"
        )
      )}
    >
      {(values) => (
        <div className="flex items-center gap-2 **:data-[slot=icon]:shrink-0">
          {typeof props.children === "function"
            ? props.children(values)
            : props.children}
          {values.allowsSorting && (
            <span
              className={cn(
                "grid size-[1.15rem] flex-none shrink-0 place-content-center rounded bg-secondary text-foreground *:data-[slot=icon]:size-3.5 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:transition-transform *:data-[slot=icon]:duration-200",
                values.isHovered ? "bg-secondary-foreground/10" : "",
                className
              )}
            >
              <ChevronDown
                data-slot="icon"
                className={
                  values.sortDirection === "ascending" ? "rotate-180" : ""
                }
              />
            </span>
          )}
          {isResizable && <ColumnResizer />}
        </div>
      )}
    </Column>
  );
}

interface TableHeaderProps<T extends object> extends HeaderProps<T> {
  ref?: React.Ref<HTMLTableSectionElement>;
}

function TableHeader({
  children,
  ref,
  columns,
  className,
  ...props
}: TableHeaderProps<object>) {
  const { bleed } = useTableContext();
  const { selectionBehavior, selectionMode, allowsDragging } =
    useTableOptions();

  return (
    <TableHeaderPrimitive
      data-slot="table-header"
      className={composeTailwindRenderProps(className, "border-b")}
      ref={ref}
      {...props}
    >
      {allowsDragging && (
        <Column
          data-slot="table-column"
          className={cn(
            "w-0 max-w-8 px-4 first:ps-4 last:pe-4",
            !bleed && "sm:last:pe-1 sm:first:ps-1"
          )}
        />
      )}
      {selectionBehavior === "toggle" && (
        <Column
          data-slot="table-column"
          className={cn(
            "w-0 max-w-8 px-4 first:ps-4 last:pe-4",
            !bleed && "sm:last:pe-1 sm:first:ps-1"
          )}
        >
          {selectionMode === "multiple" && <Checkbox slot="selection" />}
        </Column>
      )}
      <Collection items={columns}>{children}</Collection>
    </TableHeaderPrimitive>
  );
}

interface TableRowProps<T extends object> extends RowProps<T> {
  ref?: React.Ref<HTMLTableRowElement>;
}

function TableRow<T extends object>({
  children,
  className,
  columns,
  id,
  ref,
  ...props
}: TableRowProps<T>) {
  const { selectionBehavior, allowsDragging } = useTableOptions();
  const { bleed } = useTableContext();

  return (
    <Row
      ref={ref}
      data-slot="table-row"
      id={id}
      {...props}
      className={composeRenderProps(
        className,
        (
          className,
          {
            isSelected,
            selectionMode,
            isFocusVisibleWithin,
            isDragging,
            isDisabled,
          }
        ) =>
          cn(
            "group relative border-b text-muted-foreground outline-transparent ring-primary last:border-b-0",
            "transition-transform duration-200 ease-in-out",
            isDragging && "border-y border-y-primary",
            isSelected && "bg-secondary text-foreground hover:bg-secondary/50",
            (props.href || props.onAction || selectionMode === "multiple") &&
              "hover:bg-secondary hover:text-foreground",
            (props.href || props.onAction || selectionMode === "multiple") &&
              isFocusVisibleWithin &&
              "bg-secondary/50 selected:bg-secondary/50 text-foreground",
            isDisabled && "opacity-50",
            className
          )
      )}
    >
      {allowsDragging && (
        <TableCell className="max-w-4 sm:last:pe-1 sm:first:ps-1">
          <Button
            slot="drag"
            className="grid place-content-center rounded-xs px-2 outline-hidden focus-visible:ring focus-visible:ring-ring"
          >
            <GripVertical size={16} />
          </Button>
        </TableCell>
      )}
      {selectionBehavior === "toggle" && (
        <TableCell
          className={cn(!bleed && "max-w-4 sm:last:pe-1 sm:first:ps-1")}
        >
          <Checkbox slot="selection" />
        </TableCell>
      )}
      <Collection items={columns}>{children}</Collection>
    </Row>
  );
}

function TableCell({ className, ...props }: CellProps) {
  const { allowResize, bleed } = useTableContext();
  return (
    <Cell
      data-slot="table-cell"
      {...props}
      className={composeTailwindRenderProps(
        className,
        cn(
          "group px-4 py-2 align-middle outline-hidden first:ps-4 last:pe-4 group-has-data-focus-visible-within:text-foreground",
          !bleed && "sm:last:pe-1 sm:first:ps-1",
          allowResize && "overflow-hidden truncate"
        )
      )}
    />
  );
}

export type { TableProps, TableColumnProps, TableRowProps };
export { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow };
