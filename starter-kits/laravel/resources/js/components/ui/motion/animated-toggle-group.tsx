import { motion, LayoutGroup } from 'motion/react';
import React, { createContext, useContext, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface ToggleGroupContextValue {
    value?: string;
    onValueChange: (value: string) => void;
}

const ToggleGroupContext = createContext<ToggleGroupContextValue | undefined>(
    undefined,
);

const useToggleGroup = () => {
    const context = useContext(ToggleGroupContext);
    if (!context) {
        throw new Error(
            'AnimatedToggleItem must be used within AnimatedToggleGroup',
        );
    }
    return context;
};

interface AnimatedToggleGroupProps {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    children: React.ReactNode;
    className?: string;
}

function AnimatedToggleGroup({
    value: controlledValue,
    defaultValue,
    onValueChange,
    children,
    className,
}: AnimatedToggleGroupProps) {
    const [internalValue, setInternalValue] = useState(defaultValue || '');
    const isControlled = controlledValue !== undefined;
    const currentValue = isControlled ? controlledValue : internalValue;

    const handleValueChange = (newValue: string) => {
        if (!isControlled) {
            setInternalValue(newValue);
        }
        onValueChange?.(newValue);
    };

    return (
        <ToggleGroupContext.Provider
            value={{ value: currentValue, onValueChange: handleValueChange }}
        >
            <LayoutGroup id={React.useId()}>
                <div
                    role="radiogroup"
                    className={cn(
                        'inline-flex items-center gap-1 rounded-lg bg-card p-1 ring-2 ring-border',
                        className,
                    )}
                >
                    {children}
                </div>
            </LayoutGroup>
        </ToggleGroupContext.Provider>
    );
}

interface AnimatedToggleItemProps {
    value: string;
    children: React.ReactNode;
    className?: string;
}

function AnimatedToggleItem({
    value,
    children,
    className = '',
}: AnimatedToggleItemProps) {
    const { value: selectedValue, onValueChange } = useToggleGroup();
    const isActive = selectedValue === value;
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleClick = () => {
        onValueChange(value);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onValueChange(value);
        }
    };

    return (
        <button
            ref={buttonRef}
            role="radio"
            aria-checked={isActive}
            aria-label={`Toggle ${value}`}
            tabIndex={isActive ? 0 : -1}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            className={cn(
                "relative flex size-8 cursor-pointer items-center justify-center rounded-md transition-colors duration-200 [&_svg:not([class*='size-'])]:size-4",
                isActive
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground/80',
                className,
            )}
        >
            {isActive && (
                <motion.div
                    layoutId="toggle-active"
                    className="absolute inset-0 rounded-md bg-foreground/10 shadow-[0_3px_8px_rgba(0,0,0,0.40),0_1px_3px_rgba(0,0,0,0.30),inset_0_1px_0_rgba(255,255,255,0.05),inset_0_-1px_0_rgba(0,0,0,0.20)] dark:shadow-[0_3px_8px_var(--background),0_1px_3px_var(--background),inset_0_1px_0_rgba(255,255,255,0.05),inset_0_-1px_0_rgba(0,0,0,0.20)]"
                    initial={false}
                    transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 35,
                        mass: 0.8,
                    }}
                />
            )}
            <span className="relative z-10">{children}</span>
        </button>
    );
}

export type { AnimatedToggleGroupProps, AnimatedToggleItemProps };
export { AnimatedToggleGroup, AnimatedToggleItem };
