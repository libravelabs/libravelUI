"use client";

import type {
  DialogProps,
  DialogTriggerProps,
  ModalOverlayProps,
} from "react-aria-components";
import {
  composeRenderProps,
  DialogTrigger as DialogTriggerPrimitive,
  Dialog as DialogContentPrimitive,
  Modal,
  ModalOverlay,
} from "react-aria-components";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

import {
  DialogBody,
  DialogClose,
  DialogCloseIcon,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Sides = "top" | "bottom" | "left" | "right";

const generateCompoundVariants = (sides: Array<Sides>) => {
  return sides.map((side) => ({
    side,
    isFloat: true,
    class: cn(
      "rounded-lg ring-1",
      side === "top" && "top-2 inset-x-2 border-b-0",
      side === "bottom" && "bottom-2 inset-x-2 border-t-0",
      side === "left" && "left-2 inset-y-2 border-r-0",
      side === "right" && "right-2 inset-y-2 border-l-0"
    ),
  }));
};

const dockContentStyles = cva(
  "fixed z-50 grid gap-4 border-muted-foreground/20 bg-popover text-popover-foreground shadow-lg transition ease-in-out dark:border-border",
  {
    variants: {
      isEntering: {
        true: "fade-in animate-in duration-300",
      },
      isExiting: {
        true: "fade-out animate-out duration-200",
      },
      side: {
        top: "entering:slide-in-from-top exiting:slide-out-to-top inset-x-0 top-0 border-b",
        bottom:
          "entering:slide-in-from-bottom exiting:slide-out-to-bottom inset-x-0 bottom-0 border-t",
        left: "entering:slide-in-from-left exiting:slide-out-to-left inset-y-0 left-0 h-auto w-3/4 overflow-y-auto border-r sm:max-w-sm",
        right:
          "entering:slide-in-from-right exiting:slide-out-to-right inset-y-0 right-0 h-auto w-3/4 overflow-y-auto border-l sm:max-w-sm",
      },
      isFloat: {
        false: "border-border rounded-none",
        true: "ring-foreground/5 dark:ring-border rounded-lg",
      },
    },
    compoundVariants: generateCompoundVariants([
      "top",
      "bottom",
      "left",
      "right",
    ]),
  }
);

type DockProps = DialogTriggerProps;
function Dock(props: DockProps) {
  return <DialogTriggerPrimitive {...props} />;
}

interface DockContentProps
  extends Omit<ModalOverlayProps, "children">,
    Pick<DialogProps, "aria-label" | "role" | "aria-labelledby" | "children"> {
  closeButton?: boolean;
  isBlurred?: boolean;
  isFloat?: boolean;
  side?: Sides;
}

function DockContent({
  className,
  isBlurred = false,
  isDismissable: isDismissableInternal,
  side = "right",
  role = "dialog",
  closeButton = true,
  isFloat = false,
  children,
  ...props
}: DockContentProps) {
  const isDismissable = isDismissableInternal ?? role !== "alertdialog";

  return (
    <ModalOverlay
      isDismissable={isDismissable}
      className={({ isEntering, isExiting }) =>
        cn(
          "fixed inset-0 z-50 h-(--visual-viewport-height,100vh) w-screen overflow-hidden bg-black/30",
          isEntering && "fade-in animate-in duration-300",
          isExiting && "fade-out animate-out duration-300",
          isBlurred && "backdrop-blur-sm backdrop-filter"
        )
      }
      {...props}
    >
      <Modal
        className={composeRenderProps(className, (className, renderProps) =>
          dockContentStyles({
            ...renderProps,
            side,
            isFloat,
            className,
          })
        )}
      >
        <DialogContentPrimitive
          aria-label={props["aria-label"]}
          role={role}
          className={cn(
            "bg-background flex flex-col w-full gap-8 rounded-lg border p-6 shadow-lg duration-200",
            !isFloat && "rounded-none"
          )}
        >
          {(values) => (
            <>
              {typeof children === "function" ? children(values) : children}
              {closeButton && (
                <DialogCloseIcon
                  className="top-2.5 right-2.5"
                  isDismissable={isDismissable}
                />
              )}
            </>
          )}
        </DialogContentPrimitive>
      </Modal>
    </ModalOverlay>
  );
}

function DockFooter({
  className,
  children,
}: React.ComponentProps<typeof DialogFooter>) {
  return (
    <DialogFooter className={cn("mt-auto", className)}>{children}</DialogFooter>
  );
}

const DockTrigger = DialogTrigger;
const DockHeader = DialogHeader;
const DockTitle = DialogTitle;
const DockDescription = DialogDescription;
const DockBody = DialogBody;
const DockClose = DialogClose;

export type { DockProps, DockContentProps, Sides };
export {
  Dock,
  DockTrigger,
  DockFooter,
  DockHeader,
  DockTitle,
  DockDescription,
  DockBody,
  DockClose,
  DockContent,
};
