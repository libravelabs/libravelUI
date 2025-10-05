"use client";

import type {
  DialogTriggerProps,
  PopoverProps as PopoverPrimitiveProps,
} from "react-aria-components";
import {
  DialogTrigger as DialogTriggerPrimitive,
  OverlayArrow,
  Popover as PopoverPrimitive,
} from "react-aria-components";
import { composeTailwindRenderProps } from "@/lib/render-props";
import {
  DialogBody,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type PopoverProps = DialogTriggerProps;
function Popover(props: PopoverProps) {
  return <DialogTriggerPrimitive {...props} />;
}

interface PopoverContentProps extends PopoverPrimitiveProps {
  withArrow?: boolean;
  ref?: React.Ref<HTMLDivElement>;
}

function PopoverContent({
  children,
  withArrow = false,
  className,
  ref,
  ...props
}: PopoverContentProps) {
  const offset = props.offset ?? (withArrow ? 12 : 8);
  return (
    <PopoverPrimitive
      ref={ref}
      offset={offset}
      className={composeTailwindRenderProps(className, [
        "min-w-0 w-fit max-w-xs p-4 rounded-xl border bg-popover text-popover-foreground shadow-xs outline-hidden transition-transform [--gutter:--spacing(6)] sm:text-sm dark:backdrop-saturate-200 **:[[role=dialog]]:[--gutter:--spacing(4)]",
        "entering:fade-in entering:animate-in",
        "exiting:fade-out exiting:animate-out",
        "placement-start:entering:slide-in-from-end-1 placement-end:entering:slide-in-from-start-1 placement-top:entering:slide-in-from-bottom-1 placement-bottom:entering:slide-in-from-top-1",
        "placement-start:exiting:slide-out-to-end-1 placement-end:exiting:slide-out-to-start-1 placement-top:exiting:slide-out-to-bottom-1 placement-bottom:exiting:slide-out-to-top-1",
        "forced-colors:bg-[Canvas]",
      ])}
      {...props}
    >
      {(values) => (
        <>
          {withArrow && (
            <OverlayArrow className="group">
              <svg
                width={12}
                height={12}
                viewBox="0 0 12 12"
                className="group-placement-start:-rotate-90 block fill-popover stroke-border group-placement-bottom:rotate-180 group-placement-end:rotate-90 forced-colors:fill-[Canvas] forced-colors:stroke-[ButtonBorder]"
              >
                <path d="M0 0 L6 6 L12 0" />
              </svg>
            </OverlayArrow>
          )}
          {typeof children === "function" ? children(values) : children}
        </>
      )}
    </PopoverPrimitive>
  );
}

const PopoverTrigger = DialogTrigger;
const PopoverClose = DialogClose;
const PopoverDescription = DialogDescription;
const PopoverTitle = DialogTitle;
const PopoverHeader = DialogHeader;
const PopoverBody = DialogBody;
const PopoverFooter = DialogFooter;

export type { PopoverProps, PopoverContentProps };
export {
  Popover,
  PopoverTrigger,
  PopoverClose,
  PopoverDescription,
  PopoverContent,
  PopoverBody,
  PopoverFooter,
  PopoverHeader,
  PopoverTitle,
};
