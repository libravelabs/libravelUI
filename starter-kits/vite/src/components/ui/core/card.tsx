import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

type CardProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof cardVariants> & {
    circleGradient?: boolean;
  };

const cardVariants = cva("relative overflow-hidden", {
  variants: {
    variant: {
      soft: "",
      solid: "",
      outline: "border",
      glass: "backdrop-blur-sm",
      gradient: "",
    },
    tone: {
      neutral: "",
      primary: "",
      destructive: "",
      success: "",
      warning: "",
    },
    radius: {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      "2xl": "rounded-2xl",
      full: "rounded-full",
    },
    shadow: {
      none: "shadow-none",
      sm: "shadow-sm",
      md: "shadow-md",
      lg: "shadow-lg",
    },
    padding: {
      none: "p-0",
      sm: "p-3",
      md: "p-6",
      lg: "p-8",
    },
  },
  compoundVariants: [
    {
      variant: "soft",
      tone: "neutral",
      className: "bg-card text-card-foreground",
    },
    {
      variant: "soft",
      tone: "primary",
      className: "bg-primary/20 text-primary-foreground",
    },
    {
      variant: "soft",
      tone: "destructive",
      className: "bg-destructive/20 text-destructive-foreground",
    },
    {
      variant: "soft",
      tone: "success",
      className: "bg-success/20 text-success-foreground",
    },
    {
      variant: "soft",
      tone: "warning",
      className: "bg-warning/20 text-warning-foreground",
    },

    {
      variant: "solid",
      tone: "neutral",
      className: "bg-card-foreground text-card-foreground",
    },
    {
      variant: "solid",
      tone: "primary",
      className: "bg-primary text-primary-foreground",
    },
    {
      variant: "solid",
      tone: "destructive",
      className: "bg-destructive text-destructive-foreground",
    },
    {
      variant: "solid",
      tone: "success",
      className: "bg-success text-success-foreground",
    },
    {
      variant: "solid",
      tone: "warning",
      className: "bg-warning text-warning-foreground",
    },

    {
      variant: "outline",
      tone: "neutral",
      className: "bg-transparent border-border text-card-foreground",
    },
    {
      variant: "outline",
      tone: "primary",
      className: "bg-transparent border-primary/30 text-primary-foreground",
    },
    {
      variant: "outline",
      tone: "destructive",
      className:
        "bg-transparent border-destructive/30 text-destructive-foreground",
    },
    {
      variant: "outline",
      tone: "success",
      className: "bg-transparent border-success/30 text-success-foreground",
    },
    {
      variant: "outline",
      tone: "warning",
      className: "bg-transparent border-warning/30 text-warning-foreground",
    },

    {
      variant: "glass",
      tone: "neutral",
      className: "bg-foreground/6 border border-foreground/6 text-foreground",
    },
    {
      variant: "glass",
      tone: "primary",
      className:
        "bg-primary/10 border border-primary/20 text-primary-foreground",
    },
    {
      variant: "glass",
      tone: "destructive",
      className:
        "bg-destructive/10 border border-destructive/20 text-destructive-foreground",
    },
    {
      variant: "glass",
      tone: "success",
      className:
        "bg-success/10 border border-success/20 text-success-foreground",
    },
    {
      variant: "glass",
      tone: "warning",
      className:
        "bg-warning/10 border border-warning/20 text-warning-foreground",
    },
    {
      variant: "glass",
      className: "bg-foreground/6 border",
    },

    {
      variant: "gradient",
      tone: "neutral",
      className:
        "bg-linear-to-b from-foreground/3 to-foreground/2 border border-foreground/6",
    },
    {
      variant: "gradient",
      tone: "primary",
      className: "bg-linear-to-tr from-primary/30 to-primary/25",
    },
    {
      variant: "gradient",
      tone: "destructive",
      className:
        "bg-linear-to-b from-red-900/30 to-red-900/10 ring-1 ring-red-700/30 border border-red-800/20",
    },
    {
      variant: "gradient",
      tone: "success",
      className:
        "bg-linear-to-b from-green-600/30 to-green-600/10 border border-green-700/20",
    },
    {
      variant: "gradient",
      tone: "warning",
      className:
        "bg-linear-to-b from-amber-800/30 to-amber-800/10 border border-amber-700/20",
    },
  ],
  defaultVariants: {
    variant: "soft",
    tone: "neutral",
    radius: "lg",
    shadow: "none",
    padding: "md",
  },
});

const Card = React.forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const {
    variant,
    tone = "neutral",
    radius,
    shadow,
    padding,
    className,
    children,
    circleGradient = false,
    ...rest
  } = props;

  const classes = cn(
    cardVariants({ variant, tone, radius, shadow, padding }),
    className ?? "",
  );

  return (
    <div ref={ref} data-slot="card" className={classes} {...rest}>
      {circleGradient && (
        <div
          className={cn(
            "absolute -left-20 -top-20 w-[420px] h-[420px] rounded-full bg-linear-to-tr blur-3xl pointer-events-none",
            (tone === "neutral" || tone === "primary") &&
              "from-primary/70 to-primary-65 dark:from-primary/20 dark:to-primary/6",
            tone === "destructive" &&
              "from-destructive/70 to-destructive-65 dark:from-destructive/20 dark:to-destructive/6",
            tone === "success" &&
              "from-success/70 to-success-65 dark:from-success/20 dark:to-success/6",
            tone === "warning" &&
              "from-warning/70 to-warning-65 dark:from-warning/20 dark:to-warning/6",
          )}
        />
      )}
      {children}
    </div>
  );
});
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="card-header"
      className={cn("w-full [&>*:first-child]:mb-1.5", className)}
      {...props}
    >
      {children}
    </div>
  );
});
CardHeader.displayName = "CardHeader";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="card-content"
      className={cn(className)}
      {...props}
    >
      {children}
    </div>
  );
});
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="card-footer"
      className={cn("w-full", className)}
      {...props}
    >
      {children}
    </div>
  );
});
CardFooter.displayName = "CardFooter";

const CardAction = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className,
      )}
      {...props}
    />
  );
});
CardAction.displayName = "CardAction";

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  );
});
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
});
CardDescription.displayName = "CardDescription";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  type CardProps,
};
