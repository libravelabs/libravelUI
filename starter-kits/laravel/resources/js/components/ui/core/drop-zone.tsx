import type { DropZoneProps as DragAndDropPrimitiveProps } from 'react-aria-components';
import {
    composeRenderProps,
    DropZone as DropAndDropPrimitive,
} from 'react-aria-components';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const dropZoneVariants = cva(
    'group relative flex w-full flex-col items-center justify-center gap-2 rounded-xl border text-sm transition-all duration-300 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none data-drag-and-drop:cursor-pointer data-drag-and-drop:*:cursor-pointer data-[disabled]:pointer-events-none data-[disabled]:text-muted-foreground',
    {
        variants: {
            tone: {
                default:
                    'border border-solid border-border bg-transparent shadow-sm data-drag-and-drop:hover:border-primary/30 data-drag-and-drop:hover:shadow-md',
                dashed: 'border-2 border-dashed border-border bg-transparent data-drag-and-drop:hover:border-primary/50 data-drag-and-drop:hover:bg-primary/10',
                ghost: 'border-transparent data-drag-and-drop:hover:bg-accent/10',
            },
            size: {
                xs: 'min-h-[72px] max-w-xs p-2',
                sm: 'min-h-[96px] max-w-sm p-3',
                md: 'min-h-[140px] max-w-md p-5',
                lg: 'min-h-[180px] max-w-lg p-7',
                xl: 'min-h-[240px] max-w-xl p-10',
                '2xl': 'min-h-[280px] max-w-2xl p-12',
                '3xl': 'min-h-[320px] max-w-3xl p-14',
                '4xl': 'min-h-[360px] max-w-4xl p-16',
                '5xl': 'min-h-[400px] max-w-5xl p-20',
                '6xl': 'min-h-[460px] max-w-6xl p-24',
                '7xl': 'min-h-[520px] max-w-7xl p-28',
                full: 'min-h-[160px] w-full max-w-full p-6',
            },
            isDropTarget: {
                true: 'scale-105 border-dashed border-primary bg-primary/30',
                false: '',
            },
        },
        defaultVariants: {
            tone: 'dashed',
            size: 'md',
        },
    },
);

type DropZoneProps = DragAndDropPrimitiveProps &
    VariantProps<typeof dropZoneVariants>;

function DropZone({ className, tone, size, ...props }: DropZoneProps) {
    return (
        <DropAndDropPrimitive
            className={composeRenderProps(className, (className, renderProps) =>
                cn(dropZoneVariants({ tone, size, ...renderProps }), className),
            )}
            {...props}
        />
    );
}

export { DropZone, dropZoneVariants };
export type { DropZoneProps };
