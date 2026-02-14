import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const headingVariants = cva(
    'tracking-light font-sans font-semibold text-foreground',
    {
        variants: {
            level: {
                1: 'text-xl/8 sm:text-2xl/8',
                2: 'text-lg/6 sm:text-xl/8',
                3: 'text-base/6 sm:text-lg/6',
                4: 'text-sm/5 sm:text-base/6',
                5: 'text-xs/5 sm:text-sm/5',
                6: 'text-[11px]/4 sm:text-xs/4',
            },
        },
        defaultVariants: {
            level: 1,
        },
    },
);

interface HeadingProps
    extends
        React.HTMLAttributes<HTMLHeadingElement>,
        VariantProps<typeof headingVariants> {}

const Heading = ({ className, level = 1, ...props }: HeadingProps) => {
    const Comp = `h${level}` as React.ElementType;

    return (
        <Comp
            className={cn(headingVariants({ level }), className)}
            {...props}
        />
    );
};

export { Heading, headingVariants };
export type { HeadingProps };
