"use client";

import React, {
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  motion,
  AnimatePresence,
  MotionConfig,
  Transition,
  Variant,
  LayoutGroup,
} from "motion/react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";
import { useOutsideClick } from "@/hooks/use-outside-click";

type MorphingCardContextType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  uniqueId: string;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
};

const MorphingCardContext = React.createContext<MorphingCardContextType | null>(
  null
);

function useMorphingCard() {
  const context = useContext(MorphingCardContext);
  if (!context) {
    throw new Error(
      "useMorphingCard must be used within a MorphingCardProvider"
    );
  }
  return context;
}

type MorphingCardProviderProps = {
  children: React.ReactNode;
  transition?: Transition;
};

function MorphingCardProvider({
  children,
  transition,
}: MorphingCardProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const uniqueId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null!);

  const contextValue = useMemo(
    () => ({
      isOpen,
      setIsOpen,
      uniqueId,
      triggerRef,
    }),
    [isOpen, uniqueId]
  );

  return (
    <MorphingCardContext.Provider value={contextValue}>
      <MotionConfig transition={transition}>
        <LayoutGroup id={uniqueId}>{children}</LayoutGroup>
      </MotionConfig>
    </MorphingCardContext.Provider>
  );
}

type MorphingCardProps = {
  children: React.ReactNode;
  transition?: Transition;
};

function MorphingCard({ children, transition }: MorphingCardProps) {
  return (
    <MorphingCardProvider>
      <MotionConfig transition={transition}>{children}</MotionConfig>
    </MorphingCardProvider>
  );
}

type MorphingCardTriggerProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  triggerRef?: React.RefObject<HTMLButtonElement>;
};

function MorphingCardTrigger({
  children,
  className,
  style,
  triggerRef,
}: MorphingCardTriggerProps) {
  const { setIsOpen, isOpen, uniqueId } = useMorphingCard();

  const handleClick = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setIsOpen(!isOpen);
      }
    },
    [isOpen, setIsOpen]
  );

  return (
    <motion.button
      ref={triggerRef}
      layoutId={`card-${uniqueId}`}
      className={cn("relative cursor-pointer", className)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      style={style}
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      aria-controls={`morphing-card-content-${uniqueId}`}
      aria-label={`Open card ${uniqueId}`}
    >
      {children}
    </motion.button>
  );
}

interface MorphingCardContentRenderProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}

type MorphingCardContentProps = {
  children:
    | React.ReactNode
    | ((props: MorphingCardContentRenderProps) => React.ReactNode);
  className?: string;
  style?: React.CSSProperties;
};

function MorphingCardContent({
  children,
  className,
  style,
}: MorphingCardContentProps) {
  const { setIsOpen, isOpen, uniqueId, triggerRef } = useMorphingCard();
  const containerRef = useRef<HTMLDivElement>(null!);
  const [firstFocusableElement, setFirstFocusableElement] =
    useState<HTMLElement | null>(null);
  const [lastFocusableElement, setLastFocusableElement] =
    useState<HTMLElement | null>(null);

  const content =
    typeof children === "function" ? children({ setIsOpen, isOpen }) : children;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
      if (event.key === "Tab") {
        if (!firstFocusableElement || !lastFocusableElement) return;

        if (event.shiftKey) {
          if (document.activeElement === firstFocusableElement) {
            event.preventDefault();
            lastFocusableElement.focus();
          }
        } else {
          if (document.activeElement === lastFocusableElement) {
            event.preventDefault();
            firstFocusableElement.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [setIsOpen, firstFocusableElement, lastFocusableElement]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
      const focusableElements = containerRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements && focusableElements.length > 0) {
        setFirstFocusableElement(focusableElements[0] as HTMLElement);
        setLastFocusableElement(
          focusableElements[focusableElements.length - 1] as HTMLElement
        );
        (focusableElements[0] as HTMLElement).focus();
      }
    } else {
      document.body.classList.remove("overflow-hidden");
      triggerRef.current?.focus();
    }
  }, [isOpen, triggerRef]);

  useOutsideClick(containerRef, () => {
    if (isOpen) setIsOpen(false);
  });

  return (
    <motion.div
      ref={containerRef}
      layoutId={`card-${uniqueId}`}
      className={cn(
        "overflow-hidden bg-popover pointer-events-auto",
        className
      )}
      style={style}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`morphing-card-title-${uniqueId}`}
      aria-describedby={`morphing-card-description-${uniqueId}`}
    >
      {content}
    </motion.div>
  );
}

type MorphingCardContainerProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  showOverlay?: boolean;
  overlay?: MorphingCardOverlayProps;
};

function MorphingCardContainer({
  children,
  showOverlay = true,
  overlay,
}: MorphingCardContainerProps) {
  const { isOpen } = useMorphingCard();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence initial={false} mode="sync">
      {isOpen && (
        <>
          {showOverlay && <MorphingCardOverlay {...overlay} />}
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            {children}
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

type MorphingCardOverlayProps = {
  className?: string;
  children?: React.ReactNode;
};

function MorphingCardOverlay({
  className,
  children,
}: MorphingCardOverlayProps) {
  const { uniqueId } = useMorphingCard();
  return (
    <motion.div
      key={`backdrop-${uniqueId}`}
      className={cn(
        "fixed inset-0 h-full w-full bg-black/50 backdrop-blur-sm z-50",
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
}

type MorphingCardTitleProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

function MorphingCardTitle({
  children,
  className,
  style,
}: MorphingCardTitleProps) {
  const { uniqueId } = useMorphingCard();
  return (
    <motion.div
      layoutId={`card-title-container-${uniqueId}`}
      className={className}
      style={style}
      layout
    >
      {children}
    </motion.div>
  );
}

type MorphingCardSubtitleProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

function MorphingCardSubtitle({
  children,
  className,
  style,
}: MorphingCardSubtitleProps) {
  const { uniqueId } = useMorphingCard();
  return (
    <motion.div
      layoutId={`card-subtitle-container-${uniqueId}`}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

type MorphingCardDescriptionProps = {
  children: React.ReactNode;
  className?: string;
  disableLayoutAnimation?: boolean;
  variants?: {
    initial: Variant;
    animate: Variant;
    exit: Variant;
  };
};

function MorphingCardDescription({
  children,
  className,
  variants,
  disableLayoutAnimation,
}: MorphingCardDescriptionProps) {
  const { uniqueId } = useMorphingCard();
  return (
    <motion.div
      key={`card-description-${uniqueId}`}
      layoutId={
        disableLayoutAnimation
          ? undefined
          : `card-description-content-${uniqueId}`
      }
      variants={variants}
      className={className}
      initial="initial"
      animate="animate"
      exit="exit"
      id={`card-description-${uniqueId}`}
    >
      {children}
    </motion.div>
  );
}

type MorphingCardImageProps = {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
};

function MorphingCardImage({
  src,
  alt,
  className,
  style,
}: MorphingCardImageProps) {
  const { uniqueId } = useMorphingCard();
  return (
    <motion.img
      src={src}
      alt={alt}
      className={cn(className)}
      layoutId={`card-img-${uniqueId}`}
      style={style}
    />
  );
}

type MorphingCardCloseProps = {
  children?: React.ReactNode;
  className?: string;
  variants?: {
    initial: Variant;
    animate: Variant;
    exit: Variant;
  };
};

function MorphingCardClose({
  children,
  className,
  variants,
}: MorphingCardCloseProps) {
  const { setIsOpen, uniqueId } = useMorphingCard();
  const handleClose = useCallback(() => setIsOpen(false), [setIsOpen]);

  return (
    <motion.button
      onClick={handleClose}
      type="button"
      aria-label="Close card"
      key={`card-close-${uniqueId}`}
      className={cn(
        "absolute top-3 right-3 opacity-60 hover:opacity-100 transition-opacity bg-background rounded-full cursor-pointer p-1 size-5 [&_svg:not([class*='size-'])]:size-3",
        className
      )}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
    >
      {children || <XIcon />}
    </motion.button>
  );
}

export {
  MorphingCard,
  MorphingCardTrigger,
  MorphingCardContainer,
  MorphingCardContent,
  MorphingCardOverlay,
  MorphingCardClose,
  MorphingCardTitle,
  MorphingCardSubtitle,
  MorphingCardDescription,
  MorphingCardImage,
};

export type {
  MorphingCardContextType,
  MorphingCardProviderProps,
  MorphingCardProps,
  MorphingCardTriggerProps,
  MorphingCardContentProps,
  MorphingCardContainerProps,
  MorphingCardOverlayProps,
  MorphingCardTitleProps,
  MorphingCardSubtitleProps,
  MorphingCardDescriptionProps,
  MorphingCardImageProps,
  MorphingCardCloseProps,
};
