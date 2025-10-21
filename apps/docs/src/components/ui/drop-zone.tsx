import type { DropZoneProps as DragAndDropPrimitiveProps } from "react-aria-components";
import {
  composeRenderProps,
  DropZone as DropAndDropPrimitive,
  Label,
} from "react-aria-components";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Description } from "@/components/ui/field";

const dropZoneVariants = cva(
  "relative flex flex-col items-center justify-center gap-2 text-sm cursor-pointer *:cursor-pointer rounded-xl border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 group data-[disabled]:pointer-events-none data-[disabled]:text-muted-foreground",
  {
    variants: {
      variant: {
        default:
          "border border-solid border-border bg-card shadow-sm hover:shadow-md hover:border-primary/30",
        dashed:
          "border-2 border-dashed border-border bg-background hover:border-primary/50 hover:bg-primary/10",
        ghost: "border-transparent bg-accent/50 hover:bg-accent",
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
      xs: "p-2 min-h-[72px] min-w-xs max-w-xs",
      sm: "p-3 min-h-[96px] min-w-sm max-w-sm",
      md: "p-5 min-h-[140px] min-w-md max-w-md",
      lg: "p-7 min-h-[180px] min-w-lg max-w-lg",
      xl: "p-10 min-h-[240px] min-w-xl max-w-xl",
      "2xl": "p-12 min-h-[280px] min-w-2xl max-w-2xl",
      "3xl": "p-14 min-h-[320px] min-w-3xl max-w-3xl",
      "4xl": "p-16 min-h-[360px] min-w-4xl max-w-4xl",
      "5xl": "p-20 min-h-[400px] min-w-5xl max-w-5xl",
      "6xl": "p-24 min-h-[460px] min-w-6xl max-w-6xl",
      "7xl": "p-28 min-h-[520px] min-w-7xl max-w-7xl",
      full: "p-6 min-h-[160px] min-w-full max-w-full w-full",
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
