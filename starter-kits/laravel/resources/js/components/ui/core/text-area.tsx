import {
    TextArea,
    type TextAreaProps as TextAreaPrimitiveProps,
} from 'react-aria-components';
import { inputVariants, type InputProps } from '@/components/ui/core/input';
import { cn } from '@/lib/utils';

type TextareaProps = TextAreaPrimitiveProps &
    Pick<InputProps, 'tone' | 'radius'>;

function Textarea({ className, tone, radius, ...props }: TextareaProps) {
    return (
        <TextArea
            data-textarea
            className={cn(
                'resize-y',
                inputVariants({ tone, radius }),
                'max-h-96 min-h-16 overflow-y-auto text-base outline-hidden sm:text-sm/6',
                className,
            )}
            {...props}
        />
    );
}

export type { TextareaProps };
export { Textarea };
