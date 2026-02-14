"use client";
import { GripVertical } from "lucide-react";
import * as React from "react";
import type {
  GridListProps as GridListPrimitiveProps,
  GridListItemProps as GridListItemPrimitiveProps,
} from "react-aria-components";
import {
  GridList as GridListPrimitive,
  GridListItem as GridListItemPrimitive,
  Collection,
  GridListLoadMoreItem as GridListLoadMorePrimitive,
  composeRenderProps,
} from "react-aria-components";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/core/checkbox";

interface GridListProps<T> extends GridListPrimitiveProps<T> {
  multiple?: boolean;
}

function GridList<T extends object>({
  children,
  className,
  multiple = false,
  ...props
}: GridListProps<T>) {
  return (
    <GridListPrimitive
      className={cn(
        "relative max-h-96 scroll-py-1 overflow-y-auto overscroll-contain rounded-lg border *:data-drop-target:border *:data-drop-target:border-primary",
        className
      )}
      selectionMode={multiple ? "multiple" : "single"}
      {...props}
    >
      {children}
    </GridListPrimitive>
  );
}

const itemStyles = cva(
  "group -mb-px -outline-offset-2 relative flex cursor-pointer select-none gap-3 border-y px-3 py-2 text-foreground outline-hidden transition first:rounded-t-md first:border-t-0 last:mb-0 last:rounded-b-md last:border-b-0 sm:text-sm",
  {
    variants: {
      isHovered: {
        true: "bg-muted/50",
      },
      isSelected: {
        true: "z-20 border-border/50 bg-muted hover:bg-muted/50 ps-3 relative before:absolute before:start-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary",
      },
      isFocused: {
        true: "outline-hidden",
      },
      isFocusVisible: {
        true: "bg-muted selected:bg-muted outline-hidden ring-1 ring-ring hover:bg-muted/50",
      },
      isDisabled: {
        true: "cursor-not-allowed text-muted-foreground/50",
      },
    },
  }
);

interface GridListItemProps<T>
  extends Omit<GridListItemPrimitiveProps<T>, "selectionMode"> {
  multiple?: boolean;
  disabled?: boolean;
}

function GridListItem<T extends object>({
  className,
  children,
  disabled,
  ...props
}: GridListItemProps<T>) {
  const textValue =
    props.textValue ?? (typeof children === "string" ? children : undefined);

  return (
    <GridListItemPrimitive<T>
      textValue={textValue}
      isDisabled={disabled}
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        cn(itemStyles(renderProps), className)
      )}
    >
      {(values) => (
        <>
          {values.allowsDragging && (
            <div
              slot="drag"
              className="cursor-grab data-dragging:cursor-grabbing *:data-[slot=icon]:text-muted-foreground"
            >
              <GripVertical size={16} />
            </div>
          )}

          {values.selectionMode === "multiple" && (
            <Checkbox className="-me-1" slot="selection" />
          )}

          {typeof children === "function" ? children(values) : children}
        </>
      )}
    </GridListItemPrimitive>
  );
}

const GridListEmpty = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6", className)} {...props} />
));
GridListEmpty.displayName = "GridListEmpty";

const GridListCollection = Collection;
const GridListLoadMore = GridListLoadMorePrimitive;

export {
  GridList,
  GridListItem,
  GridListEmpty,
  GridListCollection,
  GridListLoadMore,
};

export type { GridListProps, GridListItemProps };
