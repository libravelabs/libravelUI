import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="skeleton"
            className={cn('animate-pulse rounded-md bg-accent', className)}
            {...props}
        />
    );
}

function SkeletonText({
    lines = 3,
    className,
    ...props
}: { lines?: number } & React.ComponentProps<'div'>) {
    return (
        <div className="grid w-full gap-2">
            {Array.from({ length: lines }).map((_, i) => (
                <div
                    key={i}
                    {...props}
                    className={cn(
                        'h-4 w-full animate-pulse rounded-md bg-accent',
                        className,
                    )}
                />
            ))}
        </div>
    );
}

export { Skeleton, SkeletonText };
