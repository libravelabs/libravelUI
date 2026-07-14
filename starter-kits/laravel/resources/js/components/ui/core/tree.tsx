"use client";

import { ChevronRight } from "lucide-react";
import type {
  TreeItemContentProps,
  TreeItemContentRenderProps,
  TreeItemProps,
  TreeProps,
} from "react-aria-components";
import {
  Tree as TreePrimitive,
  TreeItem as TreeItemPrimitive,
  TreeItemContent as TreeItemContent,
  Button,
} from "react-aria-components";
import { composeTailwindRenderProps } from "@/lib/render-props";
import { Checkbox } from "@/components/ui/core/checkbox";
import { cn } from "@/lib/utils";

function Tree<T extends object>({ className, ...props }: TreeProps<T>) {
  return (
    <TreePrimitive
      aria-label={props["aria-label"] ?? "tree"}
      className={composeTailwindRenderProps(
        className,
        cn(
          "flex flex-col gap-y-2 overflow-auto outline-hidden forced-color-adjust-none"
        )
      )}
      {...props}
    />
  );
}

function TreeItem<T extends object>({ className, ...props }: TreeItemProps<T>) {
  return (
    <TreeItemPrimitive
      className={composeTailwindRenderProps(className, [
        "shrink-0 rounded-lg px-2 py-1.5 pr-2",
        "group/tree-item relative flex select-none rounded-lg focus:outline-hidden",
        "focus:bg-secondary focus:text-secondary-foreground focus:**:[.text-secondary-foreground]:text-secondary-foreground",
        "**:data-[slot=avatar]:*:me-1.5 **:data-[slot=avatar]:*:size-6 **:data-[slot=avatar]:me-(--me-icon) **:data-[slot=avatar]:size-6 sm:**:data-[slot=avatar]:*:size-5 sm:**:data-[slot=avatar]:size-5",
        "*:data-[slot=icon]:me-(--me-icon) **:data-[slot=icon]:size-5 **:data-[slot=icon]:shrink-0 sm:**:data-[slot=icon]:size-4",
        "cursor-pointer",
      ])}
      {...props}
    />
  );
}

interface TreeContentProps extends TreeItemContentProps {
  className?: string;
}

function TreeContent({ className, children, ...props }: TreeContentProps) {
  return (
    <TreeItemContent {...props}>
      {(values) => (
        <div
          className={cn(
            "relative flex w-full min-w-0 items-center truncate text-sm/6",
            className
          )}
        >
          {values.selectionMode === "multiple" &&
            values.selectionBehavior === "toggle" && (
              <Checkbox slot="selection" />
            )}
          <div
            className={cn(
              "relative w-[calc(calc(var(--tree-item-level)-1)*calc(var(--spacing)*5.5))] shrink-0",
              "before:-ms-1 before:absolute before:inset-0 before:bg-[repeating-linear-gradient(to_right,transparent_0,transparent_calc(var(--tree-item-level)-1px),var(--border)_calc(var(--tree-item-level)-1px),var(--border)_calc(var(--tree-item-level)))]"
            )}
          />
          {values.hasChildItems ? (
            <TreeIndicator
              values={{
                isDisabled: values.isDisabled,
                isExpanded: values.isExpanded,
              }}
            />
          ) : (
            <span className="block size-5 shrink-0" />
          )}
          {typeof children === "function" ? children(values) : children}
        </div>
      )}
    </TreeItemContent>
  );
}

interface TreeIndicatorProps {
  values: Pick<TreeItemContentRenderProps, "isDisabled" | "isExpanded">;
}

function TreeIndicator({ values }: TreeIndicatorProps) {
  return (
    <Button
      slot="chevron"
      isDisabled={values.isDisabled}
      className={cn(
        "size-5 shrink-0 content-center text-muted-foreground hover:text-foreground cursor-pointer",
        values.isExpanded && "text-foreground"
      )}
    >
      <ChevronRight
        className={cn(
          "size-4 transition-transform duration-200 ease-in-out",
          values.isExpanded && "rotate-90"
        )}
      />
    </Button>
  );
}

export type { TreeProps, TreeItemProps };
export { Tree, TreeItem, TreeContent, TreeIndicator };
