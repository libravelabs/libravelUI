import * as React from 'react';
import {
    Button,
    type ButtonProps,
    NumberField as NumberFieldPrimitive,
    type NumberFieldProps as NumberFieldPrimitiveProps,
    Group,
} from 'react-aria-components';
import { Minus, Plus } from 'lucide-react';
import { composeTailwindRenderProps } from '@/lib/render-props';
import { Input } from '@/components/ui/core/input';

interface NumberFieldProps extends NumberFieldPrimitiveProps {
    indicator?: StepperButtonProps['indicator'];
}

const NumberField = ({ indicator, ...props }: NumberFieldProps) => {
    return (
        <NumberFieldPrimitive {...props}>
            <Group>
                <Input
                    classNames={{
                        wrapper: 'px-0',
                        input: 'text-center',
                    }}
                    startContent={
                        <StepperButton slot="decrement" indicator={indicator} />
                    }
                    endContent={
                        <StepperButton slot="increment" indicator={indicator} />
                    }
                />
            </Group>
        </NumberFieldPrimitive>
    );
};

interface StepperButtonProps extends ButtonProps {
    slot: 'increment' | 'decrement';
    indicator?: {
        increment?: React.ReactNode;
        decrement?: React.ReactNode;
    };
    className?: string;
}

const StepperButton = ({
    slot,
    className,
    indicator,
    ...props
}: StepperButtonProps) => {
    let icon: React.ReactNode;

    if (
        indicator &&
        typeof indicator === 'object' &&
        !React.isValidElement(indicator)
    ) {
        icon = slot === 'increment' ? indicator.increment : indicator.decrement;
    } else if (React.isValidElement(indicator)) {
        icon = indicator;
    } else {
        icon = slot === 'increment' ? <Plus /> : <Minus />;
    }

    return (
        <Button
            data-fullsize-ele
            className={composeTailwindRenderProps(
                className,
                'bg-secondary pressed:bg-secondary/70',
            )}
            slot={slot}
            {...props}
        >
            {icon}
        </Button>
    );
};

export type { NumberFieldProps };
export { NumberField };
