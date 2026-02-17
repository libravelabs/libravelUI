import { use } from 'react';
import type {
    DialogProps,
    DialogTriggerProps,
    ModalOverlayProps,
} from 'react-aria-components';
import {
    DialogTrigger as DialogTriggerPrimitive,
    Dialog as DialogContentPrimitive,
    Modal,
    ModalOverlay,
    OverlayTriggerStateContext,
} from 'react-aria-components';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import {
    DialogBody,
    DialogClose,
    DialogCloseIcon,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/core/dialog';
import {
    AnimatePresence,
    motion,
    useMotionValue,
    animate,
    type PanInfo,
} from 'motion/react';

type Sides = 'top' | 'bottom' | 'left' | 'right';

const dockContentStyles = cva(
    'fixed z-50 grid gap-4 border-muted-foreground/20 bg-popover text-popover-foreground shadow-lg dark:border-border',
    {
        variants: {
            side: {
                top: 'inset-x-0 top-0 border-b',
                bottom: 'inset-x-0 bottom-0 border-t',
                left: 'inset-y-0 left-0 h-full w-[280px] overflow-hidden border-r',
                right: 'inset-y-0 right-0 h-full w-[280px] overflow-hidden border-l',
            },
            isFloat: {
                false: 'rounded-none border-border',
                true: 'rounded-lg ring-foreground/5 dark:ring-border',
            },
        },
        compoundVariants: [
            {
                side: 'top',
                isFloat: true,
                class: 'inset-x-2 top-2 rounded-lg border-b-0 ring-1',
            },
            {
                side: 'bottom',
                isFloat: true,
                class: 'inset-x-2 bottom-2 rounded-lg border-t-0 ring-1',
            },
            {
                side: 'left',
                isFloat: true,
                class: 'inset-y-2 left-2 rounded-lg border-r-0 ring-1',
            },
            {
                side: 'right',
                isFloat: true,
                class: 'inset-y-2 right-2 rounded-lg border-l-0 ring-1',
            },
        ],
    },
);

type DockProps = DialogTriggerProps;
function Dock(props: DockProps) {
    return <DialogTriggerPrimitive {...props} />;
}

/**
 * Props for the DockContent component.
 */
interface DockContentProps
    extends
        Omit<ModalOverlayProps, 'children'>,
        Pick<
            DialogProps,
            'aria-label' | 'role' | 'aria-labelledby' | 'children'
        > {
    /** Whether to show a close button. */
    closeButton?: boolean;
    /** Whether to blur the background. */
    isBlurred?: boolean;
    /** Whether the dock should float (have margins from edges). */
    isFloat?: boolean;
    /** The side of the screen the dock appears from. */
    side?: Sides;
    /** Whether to show a drag notch. */
    notch?: boolean;
    /** Custom class names for various parts of the dock. */
    classNames?: {
        overlay?: string | string[];
        wrapper?: string | string[];
        content?: string | string[];
    };
}

const DockOverlay = motion.create(ModalOverlay);
const DockRoot = motion.create(Modal);

/**
 * The content area of the Dock (Slide-out menu).
 * Supports dragging, floating styles, and various side placements.
 */
function DockContent({
    className,
    classNames,
    isBlurred = false,
    isDismissable: isDismissableInternal,
    side = 'right',
    role = 'dialog',
    closeButton = true,
    isFloat = false,
    notch = true,
    children,
    ...props
}: DockContentProps) {
    const state = use(OverlayTriggerStateContext)!;
    const isDismissable = isDismissableInternal ?? role !== 'alertdialog';
    const isOpen = props?.isOpen ?? state?.isOpen;
    const setOpen = props?.onOpenChange ?? state?.setOpen;

    const w = typeof window !== 'undefined' ? window.innerWidth : 0;
    const h = typeof window !== 'undefined' ? window.innerHeight : 0;
    const offsetMotion = useMotionValue(
        side === 'left' || side === 'right' ? w : h,
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <DockOverlay
                    isDismissable={isDismissable}
                    isOpen={isOpen}
                    onOpenChange={setOpen}
                    animate={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                    exit={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
                    className={cn(
                        'fixed inset-0 z-50 h-(--visual-viewport-height,100vh) w-screen overflow-hidden',
                        isBlurred && 'backdrop-blur-sm backdrop-filter',
                        classNames?.overlay,
                    )}
                    {...props}
                >
                    <DockRoot
                        className={cn(
                            dockContentStyles({ side, isFloat }),
                            className || classNames?.wrapper,
                        )}
                        initial={{
                            x:
                                side === 'left'
                                    ? '-100%'
                                    : side === 'right'
                                      ? '100%'
                                      : 0,
                            y:
                                side === 'top'
                                    ? '-100%'
                                    : side === 'bottom'
                                      ? '100%'
                                      : 0,
                        }}
                        animate={{ x: 0, y: 0 }}
                        exit={{
                            x:
                                side === 'left'
                                    ? '-100%'
                                    : side === 'right'
                                      ? '100%'
                                      : 0,
                            y:
                                side === 'top'
                                    ? '-100%'
                                    : side === 'bottom'
                                      ? '100%'
                                      : 0,
                        }}
                        style={
                            side === 'top' || side === 'bottom'
                                ? { y: offsetMotion }
                                : { x: offsetMotion }
                        }
                        transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
                        drag={side === 'left' || side === 'right' ? 'x' : 'y'}
                        whileDrag={{ cursor: 'grabbing' }}
                        dragConstraints={{
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0,
                        }}
                        onDragEnd={(
                            _: MouseEvent | TouchEvent | PointerEvent,
                            { offset, velocity }: PanInfo,
                        ) => {
                            if (
                                side === 'bottom' &&
                                (velocity.y > 150 || offset.y > h * 0.25)
                            )
                                return setOpen(false);
                            if (
                                side === 'top' &&
                                (velocity.y < -150 || offset.y < -h * 0.25)
                            )
                                return setOpen(false);
                            if (side === 'left' && velocity.x < -150)
                                return setOpen(false);
                            if (side === 'right' && velocity.x > 150)
                                return setOpen(false);

                            animate(offsetMotion, 0, {
                                type: 'inertia',
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
                            aria-label={props['aria-label']}
                            role={role}
                            className={cn(
                                'flex w-full flex-col gap-8 rounded-lg border bg-background p-6 shadow-lg duration-200',
                                !isFloat && 'rounded-none',
                                classNames?.content,
                            )}
                        >
                            {(values) => (
                                <>
                                    {notch && side === 'bottom' && (
                                        <div className="notch sticky top-0 mx-auto h-1.5 w-10 shrink-0 touch-pan-y rounded-full bg-foreground/20" />
                                    )}
                                    {typeof children === 'function'
                                        ? children(values)
                                        : children}
                                    {notch && side === 'top' && (
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
        <DialogFooter className={cn('mt-auto', className)}>
            {children}
        </DialogFooter>
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
