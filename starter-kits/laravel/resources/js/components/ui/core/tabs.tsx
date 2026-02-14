import {
    Tabs as TabsPrimitive,
    TabList as TabListPrimitive,
    Tab as TabTriggerPrimitive,
    TabPanel as TabContentPrimitive,
} from 'react-aria-components';
import type {
    TabsProps as TabsPrimitiveProps,
    TabListProps as TabListPrimitiveProps,
    TabProps as TabTriggerPrimitiveProps,
    TabPanelProps as TabContentPrimitiveProps,
} from 'react-aria-components';
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

const tabsVariants = cva('group relative flex w-full', {
    variants: {
        tone: {
            default: 'gap-4 bg-transparent',
            ghost: 'gap-4 bg-transparent',
            outline: 'gap-4 bg-transparent',
            underline: 'gap-3 bg-transparent',
        },
        width: {
            '2xs': 'max-w-2xs',
            xs: 'max-w-xs',
            sm: 'max-w-sm',
            md: 'max-w-md',
            lg: 'max-w-lg',
            xl: 'max-w-xl',
            '2xl': 'max-w-2xl',
            '3xl': 'max-w-3xl',
            '4xl': 'max-w-4xl',
            '5xl': 'max-w-5xl',
            '6xl': 'max-w-6xl',
            '7xl': 'max-w-7xl',
            full: 'max-w-full',
        },
        size: {
            sm: 'p-0',
            default: 'p-0',
            lg: 'p-0',
        },
        radius: {
            none: '',
            sm: 'rounded-lg',
            md: 'rounded-lg',
            lg: 'rounded-lg',
            xl: 'rounded-lg',
            '2xl': 'rounded-lg',
            '3xl': 'rounded-lg',
        },
        orientation: {
            horizontal: 'flex-col',
            vertical: 'h-full flex-row',
        },
    },
    defaultVariants: {
        tone: 'default',
        size: 'default',
        width: 'xl',
        orientation: 'horizontal',
        radius: 'md',
    },
});

const tabListVariants = cva('flex w-fit shrink-0', {
    variants: {
        orientation: {
            horizontal: 'flex-row items-center',
            vertical: 'flex-col items-stretch',
        },
        size: {
            sm: 'gap-1 p-1',
            default: 'gap-1.5 p-1',
            lg: 'gap-2 p-1',
        },
        tone: {
            default:
                'border border-border/40 bg-card shadow-sm backdrop-blur-xl data-[orientation=horizontal]:w-full',
            ghost: 'bg-transparent data-[orientation=horizontal]:w-full',
            underline: 'bg-transparent data-[orientation=horizontal]:w-full',
            outline:
                'border bg-transparent data-[orientation=horizontal]:w-full',
        },
        radius: {
            none: '',
            sm: 'rounded-lg',
            md: 'rounded-lg',
            lg: 'rounded-lg',
            xl: 'rounded-lg',
            '2xl': 'rounded-lg',
            '3xl': 'rounded-lg',
        },
    },
    defaultVariants: {
        orientation: 'horizontal',
        size: 'default',
        tone: 'default',
        radius: 'md',
    },
});

