"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  type CardProps,
  CardAction,
} from "@/components/ui/core/card";
import { cn } from "@/lib/utils";

export type DocCardProps = CardProps & {
  span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  title?: string;
  description?: string;
  badge?: React.ReactNode;
  headerAction?: React.ReactNode;
};

const spanMap: Record<number, string> = {
  1: "md:col-span-1",
  2: "md:col-span-2",
  3: "md:col-span-3",
  4: "md:col-span-4",
  5: "md:col-span-5",
  6: "md:col-span-6",
  7: "md:col-span-7",
  8: "md:col-span-8",
  9: "md:col-span-9",
  10: "md:col-span-10",
  11: "md:col-span-11",
  12: "md:col-span-12",
};

export function DocCard({
  children,
  className,
  span,
  variant = "gradient",
  tone = "neutral",
  title,
  description,
  badge,
  headerAction,
  ...props
}: DocCardProps) {
  return (
    <Card
      variant={variant}
      tone={tone}
      className={cn(
        "flex flex-col gap-4 relative bg-card border shadow-md overflow-hidden",
        span && spanMap[span],
        className,
      )}
      {...props}
    >
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full sm:pr-24">
        <div className="flex flex-col gap-1">
          {title && <CardTitle className="leading-tight">{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </div>

        {badge
          ? badge
          : headerAction && <CardAction>{headerAction}</CardAction>}
      </CardHeader>

      <CardContent className="flex flex-col h-full w-full overflow-hidden">
        {children}
      </CardContent>
    </Card>
  );
}
