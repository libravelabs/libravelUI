import {
    DateRangePicker as DateRangePickerPrimitive,
    type DateRangePickerProps as DateRangePickerPrimitiveProps,
    type DateValue,
} from 'react-aria-components';
import { cn } from '@/lib/utils';
import {
    RangeCalendar,
    type RangeCalendarProps,
} from '@/components/ui/core/range-calendar';
import { DateInput } from '@/components/ui/core/date-field';
import { type FieldProps, fieldStyles } from '@/components/ui/core/field';
import {
    PopoverContent,
    PopoverTrigger,
    type PopoverContentProps,
} from '@/components/ui/core/popover';
import { CalendarIcon } from 'lucide-react';
import { InputGroup } from '@/components/ui/core/input';

interface DateRangePickerOverlayProps<T extends DateValue> extends Omit<
    PopoverContentProps,
    'children'
> {
    calendar?: RangeCalendarProps<T>;
}

interface DateRangePickerProps<T extends DateValue>
    extends DateRangePickerPrimitiveProps<T>, Omit<FieldProps, 'placeholder'> {
    pageBehavior?: 'visible' | 'single';
    popover?: DateRangePickerOverlayProps<T>;
}

function DateRangePicker<T extends DateValue>({
    className,
    children,
    popover,
    ...props
}: DateRangePickerProps<T>) {
    return (
        <DateRangePickerPrimitive
            aria-label={props['aria-label'] ?? 'date-range-picker'}
            className={cn(fieldStyles(), 'w-fit min-w-64', className)}
            {...props}
        >
            {(values) => (
                <>
                    {typeof children === 'function'
                        ? children(values)
                        : children}
                    <DateRangePickerOverlay<T> {...popover} />
                </>
            )}
        </DateRangePickerPrimitive>
    );
}

function DateRangePickerOverlay<T extends DateValue>({
    placement = 'bottom',
    calendar,
    ...props
}: DateRangePickerOverlayProps<T>) {
    return (
        <PopoverContent
            placement={placement}
            className={cn(
                'flex max-w-none min-w-auto snap-x justify-center',
                calendar?.visibleDuration?.months === 1
                    ? 'max-w-xs'
                    : 'max-w-none',
            )}
            {...props}
        >
            <RangeCalendar className="border-0 p-0" {...calendar} />
        </PopoverContent>
    );
}

function DateRangePickerTrigger() {
    return (
        <InputGroup className="*:data-fullsize-ele:ms-auto *:data-input:flex-none [&>span]:shrink-0">
            <DateInput slot="start" className="w-auto" />
            <span
                aria-hidden
                className="-mx-2 text-foreground group-disabled:text-muted-foreground"
            >
                –
            </span>
            <DateInput slot="end" className="w-auto" />
            <PopoverTrigger
                data-fullsize-ele
                tone="unstyled"
                className="group-disabled:cursor-not-allowed group-disabled:opacity-20"
            >
                <CalendarIcon className="text-muted-foreground" />
            </PopoverTrigger>
        </InputGroup>
    );
}

export type { DateRangePickerProps, DateRangePickerOverlayProps };
export { DateRangePicker, DateRangePickerTrigger };
