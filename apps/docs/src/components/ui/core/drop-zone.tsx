import type { DropZoneProps as DragAndDropPrimitiveProps } from "react-aria-components";
import {
  composeRenderProps,
  DropZone as DropAndDropPrimitive,
  Label,
} from "react-aria-components";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Description } from "@/components/ui/core/field";

const dropZoneVariants = cva(
  "relative flex flex-col items-center justify-center gap-2 text-sm cursor-pointer *:cursor-pointer rounded-xl border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 group data-[disabled]:pointer-events-none data-[disabled]:text-muted-foreground",
  {
    variants: {
      variant: {
        default:
          "border border-solid border-border bg-card shadow-sm hover:shadow-md hover:border-primary/30",
        dashed:
          "border-2 border-dashed border-border bg-background hover:border-primary/50 hover:bg-primary/10",
        ghost: "border-transparent hover:bg-accent/10",
      },
      isDropTarget: {
        true: "border-dashed border-primary bg-primary/30 scale-105",
        false: "",
      },
    },
    defaultVariants: {
      variant: "dashed",
    },
  }
);

const dropZoneSizes = cva("w-full", {
  variants: {
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
  },
  defaultVariants: {
    size: "md",
  },
});

interface DropZoneProps
  extends DragAndDropPrimitiveProps,
    VariantProps<typeof dropZoneVariants>,
    VariantProps<typeof dropZoneSizes> {
  label?: string;
  description?: string;
}

function DropZone({
  className,
  variant,
  size,
  label,
  description,
  ...props
}: DropZoneProps) {
  return (
    <div className="grid gap-4 w-full">
      <Label>{label}</Label>
      <DropAndDropPrimitive
        className={composeRenderProps(className, (className, renderProps) =>
          cn(
            dropZoneVariants({ variant, ...renderProps }),
            dropZoneSizes({ size }),
            className
          )
        )}
        {...props}
      />
      <Description>{description}</Description>
    </div>
  );
}

export { DropZone, dropZoneVariants, dropZoneSizes };
export type { DropZoneProps };
