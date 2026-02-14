import * as React from 'react';
import { Keyboard as ShortcutPrimitive } from 'react-aria-components';
import { cn } from '@/lib/utils';

interface ShortcutProps extends React.HTMLAttributes<HTMLElement> {
    keys?: string | string[];
    children?: React.ReactNode;
    classNames?: {
        container?: string;
        kbd?: string;
    };
}

function Shortcut({
    keys,
    children,
    classNames,
    className,
    ...props
}: ShortcutProps) {
    const normalizedKeys: string | string[] | undefined = React.useMemo(() => {
        if (!keys) return [];
        if (Array.isArray(keys)) return keys;
        return keys.includes('+')
            ? keys.split('+').map((k) => k.trim())
            : [keys];
    }, [keys]);

    return (
        <ShortcutPrimitive
            className={cn(
                'hidden items-center gap-1 font-mono text-sm text-muted-foreground group-hover:text-foreground group-focus-visible:text-foreground group-focus-visible:opacity-100 group-disabled:opacity-50 lg:inline-flex',
                classNames?.container,
                className,
            )}
            {...props}
        >
            {children ? (
                <kbd
                    className={cn(
                        'pointer-events-none inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono font-medium text-muted-foreground opacity-100 select-none',
                        classNames?.kbd,
                    )}
                >
                    {children}
                </kbd>
            ) : (
                normalizedKeys.map((key, index) => (
                    <kbd
                        key={index}
                        className={cn(
                            'pointer-events-none inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono font-medium text-muted-foreground opacity-100 select-none',
                            classNames?.kbd,
                        )}
                    >
                        {key}
                    </kbd>
                ))
            )}
        </ShortcutPrimitive>
    );
}

export type { ShortcutProps };
export { Shortcut };
