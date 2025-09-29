"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const avatarVariants = cva(
  "-outline-offset-1 inline-grid shrink-0 align-middle outline-1 outline-foreground/(--ring-opacity) [--avatar-radius:20%] [--ring-opacity:20%] *:col-start-1 *:row-start-1",
  {
    variants: {
      size: {
        xs: "size-6",
        sm: "size-8",
        md: "size-10",
        lg: "size-12",
        xl: "size-16",
        "2xl": "size-20",
      },
      variant: {
        circle: "rounded-full *:rounded-full",
        square: "rounded-(--avatar-radius) *:rounded-(--avatar-radius)",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "circle",
    },
  }
);

interface AvatarProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof avatarVariants> {
  src?: string | null;
  initials?: string;
  alt?: string;
}

function Avatar({
  src = null,
  initials,
  alt = "",
  className,
  variant,
  size,
  ...props
}: AvatarProps) {
  return (
    <span
      data-slot="avatar"
      {...props}
      className={cn(avatarVariants({ size, variant }), className)}
    >
      {initials && (
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
      )}

      {/* Use Image from next/image if you're in NextJS */}
      {src && (
        <img
          className="size-full object-cover object-center"
          src={src}
          alt={alt}
        />
      )}
    </span>
  );
}

export type { AvatarProps };
export { Avatar, avatarVariants };
