import * as React from 'react';
import { createContext, useContext } from 'react';
import { Slot } from '@/lib/slot';
import { cn } from '@/lib/utils';
import {
    AnimatePresence,
    LayoutGroup,
    motion,
    type HTMLMotionProps,
} from 'motion/react';
import { Loader } from '@/components/ui/core/loader';

type StepProps = {
    title: string;
    description?: string;
    href?: string;
};

type StepperContextValue = {
    activeStep: number;
    setActiveStep: (step: number) => void;
    orientation: 'horizontal' | 'vertical';
};

type StepItemContextValue = {
    step: number;
    state: StepState;
    isDisabled: boolean;
    isLoading: boolean;
    isVertical?: boolean;
};

type StepState = 'active' | 'completed' | 'inactive' | 'loading';

const StepperContext = createContext<StepperContextValue | undefined>(
    undefined,
);
const StepItemContext = createContext<StepItemContextValue | undefined>(
    undefined,
);

const useStepper = () => {
    const context = useContext(StepperContext);
    if (!context) throw new Error('useStepper must be used within a Stepper');
    return context;
};

const useStepItem = () => {
    const context = useContext(StepItemContext);
    if (!context)
        throw new Error('useStepItem must be used within a StepperItem');
    return context;
};

interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
    defaultValue?: number;
    value?: number;
    onValueChange?: (value: number) => void;
    orientation?: 'horizontal' | 'vertical';
}

function StepperRoot({
    defaultValue = 0,
    value,
    onValueChange,
    orientation = 'horizontal',
    className,
    id,
    children,
    ...props
}: StepperProps) {
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const activeStep = value ?? internalValue;
    const reactId = React.useId();

    const setActiveStep = React.useCallback(
        (step: number) => {
            if (value === undefined) setInternalValue(step);
            onValueChange?.(step);
        },
        [value, onValueChange],
    );

    return (
        <StepperContext.Provider
            value={{
                activeStep,
                setActiveStep,
                orientation,
            }}
        >
            <LayoutGroup id={id ?? reactId}>
                <div
                    data-slot="stepper"
                    data-orientation={orientation}
                    className={cn('group/stepper w-full', className)}
                    {...props}
                >
                    {children}
                </div>
            </LayoutGroup>
        </StepperContext.Provider>
    );
}

function StepperItems({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            data-slot="stepper-body"
            className={cn(
                'inline-flex w-full group-data-[orientation=horizontal]/stepper:w-full group-data-[orientation=horizontal]/stepper:flex-row group-data-[orientation=vertical]/stepper:flex-col',
                className,
            )}
            {...props}
        />
    );
}

interface StepperItemProps extends React.HTMLAttributes<HTMLDivElement> {
    step: number;
    completed?: boolean;
    disabled?: boolean;
    loading?: boolean;
    isVertical?: boolean;
}

function StepperItem({
    step,
    completed = false,
    disabled = false,
    loading = false,
    className,
    children,
    ...props
}: StepperItemProps) {
    const { activeStep, orientation } = useStepper();
    const state: StepState =
        completed || step < activeStep
            ? 'completed'
            : activeStep === step
              ? 'active'
              : 'inactive';
    const isLoading = loading && step === activeStep;
    const isVertical = orientation === 'vertical';

    return (
        <StepItemContext.Provider
            value={{ step, state, isDisabled: disabled, isLoading, isVertical }}
        >
            <div
                data-slot="stepper-item"
                data-state={state}
                {...(isLoading ? { 'data-loading': true } : {})}
                className={cn(
                    'group/step flex',
                    isVertical
                        ? 'relative items-start not-last:flex-1'
                        : 'relative flex-1 flex-col!',
                    className,
                )}
                {...props}
            >
                {children}
            </div>
        </StepItemContext.Provider>
    );
}

interface StepperTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean;
}

function StepperTrigger({
    asChild = false,
    className,
    children,
    ...props
}: StepperTriggerProps) {
    const { setActiveStep } = useStepper();
    const { step, isDisabled, isVertical } = useStepItem();

    if (asChild) {
        const Comp = asChild ? Slot : 'span';

        return (
            <Comp
                data-slot="stepper-trigger"
                className={cn(
                    isVertical
                        ? 'items-start rounded pb-12 last:pb-0'
                        : 'flex-col gap-3 rounded',
                    className,
                )}
            >
                {children}
            </Comp>
        );
    }

    return (
        <button
            data-slot="stepper-trigger"
            onClick={() => setActiveStep(step)}
            disabled={isDisabled}
            className={cn(
                'inline-flex items-center gap-3 rounded-full outline-none focus-visible:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50',
                isVertical
                    ? 'items-start rounded pb-12 last:pb-0'
                    : 'flex-col gap-3 rounded',
                className,
            )}
            {...props}
        >
            {children}
        </button>
    );
}

interface StepperIndicatorProps extends Omit<
    HTMLMotionProps<'span'>,
    'onDrag'
> {
    asChild?: boolean;
}

