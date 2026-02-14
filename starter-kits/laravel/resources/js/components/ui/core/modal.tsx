import type {
    DialogProps,
    DialogTriggerProps,
    ModalOverlayProps,
} from 'react-aria-components';
import {
    Dialog as DialogPrimitive,
    DialogTrigger as DialogTriggerPrimitive,
    ModalOverlay,
    Modal as ModalPrimitive,
} from 'react-aria-components';
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
import { cn } from '@/lib/utils';

function Modal(props: DialogTriggerProps) {
    return <DialogTriggerPrimitive {...props} />;
}

const sizes = {
    xs: 'sm:max-w-xs',
    sm: 'sm:max-w-sm',
    md: 'sm:max-w-md',
    lg: 'sm:max-w-lg',
    xl: 'sm:max-w-xl',
    '2xl': 'sm:max-w-2xl',
    '3xl': 'sm:max-w-3xl',
    '4xl': 'sm:max-w-4xl',
    '5xl': 'sm:max-w-5xl',
};

interface ModalContentProps extends Pick<
    DialogProps,
    'aria-label' | 'aria-labelledby' | 'role' | 'children'
> {
    size?: keyof typeof sizes;
    showCloseButton?: boolean;
    blurred?: boolean;
    className?: ModalOverlayProps['className'];
    overlayProps?: Omit<ModalOverlayProps, 'children'>;
    canDismiss?: boolean;
}

function ModalContent({
    className,
    canDismiss,
    blurred = false,
    children,
    overlayProps,
    size = 'lg',
    role = 'dialog',
    showCloseButton = true,
    ...props
}: ModalContentProps) {
    const isDismissable = canDismiss ?? role !== 'alertdialog';

    return (
        <ModalOverlay
            data-slot="modal-overlay"
            isDismissable={isDismissable}
            className={({ isExiting, isEntering }) =>
                cn(
                    'fixed inset-0 z-50 h-(--visual-viewport-height,100vh) bg-black/15 md:p-4',
                    'grid grid-rows-[1fr_auto] justify-items-center sm:grid-rows-[1fr_auto_3fr]',
                    isEntering && 'animate-in duration-300 fade-in',
                    isExiting && 'animate-out duration-200 fade-out',
                    blurred && 'backdrop-blur-sm backdrop-filter',
                )
            }
            {...overlayProps}
        >
            <ModalPrimitive
                data-slot="modal-content"
                className={({ isExiting, isEntering }) =>
                    cn(
                        'row-start-2 w-full text-start align-middle',
                        '[--visual-viewport-vertical-padding:16px] sm:[--visual-viewport-vertical-padding:32px]',
                        'relative bg-popover text-popover-foreground',
                        'shadow-lg ring ring-foreground/5 dark:ring-border',
                        'rounded-t-2xl md:rounded-xl',
                        sizes[size],
                        isEntering && [
                            'animate-in duration-300 ease-out slide-in-from-bottom',
                            'md:slide-in-from-bottom-0 md:zoom-in-95 md:fade-in',
                        ],
                        isExiting && [
                            'animate-out slide-out-to-bottom',
                            'md:slide-out-to-bottom-0 md:zoom-out-95 md:fade-out',
                        ],
                    )
                }
            >
                <DialogPrimitive
                    role={role}
                    {...props}
                    className={cn(
                        'peer/dialog group/dialog flex w-full flex-col gap-8 rounded-lg border bg-background p-6 shadow-lg duration-200',
                        className,
                    )}
                >
                    {(values) => (
                        <>
                            {typeof children === 'function'
                                ? children(values)
                                : children}
                            {showCloseButton && (
                                <DialogCloseIcon
                                    isDismissable={isDismissable}
                                />
                            )}
                        </>
                    )}
                </DialogPrimitive>
            </ModalPrimitive>
        </ModalOverlay>
    );
}

function ModalClose({
    className,
    placeholder = 'Close',
    ...props
}: React.ComponentProps<typeof DialogClose> & {
    placeholder?: string;
}) {
    return (
        <DialogClose className={cn(className)} {...props}>
            {placeholder}
        </DialogClose>
    );
}

const ModalTrigger = DialogTrigger;
const ModalHeader = DialogHeader;
const ModalTitle = DialogTitle;
const ModalDescription = DialogDescription;
const ModalFooter = DialogFooter;
const ModalBody = DialogBody;

export type { ModalContentProps };

export {
    Modal,
    ModalTrigger,
    ModalHeader,
    ModalTitle,
    ModalDescription,
    ModalFooter,
    ModalBody,
    ModalClose,
    ModalContent,
};
