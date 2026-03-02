"use client";
import type { DropZoneProps as DragAndDropPrimitiveProps } from "react-aria-components";
import {
  composeRenderProps,
  DropZone as DropAndDropPrimitive,
} from "react-aria-components";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const dropZoneVariants = cva(
  "relative flex flex-col items-center justify-center w-full gap-2 text-sm data-drag-and-drop:cursor-pointer data-drag-and-drop:*:cursor-pointer rounded-xl border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 group data-[disabled]:pointer-events-none data-[disabled]:text-muted-foreground",
  {
    variants: {
      tone: {
        default:
          "border border-solid border-border bg-transparent shadow-sm data-drag-and-drop:hover:shadow-md data-drag-and-drop:hover:border-primary/30",
        dashed:
          "border-2 border-dashed border-border bg-transparent data-drag-and-drop:hover:border-primary/50 data-drag-and-drop:hover:bg-primary/10",
        ghost: "border-transparent data-drag-and-drop:hover:bg-accent/10",
      },
      size: {
        xs: "p-2 min-h-[72px] max-w-xs",
        sm: "p-3 min-h-[96px] max-w-sm",
        md: "p-5 min-h-[140px] max-w-md",
        lg: "p-7 min-h-[180px] max-w-lg",
        xl: "p-10 min-h-[240px] max-w-xl",
        "2xl": "p-12 min-h-[280px] max-w-2xl",
        "3xl": "p-14 min-h-[320px] max-w-3xl",
        "4xl": "p-16 min-h-[360px] max-w-4xl",
        "5xl": "p-20 min-h-[400px] max-w-5xl",
        "6xl": "p-24 min-h-[460px] max-w-6xl",
        "7xl": "p-28 min-h-[520px] max-w-7xl",
        full: "p-6 min-h-[160px] max-w-full w-full",
      },
      isDropTarget: {
        true: "border-dashed border-primary bg-primary/30 scale-105",
        false: "",
      },
    },
    defaultVariants: {
      tone: "dashed",
      size: "md",
    },
  },
);

type DropZoneProps = DragAndDropPrimitiveProps &
  VariantProps<typeof dropZoneVariants>;

function DropZone({ className, tone, size, ...props }: DropZoneProps) {
  return (
    <DropAndDropPrimitive
      className={composeRenderProps(className, (className, renderProps) =>
        cn(dropZoneVariants({ tone, size, ...renderProps }), className),
      )}
      {...props}
    />
  );
}

export { DropZone, dropZoneVariants };
export type { DropZoneProps };
