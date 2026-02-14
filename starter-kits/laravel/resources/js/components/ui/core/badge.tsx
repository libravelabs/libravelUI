import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { Slot } from '@/lib/slot';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
    'inline-flex w-fit shrink-0 items-center justify-center gap-2 overflow-hidden rounded-md border font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none',
    {
        variants: {
            tone: {
                default:
                    'border bg-background/80 text-foreground [a&]:hover:opacity-70',
                primary:
                    'border-transparent bg-primary text-primary-foreground [a&]:hover:opacity-70',
                success:
                    'border-transparent bg-emerald-500 text-emerald-50 [a&]:hover:opacity-70',
                warning:
                    'border-transparent bg-amber-600 text-amber-50 [a&]:hover:opacity-70',
                info: 'border-transparent bg-blue-600 text-blue-50 [a&]:hover:opacity-70',
                secondary:
                    'border-transparent bg-secondary text-secondary-foreground [a&]:hover:opacity-70',
                destructive:
                    '[a&]:hover:opacity border-transparent bg-destructive text-white focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40',
                outline: 'text-foreground [a&]:hover:opacity-70',
            },

            size: {
                xs: "px-1.5 py-0.5 text-[10px] [&_svg:not([class*='size-'])]:size-3",
                sm: "px-2 py-0.5 text-xs [&_svg:not([class*='size-'])]:size-3.5",
                md: "px-2.5 py-1 text-sm [&_svg:not([class*='size-'])]:size-4",
                lg: "px-3 py-1.5 text-sm [&_svg:not([class*='size-'])]:size-[18px]",
                xl: "px-3.5 py-2 text-base [&_svg:not([class*='size-'])]:size-5",
            },

            radius: {
                none: 'rounded-none',
                sm: 'rounded-sm',
                md: 'rounded-md',
                lg: 'rounded-lg',
                full: 'rounded-full',
            },
        },

        defaultVariants: {
            tone: 'default',
            size: 'sm',
            radius: 'full',
        },
    },
);

interface BadgeProps
    extends React.ComponentProps<'span'>, VariantProps<typeof badgeVariants> {
    asChild?: boolean;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
    ({ className, tone, size, radius, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'span';

        return (
            <Comp
                ref={ref}
                data-slot="badge"
                className={cn(badgeVariants({ tone, size, radius }), className)}
                {...props}
            />
        );
    },
);
Badge.displayName = 'Badge';

export { Badge, badgeVariants };
