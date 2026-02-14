import type {
    TimeFieldProps as TimeFieldPrimitiveProps,
    TimeValue,
    ValidationResult,
} from 'react-aria-components';
import {
    TimeField as TimeFieldPrimitive,
    DateInput,
    DateSegment,
} from 'react-aria-components';
import {
    Input,
    type InputProps as InputPrimitiveProps,
} from '@/components/ui/core/input';
import { cn } from '@/lib/utils';

type InputProps = Pick<
    InputPrimitiveProps,
    'startContent' | 'endContent' | 'tone' | 'size' | 'classNames'
>;

interface TimeFieldProps<T extends TimeValue>
    extends TimeFieldPrimitiveProps<T>, InputProps {
    errorMessage?: string | ((validation: ValidationResult) => string);
    label?: string;
    description?: string;
    error?: string;
}

function TimeField<T extends TimeValue>({
    errorMessage: _errorMessage,
    label: _label,
    description: _description,
    error: _error,
    ...props
}: TimeFieldProps<T>) {
    const { startContent, endContent, tone, size, classNames } = props;

    const inputProps: InputProps = {
        startContent,
        endContent,
        tone,
        size,
        classNames,
    };

    const AnyInput = Input as any;

    return (
        <TimeFieldPrimitive
            aria-label={props['aria-label'] ?? 'time-field'}
            {...props}
        >
            <AnyInput as={DateInput} {...inputProps}>
                {(segment: any) => (
                    <DateSegment
                        segment={segment}
                        className={cn(
                            'inline shrink-0 rounded px-1.5 tracking-wider text-foreground caret-transparent outline-0 forced-color-adjust-none data-placeholder:not-data-focused:text-muted-foreground sm:p-0.5 sm:py-0.5 sm:text-sm forced-colors:text-[ButtonText] type-literal:px-0',
                            'focus:bg-accent focus:text-accent-foreground focus:data-invalid:bg-destructive focus:data-invalid:text-destructive-foreground forced-colors:focus:bg-[Highlight] forced-colors:focus:text-[HighlightText]',
                            'disabled:opacity-50 forced-colors:disabled:text-[GrayText]',
                        )}
                    />
                )}
            </AnyInput>
        </TimeFieldPrimitive>
    );
}

export { TimeField };
