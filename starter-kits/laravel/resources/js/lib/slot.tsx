import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SlotProps extends React.HTMLAttributes<HTMLElement> {
    children?: React.ReactNode;
}

const Slot = React.forwardRef<HTMLElement, SlotProps>(
    ({ children, ...props }, ref) => {
        if (React.isValidElement(children)) {
            const child = children as React.ReactElement<any>;

            return React.cloneElement(child, {
                ...mergeProps(props, child.props),
                ref: ref
                    ? composeRefs(ref, (child as any).ref)
                    : (child as any).ref,
            });
        }

        return React.Children.count(children) > 1
            ? React.Children.only(null)
            : null;
    },
);

Slot.displayName = 'Slot';

export const Slottable = ({ children }: { children: React.ReactNode }) => {
    return <>{children}</>;
};

function composeRefs<T>(...refs: (React.Ref<T> | undefined)[]) {
    return (node: T) =>
        refs.forEach((ref) => {
            if (typeof ref === 'function') {
                ref(node);
            } else if (ref != null) {
                (ref as React.MutableRefObject<T | null>).current = node;
            }
        });
}

function mergeProps(
    slotProps: React.HTMLAttributes<HTMLElement>,
    childProps: React.HTMLAttributes<HTMLElement>,
) {
    // Override style
    const style = { ...slotProps.style, ...childProps.style };

    // Override className
    const className = cn(slotProps.className, childProps.className);

    return { ...slotProps, ...childProps, style, className };
}

export { Slot };
