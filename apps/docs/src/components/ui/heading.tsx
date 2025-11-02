import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const headingVariants = cva(
  "font-sans text-foreground font-semibold tracking-light",
  {
    variants: {
      size: {
        1: "text-xl/8 sm:text-2xl/8",
        2: "text-lg/6 sm:text-xl/8",
        3: "text-base/6 sm:text-lg/6",
        4: "text-sm/5 sm:text-base/6",
        5: "text-xs/5 sm:text-sm/5",
        6: "text-[11px]/4 sm:text-xs/4",
      },
    },
    defaultVariants: {
      size: 1,
    },
  }
);

interface HeadingProps
  extends React.ComponentProps<"h1" | "h2" | "h3" | "h4" | "h5" | "h6">,
    VariantProps<typeof headingVariants> {}

const Heading = ({ className, size = 1, ...props }: HeadingProps) => {
  const Comp = `h${size}` as keyof React.JSX.IntrinsicElements;

  return (
    <Comp className={cn(headingVariants({ size }), className)} {...props} />
  );
};

export { Heading, headingVariants };
export type { HeadingProps };
