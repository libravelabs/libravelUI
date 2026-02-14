import { cn } from '@/lib/utils';

function DescriptionList({ className, ...props }: React.ComponentProps<'dl'>) {
    return (
        <dl
            className={cn(
                'grid grid-cols-1 text-base/6 sm:grid-cols-[min(50%,calc(var(--spacing)*80))_auto] sm:text-sm/6',
                className,
            )}
            {...props}
        />
    );
}

function DescriptionTerm({ className, ...props }: React.ComponentProps<'dt'>) {
    return (
        <dt
            className={cn(
                'col-start-1 border-t pt-3 text-muted-foreground first:border-none sm:py-3',
                className,
            )}
            {...props}
        />
    );
}

function DescriptionDetails({
    className,
    ...props
}: React.ComponentProps<'dd'>) {
    return (
        <dd
            className={cn(
                'pt-1 pb-3 text-foreground sm:border-t sm:py-3 sm:nth-2:border-none',
                className,
            )}
            {...props}
        />
    );
}

export { DescriptionList, DescriptionTerm, DescriptionDetails };