const tabTriggerVariants = cva(
    "relative inline-flex cursor-pointer items-center gap-1.5 font-medium whitespace-nowrap transition-all duration-150 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-0 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4",
    {
        variants: {
            tone: {
                default:
                    'text-muted-foreground hover:text-foreground selected:text-foreground',
                ghost: 'text-muted-foreground hover:text-foreground selected:text-foreground',
                underline:
                    'text-muted-foreground/80 hover:text-foreground selected:font-semibold selected:text-primary',
                outline:
                    'text-muted-foreground hover:text-foreground selected:text-foreground',
            },
            size: {
                sm: 'h-7 px-3 py-1.5 text-xs',
                default: 'h-9 px-4 py-2 text-sm',
                lg: 'h-11 px-5 py-2.5 text-base',
            },
            radius: {
                none: 'rounded-none [--tab-radius:0px]',
                sm: 'rounded-sm [--tab-radius:var(--radius-sm)]',
                md: 'rounded-md [--tab-radius:var(--radius-md)]',
                lg: 'rounded-lg [--tab-radius:var(--radius-lg)]',
                xl: 'rounded-xl [--tab-radius:var(--radius-xl)]',
                '2xl': 'rounded-2xl [--tab-radius:var(--radius-xl)]',
                '3xl': 'rounded-3xl [--tab-radius:var(--radius-xl)]',
            },
            orientation: {
                horizontal: 'flex-1 justify-center',
                vertical: 'w-full justify-start ps-3 text-start',
            },
        },
        defaultVariants: {
            tone: 'default',
            size: 'default',
            radius: 'md',
            orientation: 'horizontal',
        },
    },
);

const tabContentVariants = cva(
    'relative h-full w-full flex-1 outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-0',
    {
        variants: {
            tone: {
                default: 'border bg-card text-foreground shadow-sm',
                ghost: 'bg-transparent text-foreground',
                underline: 'text-foreground shadow-sm',
                outline: 'border bg-transparent text-foreground shadow-sm',
            },
            size: {
                sm: 'p-4 text-sm',
                default: 'p-5 text-base',
                lg: 'p-6 text-base',
            },
            radius: {
                none: '',
                sm: 'rounded-lg',
                md: 'rounded-lg',
                lg: 'rounded-lg',
                xl: 'rounded-lg',
                '2xl': 'rounded-lg',
                '3xl': 'rounded-lg',
            },
            orientation: {
                horizontal: '',
                vertical: '',
            },
        },
        defaultVariants: {
            tone: 'default',
            size: 'default',
            radius: 'lg',
            orientation: 'horizontal',
        },
    },
);

type TabsContextValue = VariantProps<typeof tabsVariants> & { id: string };
const TabsContext = React.createContext<TabsContextValue | null>(null);

function useTabsContext() {
    const ctx = React.useContext(TabsContext);
    if (!ctx) throw new Error('Tab components must be used within <Tabs>');
    return ctx;
}

/**
 * Props for the Tabs component.
 */
type TabsProps = TabsPrimitiveProps &
    VariantProps<typeof tabsVariants> & {
        ref?: React.RefObject<HTMLDivElement>;
    };

/**
 * A tab system for organizing content into multiple views.
 * Builds on React Aria Components with custom animated triggers and panels.
 */
function Tabs({
    className,
    ref,
    tone,
    size,
    orientation = 'horizontal',
    radius,
    width,
    ...props
}: TabsProps) {
    const id = React.useId();

    return (
        <TabsContext.Provider
            value={{ id, tone, size, orientation, radius, width }}
        >
            <TabsPrimitive
                className={cn(
                    tabsVariants({ tone, size, orientation, width, radius }),
                    orientation === 'vertical'
                        ? 'items-start'
                        : 'items-stretch',
                    className,
                )}
                data-tone={tone}
                orientation={orientation}
                ref={ref}
                {...props}
            />
        </TabsContext.Provider>
    );
}

interface TabListProps<T extends object>
    extends TabListPrimitiveProps<T>, VariantProps<typeof tabListVariants> {
    ref?: React.RefObject<HTMLDivElement>;
}

function TabList<T extends object>({
    className,
    ref,
    tone,
    radius,
    size,
    orientation,
    ...props
}: TabListProps<T>) {
    const ctx = useTabsContext();
    const resolvedTone = tone ?? ctx.tone;
    const resolvedRadius = radius ?? ctx.radius;
    const resolvedSize = size ?? ctx.size;
    const resolvedOrientation = orientation ?? ctx.orientation;

    return (
        <TabListPrimitive
            aria-label={props['aria-label'] ?? 'tabs'}
            data-orientation={resolvedOrientation}
            className={cn(
                tabListVariants({
                    orientation: resolvedOrientation,
                    tone: resolvedTone,
                    radius: resolvedRadius,
                    size: resolvedSize,
                }),
                className,
            )}
            ref={ref}
            {...props}
        />
    );
}

