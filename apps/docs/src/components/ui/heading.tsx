import { cn } from "@/lib/utils";

interface HeadingProps
  extends React.ComponentProps<"h1" | "h2" | "h3" | "h4" | "h5" | "h6"> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

const Heading = ({ className, level = 1, ...props }: HeadingProps) => {
  const Comp: `h${typeof level}` = `h${level}`;
  return (
    <Comp
      className={cn(
        "font-sans text-foreground",
        level === 1 && "font-semibold text-xl",
        level === 2 && "font-semibold text-lg",
        level === 3 && "font-semibold text-base",
        level === 4 && "font-semibold text-base",
        className
      )}
      {...props}
    />
  );
};

export type { HeadingProps };
export { Heading };
