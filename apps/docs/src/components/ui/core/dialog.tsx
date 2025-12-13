"use client";

import { X, Menu } from "lucide-react";
import { useEffect, useRef } from "react";
import type {
  HeadingProps,
  TextProps,
  DialogTriggerProps as DialogPrimitiveProps,
  ModalOverlayProps as DialogOverlayPrimitiveProps,
} from "react-aria-components";
import {
  Dialog as DialogContentPrimitive,
  DialogTrigger as DialogPrimitive,
  ModalOverlay as DialogOverlayPrimitive,
  Button as ButtonPrimitive,
  Heading,
  Modal,
  Text,
} from "react-aria-components";
import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "@/components/ui/core/button";

const sizes = {
  xs: "sm:max-w-xs",
  sm: "sm:max-w-sm",
  md: "sm:max-w-md",
  lg: "sm:max-w-lg",
  xl: "sm:max-w-xl",
  "2xl": "sm:max-w-2xl",
  "3xl": "sm:max-w-3xl",
  "4xl": "sm:max-w-4xl",
  "5xl": "sm:max-w-5xl",
  full: "max-w-full",
};

function Dialog({ children, ...props }: DialogPrimitiveProps) {
  return <DialogPrimitive {...props}>{children}</DialogPrimitive>;
}

type DialogTriggerProps = ButtonProps;

function DialogTrigger({
  children,
  tone,
  size,
  ref,
  ...props
}: DialogTriggerProps) {
  return (
    <Button ref={ref} size={size} tone={tone} {...props}>
      {children ? children : <Menu />}
    </Button>
  );
}

interface DialogModalProps extends React.ComponentProps<typeof Modal> {
  size?: keyof typeof sizes;
}

function DialogModal({ size = "lg", children }: DialogModalProps) {
  return (
    <Modal
      className={({ isExiting, isEntering }) =>
        cn(
          "row-start-2 w-full text-left align-middle",
          "[--visual-viewport-vertical-padding:16px] sm:[--visual-viewport-vertical-padding:32px]",
          "relative bg-popover text-popover-foreground",
          "shadow-lg ring ring-foreground/5 dark:ring-border",
          "rounded-t-2xl md:rounded-xl",
          sizes[size],
          isEntering && [
            "slide-in-from-bottom animate-in duration-300 ease-out",
            "md:fade-in md:zoom-in-95 md:slide-in-from-bottom-0",
          ],
          isExiting && [
            "slide-out-to-bottom animate-out",
            "md:fade-out md:zoom-out-95 md:slide-out-to-bottom-0",
          ]
        )
      }
    >
      {children}
    </Modal>
  );
}

interface DialogContentProps extends React.ComponentProps<
  typeof DialogContentPrimitive
> {
  size?: keyof typeof sizes;
  isBlurred?: boolean;
  isDismissable?: boolean;
}

function DialogContent({
  role = "dialog",
  isDismissable,
  isBlurred,
  size = "lg",
  className,
  ...props
}: DialogContentProps) {
  return (
    <DialogOverlay isDismissable={isDismissable} isBlurred={isBlurred}>
      <DialogModal size={size}>
        <DialogContentPrimitive
          role={role}
          className={cn(
            "peer/dialog group/dialog bg-popover text-popover-foreground flex flex-col w-full gap-8 rounded-lg border p-6 shadow-lg duration-200",
            className
          )}
          {...props}
        >
          {props.children}
        </DialogContentPrimitive>
      </DialogModal>
    </DialogOverlay>
  );
}

interface DialogOverlayProps extends DialogOverlayPrimitiveProps {
  isBlurred?: boolean;
}

