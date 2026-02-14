import * as React from 'react';
import {
    ColorArea as ColorAreaPrimitive,
    type ColorAreaProps,
} from 'react-aria-components';
import { cn } from '@/lib/utils';
import { ColorThumb } from '@/components/ui/core/color-thumb';

function ColorArea({ className, ...props }: ColorAreaProps) {
    return (
        <ColorAreaPrimitive
            {...props}
            data-slot="color-box"
            className={cn(
                'size-56 shrink-0 rounded-md bg-muted forced-colors:bg-[GrayText]',
                className,
            )}
            style={({ defaultStyle, isDisabled }) => ({
                ...defaultStyle,
                background: isDisabled ? undefined : defaultStyle.background,
            })}
        >
            <ColorThumb />
        </ColorAreaPrimitive>
    );
}

export { ColorArea, type ColorAreaProps };
