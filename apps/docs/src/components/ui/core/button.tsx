"use client";

import { cva, type VariantProps } from "class-variance-authority";
import {
  Button as ButtonPrimitive,
  type ButtonProps as ButtonPrimitiveProps,
  composeRenderProps,
} from "react-aria-components";
import { cn } from "@/lib/utils";
import { Loader } from "@/components/ui/core/loader";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none cursor-pointer",
    "focus:outline-0 focus-visible:outline focus-visible:outline-offset-2 focus-visible:ring-2 focus-visible:ring-offset-3 focus-visible:ring-offset-background",
  ],
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:opacity-70",
        destructive: "bg-destructive text-white hover:opacity-70",
        outline: [
          "border bg-background hover:opacity-70",
          "inset-ring inset-ring-input focus:inset-ring-ring/70 focus:ring-3 focus:ring-ring/20",
        ],
        secondary: "bg-secondary text-secondary-foreground hover:opacity-70",
        ghost: "hover:bg-foreground/10",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 gap-0.5 px-2 has-[>svg]:px-1.5",
        sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 px-6 has-[>svg]:px-4",
        "icon-xs": "size-5",
        "icon-sm": "size-6",
        icon: "size-9",
        "icon-lg": "size-12",
        "icon-xl": "size-14",
        "icon-2xl": "size-16",
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      radius: "md",
    },
  }
);

type ButtonProps = ButtonPrimitiveProps &
  VariantProps<typeof buttonVariants> & {
    ref?: React.Ref<HTMLButtonElement>;
    className?: string;
    isLoading?: boolean;
    loader?: React.ReactNode;
    children?: React.ReactNode;
    plain?: boolean;
  };

function Button({
  className,
  variant,
  size,
  radius,
  isLoading = false,
  plain = false,
  loader,
  children,
  ...props
}: ButtonProps) {
  if (plain) {
    return (
      <ButtonPrimitive>
        {(values) =>
          typeof children === "function" ? children(values) : children
        }
      </ButtonPrimitive>
    );
  }

  return (
    <ButtonPrimitive
      {...props}
      isDisabled={props.isDisabled || isLoading}
      className={composeRenderProps(className, (className) =>
        cn(buttonVariants({ variant, size, radius, className }), className)
      )}
    >
      {(values) => {
        if (isLoading) {
          return size && size.includes("icon") ? (
            (loader ?? <Loader className="text-inherit" />)
          ) : (
            <>
              {loader ?? <Loader className="text-inherit" />}
              {children}
            </>
          );
        }
        return typeof children === "function" ? children(values) : children;
      }}
    </ButtonPrimitive>
  );
}

export { Button, buttonVariants };
export type { ButtonProps };
