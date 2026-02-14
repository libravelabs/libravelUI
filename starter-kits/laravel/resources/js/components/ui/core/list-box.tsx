import { Check, CircleSmall, GripVertical } from 'lucide-react';
import {
    Collection as CollectionPrimitive,
    Header as HeaderPrimitive,
    ListBox as ListBoxPrimitive,
    ListBoxItem as ListBoxItemPrimitive,
    type ListBoxItemProps as ListBoxItemPrimitiveProps,
    type ListBoxProps as ListBoxPrimitiveProps,
    ListBoxSection as ListBoxPrimitiveSection,
    composeRenderProps,
} from 'react-aria-components';

import { cn } from '@/lib/utils';

const ListBoxSection = ListBoxPrimitiveSection;

const ListBoxCollection = CollectionPrimitive;

function ListBox<T extends object>({
    className,
    ...props
}: ListBoxPrimitiveProps<T>) {
    return (
        <ListBoxPrimitive
            className={composeRenderProps(className, (className) =>
                cn(
                    className,
                    'group grid max-h-96 min-w-64 gap-1 overflow-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-none',
                    'data-[empty]:p-6 data-[empty]:text-center data-[empty]:text-sm',
                ),
            )}
            {...props}
        />
    );
}

function ListBoxItem<T extends object>({
    className,
    children,
    ...props
}: ListBoxItemPrimitiveProps<T>) {
    return (
        <ListBoxItemPrimitive
            textValue={
                props.textValue ||
                (typeof children === 'string' ? children : undefined)
            }
            className={({ isDisabled, isSelected }) =>
                cn(
                    'relative flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none',
                    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
                    'transition-all ease-linear hover:bg-accent hover:ps-3',
                    isDisabled && 'pointer-events-none opacity-50',
                    isSelected && "[&_svg:not([data-slot='indicator'])]:hidden",
                    'focus:bg-accent focus:text-accent-foreground',
                    'has-data-[slot=drag]:*:data-[slot=check]:absolute has-data-[slot=drag]:*:data-[slot=check]:right-0',
                    'has-data-[slot=drag]:*:[[slot=label]]:col-start-3',
                    'has-data-[slot=drag]:*:data-[slot=icon]:col-start-2',
                    className,
                )
            }
            {...props}
        >
            {(values) => (
                <>
                    {values.allowsDragging && (
                        <div
                            data-slot="drag"
                            className="cursor-grab data-dragging:cursor-grabbing *:data-[slot=icon]:text-muted-foreground"
                        >
                            <GripVertical size={16} />
                        </div>
                    )}

                    {values.isSelected && (
                        <>
                            {values.selectionMode === 'single' && (
                                <CircleSmall
                                    className="size-3 fill-foreground"
                                    data-slot="indicator"
                                />
                            )}
                            {values.selectionMode === 'multiple' && (
                                <Check
                                    className="size-4"
                                    data-slot="indicator"
                                />
                            )}
                        </>
                    )}

                    {typeof children === 'function'
                        ? children(values)
                        : children}
                </>
            )}
        </ListBoxItemPrimitive>
    );
}

function ListBoxHeader({
    className,
    ...props
}: React.ComponentProps<typeof HeaderPrimitive>) {
    return (
        <HeaderPrimitive
            className={cn('py-1.5 pr-2 pl-8 text-sm font-semibold', className)}
            {...props}
        />
    );
}

export {
    ListBox,
    ListBoxItem,
    ListBoxHeader,
    ListBoxSection,
    ListBoxCollection,
};
