import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

function SkeletonText({
  lines = 3,
  className,
  ...props
}: { lines?: number } & React.ComponentProps<"div">) {
  return (
    <div className="grid gap-2 w-full">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          {...props}
          className={cn(
            "h-4 bg-accent animate-pulse rounded-md w-full",
            className
          )}
        />
      ))}
    </div>
  );
}

export { Skeleton, SkeletonText };