function StepperIndicator({
    asChild = false,
    className,
    children,
    ...props
}: StepperIndicatorProps) {
    const { state, step, isLoading } = useStepItem();

    const indicatorVariants = {
        inactive: {
            scale: 1,
            backgroundColor: 'transparent',
            borderColor: 'var(--foreground)',
            color: 'var(--foreground)',
        },
        active: {
            scale: 1.08,
            backgroundColor: 'var(--primary)',
            borderColor: 'transparent',
            color: 'var(--primary-foreground)',
        },
        completed: {
            scale: 1,
            backgroundColor: 'var(--primary)',
            borderColor: 'transparent',
            color: 'var(--primary-foreground)',
        },
        loading: {
            scale: 1.08,
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            color: 'var(--foreground)',
        },
    };

    return (
        <motion.span
            data-slot="stepper-indicator"
            data-state={state}
            layout
            initial={false}
            animate={state}
            variants={indicatorVariants}
            transition={{
                type: 'spring',
                stiffness: 260,
                damping: 22,
                duration: 0.25,
            }}
            className={cn(
                'relative flex size-6 shrink-0 items-center justify-center rounded-full border bg-muted text-xs font-medium text-muted-foreground',
                'data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=completed]:bg-primary data-[state=completed]:text-primary-foreground',
                className,
            )}
            {...(props as Omit<HTMLMotionProps<'span'>, 'onDrag'>)}
        >
            {asChild ? (
                children
            ) : (
                <>
                    <AnimatePresence mode="wait">
                        {state === 'completed' ? (
                            <motion.svg
                                key="check"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                className="size-4"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                            >
                                <motion.path
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{
                                        delay: 0.06,
                                        duration: 0.32,
                                        ease: 'easeOut',
                                    }}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                />
                            </motion.svg>
                        ) : state === 'active' ? (
                            <motion.div
                                key="dot"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                className="h-2.5 w-2.5 rounded-full bg-current"
                            />
                        ) : (
                            <motion.span
                                key={`num-${step}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-xs"
                            >
                                {step + 1}
                            </motion.span>
                        )}
                    </AnimatePresence>

                    {isLoading && <Loader />}
                </>
            )}
        </motion.span>
    );
}

interface StepperContentProps extends Omit<HTMLMotionProps<'div'>, 'onDrag'> {
    step: number;
}

function StepperContent({
    step,
    className,
    children,
    ...props
}: StepperContentProps) {
    return (
        <motion.div
            key={step}
            layoutId={`content-${step}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            data-slot="stepper-content"
            className={cn('relative', className)}
            {...(props as Omit<HTMLMotionProps<'div'>, 'onDrag'>)}
        >
            {children}
        </motion.div>
    );
}

function StepperTitle({
    className,
    ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
    const { step } = useStepItem();

    return (
        <motion.h3
            layoutId={`title-${step}`}
            data-slot="stepper-title"
            className={cn('text-sm font-medium', className)}
            {...(props as Omit<HTMLMotionProps<'h3'>, 'onDrag'>)}
        />
    );
}

function StepperDescription({
    className,
    ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
    const { step, isVertical } = useStepItem();

    return (
        <motion.p
            layoutId={`description-${step}`}
            data-slot="stepper-description"
            className={cn(
                'text-sm text-muted-foreground',
                !isVertical && 'max-sm:hidden',
                className,
            )}
            {...(props as Omit<HTMLMotionProps<'p'>, 'onDrag'>)}
        />
    );
}

function StepperSeparator({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    const { isVertical } = useStepItem();

    return (
        <div
            data-slot="stepper-separator"
            className={cn(
                'absolute -order-1 m-0 bg-muted',
                isVertical
                    ? 'inset-y-0 top-[calc(1.5rem+0.125rem)] h-[calc(100%-1.5rem-0.25rem)] w-0.5 -translate-x-1/2 ltr:left-3 rtl:right-3'
                    : 'inset-x-0 top-3 h-0.5 w-[calc(100%-1.5rem-0.25rem)] flex-1 -translate-y-1/2 ltr:left-[calc(50%+0.75rem+0.125rem)] rtl:right-[calc(50%+0.75rem+0.125rem)]',
                className,
            )}
            {...props}
        >
            <div
                className={cn(
                    'absolute inset-0 bg-primary transition-transform duration-800 ease-in-out',
                    isVertical
                        ? 'origin-top scale-y-0 group-data-[state=completed]/step:scale-y-100'
                        : 'scale-x-0 group-data-[state=completed]/step:scale-x-100 ltr:origin-left rtl:origin-right',
                )}
            />
        </div>
    );
}

interface StepperComponentProps extends StepperProps {
    steps: StepProps[];
    activeStep: number;
    onStepChange?: (step: number) => void;
    orientation?: 'horizontal' | 'vertical';
}

function Stepper({
    steps,
    activeStep,
    onStepChange,
    orientation = 'horizontal',
    ...props
}: StepperComponentProps) {
    return (
        <StepperRoot
            value={activeStep}
            onValueChange={onStepChange}
            orientation={orientation}
            {...props}
        >
            <StepperItems>
                {steps.map(({ title, description }, idx) => {
                    const step = idx;
                    const isVertical = orientation === 'vertical';

                    return (
                        <StepperItem key={step} step={step}>
                            <StepperTrigger>
                                <StepperIndicator />
                                <div
                                    className={
                                        isVertical
                                            ? 'space-y-0.5 px-2 text-start'
                                            : 'space-y-0.5 px-2'
                                    }
                                >
                                    {title && (
                                        <StepperTitle>{title}</StepperTitle>
                                    )}
                                    <StepperDescription>
                                        {description}
                                    </StepperDescription>
                                </div>
                            </StepperTrigger>

                            {step < steps.length - 1 && <StepperSeparator />}
                        </StepperItem>
                    );
                })}
            </StepperItems>
        </StepperRoot>
    );
}

export type { StepProps, StepperProps };

export {
    Stepper,
    StepperRoot,
    StepperItems,
    StepperContent,
    StepperDescription,
    StepperIndicator,
    StepperItem,
    StepperSeparator,
    StepperTitle,
    StepperTrigger,
};
