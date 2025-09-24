import {
  FileTrigger as FileTriggerPrimitive,
  type FileTriggerProps as FileTriggerPrimitiveProps,
} from "react-aria-components";
import { Button, type buttonVariants } from "@/components/ui/button";
import { Camera, Folder, Paperclip } from "lucide-react";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";
import { Loader } from "@/components/ui/loader";

interface FileTriggerProps
  extends FileTriggerPrimitiveProps,
    VariantProps<typeof buttonVariants> {
  pending?: boolean;
  className?: string;
  defaultCamera?: "user" | "environment";
  acceptDirectory?: boolean;
  disabled?: boolean;
}

function FileTrigger({
  variant = "outline",
  size = "default",
  radius = "md",
  pending = false,
  className,
  children,
  defaultCamera,
  acceptDirectory,
  allowsMultiple,
  disabled,
  ...props
}: FileTriggerProps) {
  return (
    <FileTriggerPrimitive {...props} allowsMultiple={allowsMultiple}>
      <Button
        type="button"
        variant={variant}
        size={size}
        radius={radius}
        disabled={disabled}
        className={cn(className)}
      >
        {pending ? (
          <Loader className="size-4" />
        ) : defaultCamera ? (
          <Camera className="size-4" />
        ) : acceptDirectory ? (
          <Folder className="size-4" />
        ) : (
          <Paperclip className="size-4" />
        )}

        <span className="ms-2">
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
