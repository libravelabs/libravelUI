import {
  Separator as Divider,
  type SeparatorProps,
} from "react-aria-components";
import { cn } from "@/lib/utils";

interface CustomSeparatorProps extends SeparatorProps {
  text?: string;
}

function Separator({
  orientation = "horizontal",
  text,
  className,
  ...props
}: CustomSeparatorProps) {
  const isHorizontal = orientation === "horizontal";

  if (!text) {
    return (
      <Divider
        orientation={orientation}
        {...props}
        className={cn(
          "bg-border shrink-0",
          isHorizontal ? "h-px w-full" : "w-px h-full",
          className
        )}
      />
    );
  }

  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cn(
        "flex items-center justify-center",
        isHorizontal ? "flex-row w-full" : "flex-col h-full",
        className
      )}
    >
      <Divider
        orientation={orientation}
        {...props}
        className={cn(
          "bg-border shrink-0",
          isHorizontal ? "h-px flex-1" : "w-px flex-1"
        )}
      />
      <span
        className={cn(
          "text-sm text-muted-foreground bg-background",
          isHorizontal ? "px-2" : "py-2"
        )}
      >
        {text}
      </span>
      <Divider
        orientation={orientation}
        {...props}
        className={cn(
          "bg-border shrink-0",
          isHorizontal ? "h-px flex-1" : "w-px flex-1"
        )}
      />
    </div>
  );
}

export { Separator };