function DialogOverlay({
  className,
  isDismissable = true,
  isBlurred = false,
  ...props
}: DialogOverlayProps) {
  return (
    <DialogOverlayPrimitive
      isDismissable={isDismissable}
      className={({ isExiting, isEntering }) =>
        cn(
          "fixed inset-0 z-50 h-(--visual-viewport-height,100vh) bg-black/30 md:p-4",
          "grid grid-rows-[1fr_auto] justify-items-center sm:grid-rows-[1fr_auto_3fr]",
          isEntering && "fade-in animate-in duration-300",
          isExiting && "fade-out animate-out duration-200",
          isBlurred && "backdrop-blur-sm backdrop-filter",
          className
        )
      }
      {...props}
    />
  );
}

interface DialogHeaderProps extends Omit<React.ComponentProps<"div">, "title"> {
  title?: string;
  description?: string;
}

function DialogHeader({ className, ...props }: DialogHeaderProps) {
  const headerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        header.parentElement?.style.setProperty(
          "--dialog-header-height",
          `${entry.target.clientHeight}px`
        );
      }
    });

    observer.observe(header);
    return () => observer.unobserve(header);
  }, []);

  return (
    <div
      data-slot="dialog-header"
      ref={headerRef}
      className={cn(
        "relative flex flex-col gap-2 text-center sm:text-start",
        className
      )}
    >
      {props.title && <DialogTitle>{props.title}</DialogTitle>}
      {props.description && (
        <DialogDescription>{props.description}</DialogDescription>
      )}
      {!props.title && typeof props.children === "string" ? (
        <DialogTitle {...props} />
      ) : (
        props.children
      )}
    </div>
  );
}

interface DialogTitleProps extends HeadingProps {
  ref?: React.Ref<HTMLHeadingElement>;
}

function DialogTitle({ className, ref, ...props }: DialogTitleProps) {
  return (
    <Heading
      slot="title"
      ref={ref}
      className={cn(
        "text-balance font-semibold text-foreground text-lg/6 sm:text-base/6",
        className
      )}
      {...props}
    />
  );
}

interface DialogDescriptionProps extends TextProps {
  ref?: React.Ref<HTMLDivElement>;
}

function DialogDescription({
  className,
  ref,
  ...props
}: DialogDescriptionProps) {
  return (
    <Text
      slot="description"
      className={cn(
        "text-pretty text-base/6 text-muted-foreground group-disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
}

function DialogBody({ className, ref, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-body"
      ref={ref}
      className={cn(
        "flex flex-col gap-4 max-h-[calc(var(--visual-viewport-height)-(var(--dialog-header-height)+var(--dialog-footer-height))*2)] overflow-auto",
        className
      )}
      {...props}
    />
  );
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;

    if (!footer) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        footer.parentElement?.style.setProperty(
          "--dialog-footer-height",
          `${entry.target.clientHeight}px`
        );
      }
    });

    observer.observe(footer);
    return () => {
      observer.unobserve(footer);
    };
  }, []);
  return (
    <div
      ref={footerRef}
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  );
}

function DialogClose({
  children,
  className,
  tone = "outline",
  ref,
  ...props
}: ButtonProps) {
  return (
    <Button slot="close" className={className} ref={ref} tone={tone} {...props}>
      {children ? children : "Close"}
    </Button>
  );
}

interface DialogCloseIconProps extends Omit<ButtonProps, "children"> {
  className?: string;
  isDismissable?: boolean | undefined;
}

function DialogCloseIcon({ className, ...props }: DialogCloseIconProps) {
  return props.isDismissable ? (
    <Button
      tone="ghost"
      aria-label="Close"
      slot="close"
      className={cn(
        className,
        "close absolute top-1 end-1 z-50 flex flex-col size-8 place-content-center rounded-xl hover:bg-secondary focus:bg-secondary focus:outline-hidden focus-visible:ring-1 focus-visible:ring-primary sm:top-2 sm:end-2 sm:size-7 sm:rounded-md"
      )}
    >
      <X className="size-4" />
    </Button>
  ) : null;
}

export type {
  DialogTriggerProps,
  DialogContentProps,
  DialogOverlayProps,
  DialogHeaderProps,
  DialogTitleProps,
  DialogDescriptionProps,
  DialogCloseIconProps,
};

export {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
  DialogCloseIcon,
};
