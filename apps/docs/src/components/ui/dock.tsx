"use client";

import { useEffect, use } from "react";
import type {
  DialogProps,
  DialogTriggerProps,
  ModalOverlayProps,
} from "react-aria-components";
import {
  DialogTrigger as DialogTriggerPrimitive,
  Dialog as DialogContentPrimitive,
  Modal,
  ModalOverlay,
  OverlayTriggerStateContext,
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
import {
  AnimatePresence,
  motion,
  useMotionValue,
  AnimationPlaybackControls,
  animate,
} from "motion/react";

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
  "fixed z-50 grid gap-4 border-muted-foreground/20 bg-popover text-popover-foreground shadow-lg dark:border-border",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b",
        bottom: "inset-x-0 bottom-0 border-t",
        left: "inset-y-0 left-0 h-auto w-3/4 overflow-y-auto border-r sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-auto w-3/4 overflow-y-auto border-l sm:max-w-sm",
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
  notch?: boolean;
  shouldScaleBackground?: boolean;
}

const DockOverlay = motion.create(ModalOverlay);
const DockRoot = motion.create(Modal);

function DockContent({
  className,
  isBlurred = false,
  isDismissable: isDismissableInternal,
  side = "right",
  role = "dialog",
  closeButton = true,
  isFloat = false,
  notch = true,
  shouldScaleBackground = false,
  children,
  ...props
}: DockContentProps) {
  const state = use(OverlayTriggerStateContext)!;
  const isDismissable = isDismissableInternal ?? role !== "alertdialog";
  const isOpen = props?.isOpen ?? state?.isOpen;
  const setOpen = props?.onOpenChange ?? state?.setOpen;

  const w = typeof window !== "undefined" ? window.innerWidth : 0;
  const h = typeof window !== "undefined" ? window.innerHeight : 0;
  const offsetMotion = useMotionValue(
    side === "left" || side === "right" ? w : h
  );

  useEffect(() => {
    if (!shouldScaleBackground) return;

    const element = document.querySelector("[data-dock]") as HTMLElement | null;
    if (!element) {
      console.warn(
        "Dock: 'shouldScaleBackground' is true but no element with [data-dock] was found. Add data-dock attribute to the layout wrapper."
      );
      return;
    }

    let controls: AnimationPlaybackControls | undefined;

    if (element) {
      if (isOpen) {
        controls = animate(
          element,
          { scale: 0.99 },
          { duration: 0.3, ease: "easeInOut" }
        );
      } else {
        controls = animate(
          element,
          { scale: 1 },
          { duration: 0.3, ease: "easeInOut" }
        );
      }

      return () => {
        controls?.stop();
        element.style.removeProperty("transform");
      };
    }
  }, [isOpen, shouldScaleBackground]);

  return (
    <AnimatePresence>
      {isOpen && (
        <DockOverlay
          isDismissable={isDismissable}
          isOpen={isOpen}
          onOpenChange={setOpen}
          animate={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          exit={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
          className={cn(
            "fixed inset-0 z-50 h-(--visual-viewport-height,100vh) w-screen overflow-hidden",
            isBlurred && "backdrop-blur-sm backdrop-filter"
          )}
          {...props}
        >
          <DockRoot
            className={cn(dockContentStyles({ side, isFloat }), className)}
            initial={{
              x: side === "left" ? "-100%" : side === "right" ? "100%" : 0,
              y: side === "top" ? "-100%" : side === "bottom" ? "100%" : 0,
            }}
            animate={{ x: 0, y: 0 }}
            exit={{
              x: side === "left" ? "-100%" : side === "right" ? "100%" : 0,
              y: side === "top" ? "-100%" : side === "bottom" ? "100%" : 0,
            }}
            style={
              side === "top" || side === "bottom"
                ? { y: offsetMotion }
                : { x: offsetMotion }
            }
            transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
            drag={side === "left" || side === "right" ? "x" : "y"}
            whileDrag={{ cursor: "grabbing" }}
            dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
            onDragEnd={(_, { offset, velocity }) => {
              if (
                side === "bottom" &&
                (velocity.y > 150 || offset.y > h * 0.25)
              )
                return setOpen(false);
              if (side === "top" && (velocity.y < -150 || offset.y < -h * 0.25))
                return setOpen(false);
              if (side === "left" && velocity.x < -150) return setOpen(false);
              if (side === "right" && velocity.x > 150) return setOpen(false);

              animate(offsetMotion, 0, {
                type: "inertia",
                bounceStiffness: 600,
                bounceDamping: 40,
                min: 0,
                max: 0,
              });
            }}
            dragElastic={0.3}
            dragPropagation
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
                  {notch && side === "bottom" && (
                    <div className="notch sticky top-0 mx-auto h-1.5 w-10 shrink-0 touch-pan-y rounded-full bg-foreground/20" />
                  )}
                  {typeof children === "function" ? children(values) : children}
                  {notch && side === "top" && (
                    <div className="notch sticky bottom-0 mx-auto h-1.5 w-10 shrink-0 touch-pan-y rounded-full bg-foreground/20" />
                  )}
                  {closeButton && (
                    <DialogCloseIcon
                      className="top-2.5 right-2.5"
                      isDismissable={isDismissable}
                    />
                  )}
                </>
              )}
            </DialogContentPrimitive>
          </DockRoot>
        </DockOverlay>
      )}
    </AnimatePresence>
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
