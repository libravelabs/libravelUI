"use client";

import {
  composeRenderProps,
  Link as LinkPrimitive,
  type LinkProps as LinkPrimitiveProps,
} from "react-aria-components";
import { cva, type VariantProps } from "class-variance-authority";

const linkVariants = cva(
  "disabled:cursor-default disabled:opacity-60 forced-colors:disabled:text-muted-foreground w-fit cursor-pointer transition-all duration-300",
  {
    variants: {
      tone: {
        default: "text-current hover:text-foreground",
        primary: "text-primary hover:text-primary/80",
        secondary: "text-muted-foreground hover:text-foreground",
        underline: "text-current underline hover:no-underline",
      },
      isDisabled: {
        true: "cursor-not-allowed opacity-50",
        false: "",
      },
    },
    defaultVariants: {
      tone: "default",
      isDisabled: false,
    },
  }
);

type LinkProps = LinkPrimitiveProps &
  VariantProps<typeof linkVariants> & {
    ref?: React.RefObject<HTMLAnchorElement>;
  };

function Link({ className, ref, tone, ...props }: LinkProps) {
  return (
    <LinkPrimitive
      ref={ref}
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        linkVariants({
          ...renderProps,
          tone,
          className,
        })
      )}
    >
      {(values) =>
        typeof props.children === "function"
          ? props.children(values)
          : props.children
      }
    </LinkPrimitive>
  );
}

export type { LinkProps };
export { Link };
