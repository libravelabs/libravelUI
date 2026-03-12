import { cn } from "@/lib/utils";

export const PreviewContainer = ({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "relative w-full not-prose p-2 md:p-8 overflow-hidden",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
