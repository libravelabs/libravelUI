import type { CheckboxProps as CheckboxPrimitiveProps } from 'react-aria-components';
import {
    Checkbox as CheckboxPrimitive,
    composeRenderProps,
} from 'react-aria-components';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Description, Label } from '@/components/ui/core/field';
import { Check, Minus } from 'lucide-react';

const checkboxVariants = cva('group block w-fit disabled:opacity-50');

const checkboxWrapper = cva('group grid items-center disabled:opacity-50', {
    variants: {
        withDescription: {
            true: 'grid-cols-[1.125rem_1fr] items-center gap-x-3 gap-y-1 *:data-[slot=indicator]:mt-0.75 sm:grid-cols-[1rem_1fr] sm:*:data-[slot=indicator]:mt-1',
            false: 'grid-cols-[auto_1fr] gap-x-2',
        },
    },
    defaultVariants: {
        withDescription: false,
    },
});

const checkboxIndicator = cva(
    [
        'relative isolate flex shrink-0 items-center justify-center rounded-sm transition',
        'bg-background text-muted-foreground inset-ring inset-ring-accent',
        'cursor-pointer disabled:cursor-not-allowed',
    ],
    {
        variants: {
            size: {
                sm: 'size-4 *:data-[slot=check-indicator]:size-3',
                md: 'size-4.5 *:data-[slot=check-indicator]:size-4',
                lg: 'size-5 *:data-[slot=check-indicator]:size-4.5',
                xl: 'size-5.5 *:data-[slot=check-indicator]:size-5',
            },
            isSelected: {
                true: 'bg-primary text-primary-foreground dark:inset-ring-primary',
            },
            isIndeterminate: {
                true: 'bg-primary text-primary-foreground dark:inset-ring-primary',
            },
            isFocusVisible: {
                true: 'ring-3 ring-ring/20 inset-ring-primary focus-within:inset-ring-ring/70 focus-within:hover:inset-ring-ring/70',
            },
            isInvalid: {
                true: 'bg-destructive/20 text-destructive-foreground ring-destructive/20 inset-ring-destructive/70',
            },
            isDisabled: {
                true: 'cursor-not-allowed opacity-50',
            },
            isReadOnly: {
                true: 'pointer-events-none',
            },
        },
        defaultVariants: {
            size: 'md',
        },
    },
);

type CheckboxProps = CheckboxPrimitiveProps &
    VariantProps<typeof checkboxWrapper> &
    VariantProps<typeof checkboxIndicator> & {
        label?: string;
        description?: string;
        tabIndex?: number;
    };

function Checkbox({
    className,
    children,
    description,
    label,
    size,
    ...props
}: CheckboxProps) {
    return (
        <>
            <CheckboxPrimitive
                {...props}
                className={cn(checkboxVariants(), className)}
            >
                {composeRenderProps(
                    children,
                    (
                        children,
                        {
                            isSelected,
                            isIndeterminate,
                            isFocusVisible,
                            isInvalid,
                            isDisabled,
                            isReadOnly,
                        },
                    ) => {
                        const isStringChild = typeof children === 'string';
                        const hasCustomChildren =
                            typeof children !== 'undefined';

                        const indicator = isIndeterminate ? (
                            <Minus data-slot="check-indicator" />
                        ) : isSelected ? (
                            <Check data-slot="check-indicator" />
                        ) : null;

                        const content = hasCustomChildren ? (
                            isStringChild ? (
                                <Label>{children}</Label>
                            ) : (
                                <>{children}</>
                            )
                        ) : (
                            <>
                                {label && <Label>{label}</Label>}
                                {description && (
                                    <Description>{description}</Description>
                                )}
                            </>
                        );

                        return (
                            <div
                                className={cn(
                                    checkboxWrapper({
                                        withDescription: !!description,
                                    }),
                                    className,
                                )}
                            >
                                <span
                                    data-slot="indicator"
                                    className={cn(
                                        checkboxIndicator({
                                            size,
                                            isSelected,
                                            isIndeterminate,
                                            isFocusVisible,
                                            isInvalid,
                                            isDisabled,
                                            isReadOnly,
                                        }),
                                    )}
                                >
                                    {indicator}
                                </span>
                                <div>{content}</div>
                            </div>
                        );
                    },
                )}
            </CheckboxPrimitive>
        </>
    );
}

export type { CheckboxProps };
export { Checkbox };
