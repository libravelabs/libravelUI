import type { ToggleButtonProps } from 'react-aria-components';
import { composeRenderProps, ToggleButton } from 'react-aria-components';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import * as React from 'react';

const toggleStyles = cva(
    'inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
    {
        variants: {
            tone: {
                default: 'hover:bg-accent hover:text-accent-foreground',
                outline:
                    'border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground',
                secondary:
                    'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
                link: 'text-primary underline-offset-4 hover:underline',
                destructive: 'shadow-sm hover:bg-destructive/40',
            },
            size: {
                xs: 'h-6 gap-0.5 px-2',
                sm: 'h-8 gap-1.5 px-3',
                default: 'h-9 px-4',
                lg: 'h-10 px-6',
                xl: 'h-12 px-7',
                '2xl': 'h-14 px-8',
            },
            radius: {
                none: 'rounded-none',
                sm: 'rounded-sm',
                md: 'rounded-md',
                lg: 'rounded-lg',
                full: 'rounded-full',
            },
            iconOnly: {
                true: "aspect-square p-0 [&_svg:not([class*='size-'])]:size-[1em]",
                false: '',
            },
            isSelected: {
                true: '',
                false: '',
            },
        },
        compoundVariants: [
            {
                tone: 'default',
                isSelected: true,
                class: 'bg-accent text-accent-foreground',
            },
            {
                tone: 'outline',
                isSelected: true,
                class: 'bg-accent text-accent-foreground',
            },
            { tone: 'secondary', isSelected: true, class: 'bg-secondary/80' },
            {
                tone: 'destructive',
                isSelected: true,
                class: 'bg-destructive/40',
            },
        ],
        defaultVariants: {
            tone: 'default',
            size: 'default',
            radius: 'md',
            iconOnly: false,
        },
    },
);

type ToggleProps = ToggleButtonProps &
    VariantProps<typeof toggleStyles> & {
        ref?: React.Ref<HTMLButtonElement>;
    };

function Toggle({
    className,
    size,
    tone,
    radius,
    iconOnly,
    ref,
    ...props
}: ToggleProps) {
    return (
        <ToggleButton
            {...props}
            ref={ref}
            className={composeRenderProps(className, (className, renderProps) =>
                cn(
                    toggleStyles({
                        ...renderProps,
                        size,
                        tone,
                        radius,
                        iconOnly,
                        className,
                    }),
                ),
            )}
        />
    );
}

export { Toggle };
export type { ToggleProps };
