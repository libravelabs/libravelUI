import {
    Separator as Divider,
    type SeparatorProps,
} from 'react-aria-components';
import { cn } from '@/lib/utils';

interface CustomSeparatorProps extends SeparatorProps {
    text?: string;
    orientation?: 'horizontal' | 'vertical';
}

function Separator({
    orientation = 'horizontal',
    text,
    className,
    ...props
}: CustomSeparatorProps) {
    const isHorizontal = orientation === 'horizontal';

    if (!text) {
        return (
            <Divider
                orientation={orientation}
                {...props}
                className={cn(
                    'shrink-0 bg-border',
                    isHorizontal ? 'h-px w-full' : 'h-full w-px',
                    className,
                )}
            />
        );
    }

    return (
        <div
            role="separator"
            aria-orientation={orientation}
            className={cn(
                'flex items-center justify-center',
                isHorizontal ? 'w-full flex-row' : 'h-full flex-col',
                className,
            )}
        >
            <Divider
                orientation={orientation}
                {...props}
                className={cn(
                    'shrink-0 bg-border',
                    isHorizontal ? 'h-px flex-1' : 'w-px flex-1',
                )}
            />
            <span
                className={cn(
                    'bg-background text-sm text-muted-foreground',
                    isHorizontal ? 'px-2' : 'py-2',
                )}
            >
                {text}
            </span>
            <Divider
                orientation={orientation}
                {...props}
                className={cn(
                    'shrink-0 bg-border',
                    isHorizontal ? 'h-px flex-1' : 'w-px flex-1',
                )}
            />
        </div>
    );
}

export { Separator };
