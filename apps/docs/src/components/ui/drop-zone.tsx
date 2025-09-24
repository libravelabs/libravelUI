import type { DropZoneProps as DragAndDropPrimitiveProps } from "react-aria-components";
import {
  composeRenderProps,
  DropZone as DropAndDropPrimitive,
} from "react-aria-components";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const dropZoneVariants = cva(
  "relative flex flex-col items-center justify-center gap-2 text-sm cursor-pointer *:cursor-pointer rounded-xl border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 group w-full data-[disabled]:pointer-events-none data-[disabled]:text-muted-foreground",
  {
    variants: {
      variant: {
        default: "border-border bg-card hover:border-primary/30",
        dashed:
          "border-dashed border-border bg-background hover:border-primary/50 hover:bg-primary/10",
        ghost: "border-transparent bg-accent/50 hover:bg-accent",
      },
      size: {
        sm: "p-4 min-h-[120px]",
        default: "p-6 min-h-[160px]",
        lg: "p-8 min-h-[200px]",
      },
      isDropTarget: {
        true: "border-dashed border-primary bg-primary/30 scale-105",
        false: "",
      },
    },
    defaultVariants: {
      variant: "dashed",
      size: "default",
    },
  }
);

interface DropZoneProps
  extends DragAndDropPrimitiveProps,
    VariantProps<typeof dropZoneVariants> {
  label?: string;
  description?: string;
}

function DropZone({ className, variant, size, ...props }: DropZoneProps) {
  return (
    <DropAndDropPrimitive
      className={composeRenderProps(className, (className, renderProps) =>
        cn(dropZoneVariants({ variant, size, ...renderProps }), className)
      )}
      {...props}
    />
  );
}

export { DropZone };
export type { DropZoneProps };
