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
      tone: {
        default: "bg-primary text-primary-foreground hover:opacity-70",
        destructive: "bg-destructive text-white hover:opacity-70",
        outline: "border bg-transparent hover:opacity-70",
        secondary: "bg-secondary text-secondary-foreground hover:opacity-70",
        ghost: "hover:bg-foreground/10",
        link: "text-primary underline-offset-4 hover:underline",
        unstyled: "",
      },
      size: {
        xs: "h-6 text-xs px-2",
        sm: "h-8 text-sm px-3",
        default: "h-9 text-sm px-4",
        lg: "h-10 text-base px-5",
        xl: "h-12 text-lg px-6",
        "2xl": "h-14 text-xl px-7",
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
      iconOnly: {
        true: "p-0 [&_svg:not([class*='size-'])]:size-[1em] aspect-square",
        false: "",
      },
    },
    defaultVariants: {
      tone: "default",
      size: "default",
      radius: "md",
      iconOnly: false,
    },
  }
);

type ButtonProps = ButtonPrimitiveProps &
  VariantProps<typeof buttonVariants> & {
    ref?: React.Ref<HTMLButtonElement>;
    isLoading?: boolean;
    loader?: React.ReactNode;
    children?: React.ReactNode;
  };

function Button({
  className,
  tone,
  size,
  radius,
  iconOnly,
  isLoading = false,
  loader,
  children,
  ...props
}: ButtonProps) {
  if (tone === "unstyled") {
    return (
      <ButtonPrimitive {...props}>
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
        cn(buttonVariants({ tone, size, radius, iconOnly, className }))
      )}
    >
      {(values) =>
        isLoading ? (
          iconOnly ? (
            (loader ?? <Loader className="text-inherit" />)
          ) : (
            <>
              {loader ?? <Loader className="text-inherit" />}
              {children}
            </>
          )
        ) : typeof children === "function" ? (
          children(values)
        ) : (
          children
        )
      }
    </ButtonPrimitive>
  );
}

export { Button, buttonVariants };
export type { ButtonProps };