interface TabTriggerProps
    extends TabTriggerPrimitiveProps, VariantProps<typeof tabTriggerVariants> {
    ref?: React.RefObject<HTMLDivElement>;
}

function TabTrigger({
    children,
    className,
    ref,
    tone,
    size,
    radius,
    orientation,
    ...props
}: TabTriggerProps) {
    const ctx = useTabsContext();
    const resolvedTone = tone ?? ctx.tone;
    const resolvedSize = size ?? ctx.size;
    const resolvedRadius = radius ?? ctx.radius;
    const resolvedOrientation = orientation ?? ctx.orientation;

    return (
        <TabTriggerPrimitive
            className={cn(
                tabTriggerVariants({
                    tone: resolvedTone,
                    size: resolvedSize,
                    radius: resolvedRadius,
                    orientation: resolvedOrientation,
                }),
                className,
            )}
            ref={ref}
            {...props}
        >
            {({ isSelected }) => (
                <>
                    {children}
                    {isSelected && (
                        <motion.div
                            layoutId={`tab-indicator-${ctx.id}`}
                            transition={{
                                type: 'spring',
                                stiffness: 500,
                                damping: 30,
                                mass: 0.4,
                            }}
                            className={cn(
                                'absolute rounded-[calc(var(--tab-radius)-2px)]',
                                resolvedTone === 'underline' &&
                                    resolvedOrientation === 'vertical'
                                    ? 'start-0 top-1 bottom-1 w-0.5 bg-primary'
                                    : resolvedTone === 'underline' &&
                                        resolvedOrientation === 'horizontal'
                                      ? 'right-1 bottom-0 left-1 h-0.5 bg-primary'
                                      : 'inset-0 border border-primary/20 bg-primary/10',
                            )}
                        />
                    )}
                </>
            )}
        </TabTriggerPrimitive>
    );
}

interface TabContentProps
    extends TabContentPrimitiveProps, VariantProps<typeof tabContentVariants> {
    ref?: React.RefObject<HTMLDivElement>;
}

function TabContent({
    className,
    children,
    ref,
    tone,
    size,
    radius,
    orientation,
    ...props
}: TabContentProps) {
    const ctx = useTabsContext();
    const resolvedTone = tone ?? ctx.tone;
    const resolvedSize = size ?? ctx.size;
    const resolvedRadius = radius ?? ctx.radius;
    const resolvedOrientation = orientation ?? ctx.orientation;
    const isVertical = resolvedOrientation === 'vertical';

    return (
        <TabContentPrimitive
            className={cn(
                tabContentVariants({
                    tone: resolvedTone,
                    size: resolvedSize,
                    radius: resolvedRadius,
                }),
                className,
            )}
            ref={ref}
            {...props}
        >
            {(values) => (
                <motion.div
                    initial={{
                        opacity: 0,
                        filter: 'blur(4px)',
                        ...(isVertical ? { x: -8 } : { y: -8 }),
                    }}
                    animate={{
                        filter: 'blur(0px)',
                        opacity: 1,
                        x: 0,
                        y: 0,
                    }}
                    exit={{
                        opacity: 0,
                        filter: 'blur(4px)',
                        ...(isVertical ? { x: -8 } : { y: -8 }),
                    }}
                    transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 30,
                        mass: 0.5,
                    }}
                >
                    {typeof children === 'function'
                        ? children(values)
                        : children}
                </motion.div>
            )}
        </TabContentPrimitive>
    );
}

export {
    Tabs,
    TabList,
    TabTrigger,
    TabContent,
    tabsVariants,
    tabTriggerVariants,
};
export type { TabsProps, TabListProps, TabTriggerProps, TabContentProps };
