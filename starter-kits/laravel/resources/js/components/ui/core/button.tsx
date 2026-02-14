import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import {
    Button as ButtonPrimitive,
    type ButtonProps as ButtonPrimitiveProps,
} from 'react-aria-components';
import { Loader } from '@/components/ui/core/loader';
import { cn } from '@/lib/utils';

export const buttonVariants = cva(
    [
        "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 text-sm font-medium whitespace-nowrap transition-all outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        'focus:outline-0 focus-visible:ring-2 focus-visible:ring-offset-3 focus-visible:ring-offset-background focus-visible:outline focus-visible:outline-offset-2',

        'pending:pointer-events-none pending:opacity-50',
    ],
    {
        variants: {
            tone: {
                default: 'bg-primary text-primary-foreground hover:opacity-70',
                destructive: 'bg-destructive text-white hover:opacity-70',
                outline: 'border border-border bg-transparent hover:opacity-70',
                secondary:
                    'bg-secondary text-secondary-foreground hover:opacity-70',
                ghost: 'hover:bg-foreground/10',
                link: 'text-primary underline-offset-4 hover:underline',
                unstyled: '',
            },
            size: {
                xs: 'h-6 px-2 text-xs',
                sm: 'h-8 px-3 text-sm',
                default: 'h-9 px-4 text-sm',
                lg: 'h-10 px-5 text-base',
                xl: 'h-12 px-6 text-lg',
                '2xl': 'h-14 px-7 text-xl',
            },
            radius: {
                none: 'rounded-none',
                sm: 'rounded-sm',
                md: 'rounded-md',
                lg: 'rounded-lg',
                xl: 'rounded-xl',
                '2xl': 'rounded-2xl',
                full: 'rounded-full',
            },
            iconOnly: {
                true: "aspect-square p-0 [&_svg:not([class*='size-'])]:size-[1em]",
                false: '',
            },
        },
        defaultVariants: {
            tone: 'default',
            size: 'default',
            radius: 'md',
            iconOnly: false,
        },
    },
);

const buttonGroupVariants = cva(
    [
        'flex w-fit items-stretch',
        'has-[>[data-slot=button-group]]:gap-2',
        '[&>*]:focus-visible:relative',
        '[&>*]:focus-visible:z-10',
        'has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-md',
        "[&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit",
        '[&>input]:flex-1',
    ],
    {
        variants: {
            orientation: {
                horizontal: [
                    '[&>*:not(:first-child)]:rounded-s-none',
                    '[&>*:not(:first-child)]:border-l-0',
                    '[&>*:not(:last-child)]:rounded-e-none',
                ],
                vertical: [
                    'flex-col',
                    '[&>*:not(:first-child)]:rounded-t-none',
                    '[&>*:not(:first-child)]:border-t-0',
                    '[&>*:not(:last-child)]:rounded-b-none',
                ],
            },
        },
        defaultVariants: {
            orientation: 'horizontal',
        },
    },
);

type ButtonGroupProps = React.ComponentProps<'div'> &
    VariantProps<typeof buttonGroupVariants>;

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
    ({ className, orientation, ...props }, ref) => {
        return (
            <div
                ref={ref}
                role="group"
                data-slot="button-group"
                data-orientation={orientation}
                className={buttonGroupVariants({ orientation, className })}
                {...props}
            />
        );
    },
);
ButtonGroup.displayName = 'ButtonGroup';

type ButtonProps = ButtonPrimitiveProps &
    VariantProps<typeof buttonVariants> & {
        loader?: React.ReactNode;
        isLoading?: boolean;
        children?: React.ReactNode;
        tabIndex?: number;
    };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            tone,
            size,
            radius,
            iconOnly,
            loader,
            isLoading,
            children,
            tabIndex,
            ...props
        },
        ref,
    ) => {
        if (tone === 'unstyled') {
            return (
                <ButtonPrimitive ref={ref} {...props}>
                    {(values) =>
                        typeof children === 'function'
                            ? children(values)
                            : children
                    }
                </ButtonPrimitive>
            );
        }

        // Explicitly add tabIndex to props if provided, though ...props *should* ideally handle it
        // if types allowed. Since we manually added it to ButtonProps, we can pass it.
        const extendedProps = { ...props, tabIndex };

        return (
            <ButtonPrimitive
                ref={ref}
                {...extendedProps}
                isDisabled={props.isDisabled || isLoading}
                className={cn(
                    buttonVariants({ tone, size, radius, iconOnly }),
                    className,
                )}
            >
                {(values) =>
                    values.isPending || isLoading ? (
                        iconOnly ? (
                            (loader ?? <Loader className="text-inherit" />)
                        ) : (
                            <>
                                {loader ?? <Loader className="text-inherit" />}
                                {children}
                            </>
                        )
                    ) : typeof children === 'function' ? (
                        children(values)
                    ) : (
                        children
                    )
                }
            </ButtonPrimitive>
        );
    },
);
Button.displayName = 'Button';

export { Button, ButtonGroup };
export type { ButtonProps, ButtonGroupProps };
