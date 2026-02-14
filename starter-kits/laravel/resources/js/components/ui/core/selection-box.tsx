import { createContext, use, type ReactNode } from 'react';
import type {
    GridListItemProps,
    GridListProps,
    TextProps,
} from 'react-aria-components';
import {
    composeRenderProps,
    GridList,
    GridListItem,
    Text,
} from 'react-aria-components';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/core/checkbox';

const selectionboxStyles = cva('grid', {
    variants: {
        columns: {
            1: 'col-span-full grid-cols-[auto_1fr]',
            2: 'sm:grid-cols-2',
            3: 'sm:grid-cols-3',
            4: 'sm:grid-cols-4',
            5: 'sm:grid-cols-5',
            6: 'sm:grid-cols-6',
        },
        gap: {
            0: 'gap-0',
            2: 'gap-2',
            4: 'gap-4',
            6: 'gap-6',
        },
    },
    defaultVariants: {
        columns: 1,
        gap: 0,
    },
    compoundVariants: [
        {
            gap: 0,
            columns: 1,
            className:
                'rounded-lg *:data-[slot=selectionbox-item]:-mt-px *:data-[slot=selectionbox-item]:rounded-none *:data-[slot=selectionbox-item]:inset-ring-1 *:data-[slot=selectionbox-item]:first:rounded-t-[calc(var(--radius-lg)-1px)] *:data-[slot=selectionbox-item]:last:rounded-b-[calc(var(--radius-lg)-1px)]',
        },
    ],
});

const selectionboxItemStyles = cva(
    [
        'group outline-hidden',
        'rounded-lg p-4 inset-ring inset-ring-border',
        '**:data-[slot=label]:font-medium',
        '**:data-[slot=avatar]:size-5 **:data-[slot=avatar]:shrink-0 **:data-[slot=avatar]:*:size-6',
        '**:data-[slot=icon]:mt-[--spacing(0.7)] **:data-[slot=icon]:size-5 **:data-[slot=icon]:shrink-0',
        'grid grid-cols-[1fr_auto] content-start items-start gap-x-4 gap-y-1',
        'has-data-[slot=icon]:grid-cols-[auto_1fr_auto]',
        'has-[[slot=description]]:**:data-[slot=label]:font-medium',
        'transition ease-linear',
        'cursor-pointer',
    ],
    {
        variants: {
            isFocused: {
                true: 'ring-3 ring-ring/20 inset-ring-ring/70 invalid:ring-destructive/20',
            },
            isInvalid: {
                true: 'ring-3 ring-destructive/20',
            },
            oneCol: {
                true: 'col-span-full',
            },
            highlighted: {
                true: [
                    'bg-primary/10 text-foreground',
                    'z-20 inset-ring-ring/70 hover:bg-primary/30',
                    '**:data-[slot=label]:text-foreground',
                    '**:[[slot=description]]:text-foreground',
                ],
            },
            disabled: {
                true: [
                    'z-10 opacity-50',
                    '**:data-[slot=label]:text-muted-foreground',
                    '**:[[slot=description]]:text-muted-foreground/70',
                    'forced-colors:text-[GrayText]',
                ],
            },
        },
    },
);

const SelectionboxContext = createContext<{
    columns?: number;
    gap?: number;
    disabled?: boolean;
}>({});
const useSelectionboxContext = () => use(SelectionboxContext);

interface SelectionboxProps<T extends object>
    extends GridListProps<T>, VariantProps<typeof selectionboxStyles> {
    className?: string;
    disabled?: boolean;
}

function Selectionbox<T extends object>({
    columns = 1,
    gap = 0,
    className,
    disabled = false,
    ...props
}: SelectionboxProps<T>) {
    return (
        <SelectionboxContext.Provider
            value={{
                columns: columns ?? undefined,
                gap: gap ?? undefined,
                disabled,
            }}
        >
            <GridList
                aria-label="Selection options"
                layout={columns === 1 ? 'stack' : 'grid'}
                disabledKeys={disabled ? ['*'] : undefined}
                className={cn(selectionboxStyles({ columns, gap }), className)}
                {...props}
            />
        </SelectionboxContext.Provider>
    );
}

interface SelectionboxItemProps
    extends GridListItemProps, VariantProps<typeof selectionboxItemStyles> {
    label?: string;
    description?: string;
    disabled?: boolean;
    icon?: ReactNode;
    textValue?: string;
}

function SelectionboxItem({
    className,
    label,
    description,
    children,
    icon,
    ...props
}: SelectionboxItemProps) {
    const { columns, disabled } = useSelectionboxContext();

    if (children && (label || description || icon)) {
        console.warn(
            'SelectionboxItem: Do not mix `children` with `label`, `description`, or `icon` props.',
        );
    }

    return (
        <GridListItem
            textValue={
                props.textValue ??
                (typeof children === 'string' ? children : (label ?? ''))
            }
            data-slot="selectionbox-item"
            isDisabled={disabled || props.disabled}
            {...props}
            className={composeRenderProps(
                className,
                (
                    className,
                    { isHovered, isFocusVisible, isSelected, ...renderProps },
                ) =>
                    cn(
                        selectionboxItemStyles({
                            ...renderProps,
                            oneCol: columns === 1,
                            highlighted:
                                isSelected || isHovered || isFocusVisible,
                            disabled: disabled || props.disabled,
                        }),
                        className,
                    ),
            )}
        >
            {composeRenderProps(children, (children) => {
                const isStringChild = typeof children === 'string';
                const hasCustomChildren = typeof children !== 'undefined';

                const content = hasCustomChildren ? (
                    isStringChild ? (
                        <SelectionboxLabel>{children}</SelectionboxLabel>
                    ) : (
                        children
                    )
                ) : (
                    <>
                        <div data-slot="icon">{icon && <>{icon}</>}</div>
                        <div className="flex flex-col">
                            {label && (
                                <SelectionboxLabel>{label}</SelectionboxLabel>
                            )}
                            {description && (
                                <SelectionboxDescription>
                                    {description}
                                </SelectionboxDescription>
                            )}
                        </div>
                    </>
                );

                return (
                    <>
                        {content}
                        <Checkbox
                            className="col-start-2 self-start group-has-data-[slot=icon]:col-start-3 group-hover:not-group-selected:**:data-[slot=indicator]:bg-primary/15 sm:mt-0.5"
                            slot="selection"
                        />
                    </>
                );
            })}
        </GridListItem>
    );
}

interface SelectionboxLabelProps extends TextProps {
    ref?: React.Ref<HTMLDivElement>;
}

function SelectionboxLabel({
    className,
    ref,
    ...props
}: SelectionboxLabelProps) {
    return (
        <Text
            data-slot="label"
            ref={ref}
            className={cn(
                'text-sm/6 text-foreground select-none group-disabled:opacity-50',
                'col-start-1 row-start-1',
                'group-has-data-[slot=icon]:col-start-2',
                className,
            )}
            {...props}
        />
    );
}

type SelectionboxDescriptionProps = SelectionboxLabelProps;

function SelectionboxDescription({
    className,
    ref,
    ...props
}: SelectionboxDescriptionProps) {
    return (
        <Text
            slot="description"
            ref={ref}
            className={cn(
                'col-start-1 row-start-2',
                'group-has-data-[slot=icon]:col-start-2',
                'text-sm/6 text-muted-foreground',
                'group-disabled:opacity-50',
                className,
            )}
            {...props}
        />
    );
}

export type { SelectionboxProps, SelectionboxItemProps };
export {
    Selectionbox,
    SelectionboxItem,
    SelectionboxLabel,
    SelectionboxDescription,
};
