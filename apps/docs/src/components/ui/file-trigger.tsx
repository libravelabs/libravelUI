import {
  FileTrigger as FileTriggerPrimitive,
  type FileTriggerProps as FileTriggerPrimitiveProps,
} from "react-aria-components";
import { Button, type buttonVariants } from "@/components/ui/button";
import { Camera, Folder, Paperclip } from "lucide-react";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";

interface FileTriggerProps
  extends FileTriggerPrimitiveProps,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  className?: string;
  defaultCamera?: "user" | "environment";
  acceptDirectory?: boolean;
  isDisabled?: boolean;
}

function FileTrigger({
  variant = "outline",
  size = "default",
  radius = "md",
  isLoading = false,
  className,
  children,
  defaultCamera,
  acceptDirectory = false,
  allowsMultiple = false,
  isDisabled = false,
  ...props
}: FileTriggerProps) {
  return (
    <FileTriggerPrimitive {...props} allowsMultiple={allowsMultiple}>
      <Button
        type="button"
        variant={variant}
        size={size}
        radius={radius}
        isLoading={isLoading}
        isDisabled={isDisabled}
        className={cn(className)}
      >
        {isLoading ? null : defaultCamera ? (
          <Camera className="size-4" />
        ) : acceptDirectory ? (
          <Folder className="size-4" />
        ) : (
          <Paperclip className="size-4" />
        )}

        <span>
          {children ??
            (allowsMultiple
              ? "Browse files..."
              : acceptDirectory
                ? "Browse folder..."
                : "Browse file...")}
        </span>
      </Button>
    </FileTriggerPrimitive>
  );
}

export { FileTrigger };
export type { FileTriggerProps };
