import {
    ColorSwatchPicker as ColorSwatchPickerPrimitive,
    ColorSwatchPickerItem as ColorSwatchPickerItemPrimitive,
    type ColorSwatchPickerItemProps,
    type ColorSwatchPickerProps,
} from 'react-aria-components';
import { cn } from '@/lib/utils';
import { ColorSwatch } from '@/components/ui/core/color-swatch';

function ColorSwatchPicker({
    children,
    className,
    layout = 'grid',
    ...props
}: ColorSwatchPickerProps) {
    return (
        <ColorSwatchPickerPrimitive
            layout={layout}
            className={cn('flex flex-wrap gap-2', className)}
            {...props}
        >
            {children}
        </ColorSwatchPickerPrimitive>
    );
}

function ColorSwatchPickerItem({
    className,
    children,
    ...props
}: ColorSwatchPickerItemProps) {
    return (
        <ColorSwatchPickerItemPrimitive
            style={({ defaultStyle }) => ({
                ...defaultStyle,
                '--tw-ring-color': props.color
                    ? `color-mix(in oklab, ${props.color} 40%, transparent)`
                    : undefined,
            })}
            className={cn(
                'relative cursor-pointer overflow-hidden rounded-lg outline-hidden disabled:opacity-50',
                'selected:ring-3 selected:ring-ring/20 selected:*:inset-ring-current/40',
                className,
            )}
            {...props}
        >
            {(values) => (
                <>
                    {!children ? (
                        <>
                            <ColorSwatch
                                className={cn(
                                    values.isDisabled && 'opacity-50',
                                )}
                            />
                            {(values.isSelected ||
                                values.isFocused ||
                                values.isPressed) && (
                                <span
                                    aria-hidden
                                    className="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground"
                                />
                            )}
                        </>
                    ) : typeof children === 'function' ? (
                        children(values)
                    ) : (
                        children
                    )}
                </>
            )}
        </ColorSwatchPickerItemPrimitive>
    );
}

export { ColorSwatchPicker, ColorSwatchPickerItem };
