import * as React from 'react';
import {
    ColorSwatch as ColorSwatchPrimitive,
    type ColorSwatchProps,
} from 'react-aria-components';
import { cn } from '@/lib/utils';

function ColorSwatch({ className, ...props }: ColorSwatchProps) {
    return (
        <ColorSwatchPrimitive
            data-slot="color-swatch"
            aria-label={props['aria-label'] ?? 'Color swatch'}
            className={cn(
                'size-[calc(var(--color-swatch-size)+--spacing(1))] shrink-0 rounded-lg inset-ring-1 inset-ring-foreground/20 [--color-swatch-size:--spacing(9)]',
                className,
            )}
            {...props}
        />
    );
}

export { ColorSwatch, type ColorSwatchProps };
