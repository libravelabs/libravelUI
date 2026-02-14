import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const avatarVariants = cva(
    'inline-flex shrink-0 align-middle outline-1 -outline-offset-1 outline-foreground/(--ring-opacity) [--avatar-radius:20%] [--ring-opacity:20%]',
    {
        variants: {
            size: {
                xs: 'size-6',
                sm: 'size-8',
                md: 'size-10',
                lg: 'size-12',
                xl: 'size-16',
                '2xl': 'size-20',
                '3xl': 'size-24',
                '4xl': 'size-26',
                '5xl': 'size-32',
                '6xl': 'size-36',
                '7xl': 'size-40',
                '8xl': 'size-44',
                '9xl': 'size-48',
                '10xl': 'size-52',
            },
            shape: {
                circle: 'rounded-full *:rounded-full',
                square: 'rounded-(--avatar-radius) *:rounded-(--avatar-radius)',
            },
        },
        defaultVariants: {
            size: 'md',
            shape: 'circle',
        },
    },
);

interface AvatarProps
    extends React.ComponentProps<'span'>, VariantProps<typeof avatarVariants> {
    src?: string | null;
    initials?: string;
    alt?: string;
}

function Avatar({
    src = null,
    initials,
    alt = '',
    className,
    shape,
    size,
    ...props
}: AvatarProps) {
    return (
        <span
            data-slot="avatar"
            {...props}
            className={cn(avatarVariants({ size, shape }), className)}
        >
            {initials && (
                <svg
                    className="font-md size-full bg-background fill-current p-[5%] text-[48px] uppercase select-none"
                    viewBox="0 0 100 100"
                    aria-hidden={alt ? undefined : 'true'}
                >
                    {alt && <title>{alt}</title>}
                    <text
                        x="50%"
                        y="50%"
                        alignmentBaseline="middle"
                        dominantBaseline="middle"
                        textAnchor="middle"
                        dy=".125em"
                    >
                        {initials}
                    </text>
                </svg>
            )}

            {/* Use Image from next/image if you're in NextJS */}
            {src && (
                <img
                    className="size-full object-cover object-center"
                    src={src}
                    alt={alt}
                />
            )}
        </span>
    );
}

export type { AvatarProps };
export { Avatar, avatarVariants };
