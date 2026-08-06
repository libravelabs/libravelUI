"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const avatarVariants = cva(
  "inline-flex shrink-0 overflow-hidden items-center justify-center bg-background font-medium uppercase select-none",
  {
    variants: {
      size: {
        xs: "size-6 text-xs",
        sm: "size-8 text-sm",
        md: "size-10 text-base",
        lg: "size-12 text-lg",
        xl: "size-16 text-xl",
        "2xl": "size-20 text-2xl",
        "3xl": "size-24 text-3xl",
        "4xl": "size-26 text-4xl",
        "5xl": "size-32 text-5xl",
        "6xl": "size-36 text-6xl",
        "7xl": "size-40 text-7xl",
        "8xl": "size-44 text-8xl",
        "9xl": "size-48 text-9xl",
        "10xl": "size-52 text-10xl",
      },
      shape: {
        circle: "rounded-full",
        square: "rounded-[20%]",
      },
    },
    defaultVariants: {
      size: "md",
      shape: "circle",
    },
  },
);

interface AvatarProps
  extends
    Omit<React.ComponentProps<"img">, "src">,
    VariantProps<typeof avatarVariants> {
  src?: string | null;
  initials?: string;
}

function Avatar({
  src,
  initials,
  alt = "",
  size,
  shape,
  className,
  ...props
}: AvatarProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={cn(
          avatarVariants({
            size,
            shape,
          }),
          "object-cover object-center",
          className,
        )}
        {...props}
      />
    );
  }

  return (
    <span
      className={cn(
        avatarVariants({
          size,
          shape,
        }),
        className,
      )}
    >
      <svg
        className="size-full select-none fill-current p-[5%] font-md text-[48px] uppercase bg-background"
        viewBox="0 0 100 100"
        aria-hidden={alt ? undefined : "true"}
      >
        {alt && <title>{alt}</title>}
        <text
          x="50%"
          y="50%"
          alignmentBaseline="middle"
          dominantBaseline="middle"
          textAnchor="middle"
          dy=".125em"
        >
          {initials}
        </text>
      </svg>
    </span>
  );
}

export type { AvatarProps };
export { Avatar, avatarVariants };
