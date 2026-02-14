import React, {
    createContext,
    useContext,
    useCallback,
    useId,
    useState,
    useRef,
    useEffect,
    type ComponentProps,
} from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

type NavMenuContextValue = {
    value: string | null;
    previousValue: string | null;
    setValue: (val: string | null) => void;
    direction: number;
    registerItem: (value: string, element: HTMLElement) => void;
    unregisterItem: (value: string) => void;
    getItem: (value: string) => HTMLElement | undefined;
    isMounted: boolean;
    viewportContent: React.ReactNode | null;
    setViewportContent: (content: React.ReactNode | null) => void;
    onItemEnter: (value: string) => void;
    onItemLeave: () => void;
};

const NavigationMenuContext = createContext<NavMenuContextValue | null>(null);

function useNavigationMenu() {
    const context = useContext(NavigationMenuContext);
    if (!context)
        throw new Error('useNavigationMenu must be used within NavigationMenu');
    return context;
}

const NavigationMenu = ({
    children,
    className,
    value: valueProp,
    onValueChange,
    defaultValue,
    delayDuration = 200,
    skipDelayDuration = 300,
    ...props
}: ComponentProps<'nav'> & {
    value?: string;
    onValueChange?: (value: string) => void;
    defaultValue?: string;
    delayDuration?: number;
    skipDelayDuration?: number;
}) => {
    const [valueInternal, setValueInternal] = useState<string | null>(
        defaultValue ?? null,
    );
    const [previousValue, setPreviousValue] = useState<string | null>(null);
    const [viewportContent, setViewportContent] =
        useState<React.ReactNode | null>(null);
    const itemsMap = useRef<Map<string, HTMLElement>>(new Map());
    const [isMounted, setIsMounted] = useState(false);
    const [direction, setDirection] = useState<number>(0);

    const value = valueProp !== undefined ? valueProp : valueInternal;

    const setValue = useCallback(
        (val: string | null) => {
            if (val && value && val !== value) {
                const currentEl = itemsMap.current.get(val);
                const prevEl = itemsMap.current.get(value);
                if (currentEl && prevEl) {
                    const isFollowing =
                        currentEl.compareDocumentPosition(prevEl) &
                        Node.DOCUMENT_POSITION_FOLLOWING;
                    setDirection(isFollowing ? -1 : 1);
                }
            }

            setPreviousValue(value);
            if (onValueChange && val !== null) onValueChange(val);
            if (valueProp === undefined) setValueInternal(val);
        },
        [onValueChange, value, valueProp],
    );

    const closeTimerRef = useRef<number>(0);
    const enterTimerRef = useRef<number>(0);

    const onItemEnter = useCallback(
        (val: string) => {
            window.clearTimeout(closeTimerRef.current);
            if (value) {
                setValue(val);
            } else {
                enterTimerRef.current = window.setTimeout(() => {
                    setValue(val);
                }, delayDuration);
            }
        },
        [value, setValue, delayDuration],
    );

    const onItemLeave = useCallback(() => {
        window.clearTimeout(enterTimerRef.current);
        closeTimerRef.current = window.setTimeout(() => {
            setValue(null);
        }, skipDelayDuration);
    }, [setValue, skipDelayDuration]);

    const registerItem = useCallback((val: string, el: HTMLElement) => {
        itemsMap.current.set(val, el);
    }, []);

    const unregisterItem = useCallback((val: string) => {
        itemsMap.current.delete(val);
    }, []);

    const getItem = useCallback((val: string) => {
        return itemsMap.current.get(val);
    }, []);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <NavigationMenuContext.Provider
            value={{
                value: value || null,
                previousValue,
                setValue,
                direction,
                registerItem,
                unregisterItem,
                getItem,
                isMounted,
                viewportContent,
                setViewportContent,
                onItemEnter,
                onItemLeave,
            }}
        >
            <nav
                className={cn(
                    'group/nav-menu relative z-10 flex max-w-max flex-1 items-center justify-center',
                    className,
                )}
                onMouseLeave={onItemLeave}
                {...props}
            >
                {children}
            </nav>
        </NavigationMenuContext.Provider>
    );
};

const NavigationMenuList = ({ className, ...props }: ComponentProps<'ul'>) => (
    <ul
        className={cn(
            'group/nav-list flex flex-1 list-none items-center justify-center gap-1',
            className,
        )}
        {...props}
    />
);

const NavigationMenuItem = ({
    className,
    value,
    children,
    ...props
}: ComponentProps<'li'> & { value?: string }) => {
    const { registerItem, unregisterItem } = useNavigationMenu();
    const ref = useRef<HTMLLIElement>(null);
    const id = useId();
    const itemValue = value || id;

    useEffect(() => {
        if (ref.current) {
            registerItem(itemValue, ref.current);
        }
        return () => unregisterItem(itemValue);
    }, [itemValue, registerItem, unregisterItem]);

    return (
        <NavItemContext.Provider value={{ value: itemValue }}>
            <li ref={ref} className={cn('relative', className)} {...props}>
                {children}
            </li>
        </NavItemContext.Provider>
    );
};

const NavItemContext = createContext<{ value: string } | null>(null);
const useNavItem = () => {
    const ctx = useContext(NavItemContext);
    if (!ctx) throw new Error('Missing NavItemContext');
    return ctx;
};

const NavigationMenuTrigger = ({
    className,
    children,
    ...props
}: ComponentProps<'button'>) => {
    const { value: itemValue } = useNavItem();
    const { value: activeValue, onItemEnter } = useNavigationMenu();
    const isActive = activeValue === itemValue;

    return (
        <button
            onMouseEnter={() => onItemEnter(itemValue)}
            data-state={isActive ? 'open' : 'closed'}
            data-active={isActive ? 'true' : undefined}
            className={cn(
                'group/nav-trigger inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent/50 focus:bg-accent/50 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-active:bg-accent/50',
                className,
            )}
            {...props}
        >
            {children}
            <ChevronDown
                className={cn(
                    'relative top-px ml-1 h-3 w-3 transition duration-200 group-data-[state=open]/nav-trigger:rotate-180',
                )}
                aria-hidden="true"
            />
        </button>
    );
};

const NavigationMenuContent = ({
    className,
    children,
    ...props
}: ComponentProps<typeof motion.div>) => {
    const { value: itemValue } = useNavItem();
    const {
        value: activeValue,
        setViewportContent,
        direction,
    } = useNavigationMenu();
    const isActive = activeValue === itemValue;

    useEffect(() => {
        if (isActive) {
            setViewportContent(
                <MotionContentWrapper
                    direction={direction}
                    className={className}
                    {...props}
                >
                    {children}
                </MotionContentWrapper>,
            );
        }
    }, [
        isActive,
        setViewportContent,
        children,
        className,
        direction,
        props,
        itemValue,
    ]);

    return null;
};

const slideVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 100 : -100,
        opacity: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
    },
    exit: (direction: number) => ({
        x: direction > 0 ? -100 : 100,
        opacity: 0,
    }),
};

const MotionContentWrapper = ({
    children,
    className,
    direction,
    ...props
}: ComponentProps<typeof motion.div> & { direction: number }) => {
    return (
        <motion.div
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
            }}
            className={cn('absolute top-0 left-0 w-full', className)}
            {...props}
        >
            {children}
        </motion.div>
    );
};

const NavigationMenuViewport = ({
    className,
}: ComponentProps<typeof motion.div>) => {
    const { viewportContent, value, direction } = useNavigationMenu();

    return (
        <div
            className={cn(
                'absolute top-full left-0 flex justify-center perspective-[2000px]',
                className,
            )}
        >
            <AnimatePresence>
                {value && (
                    <motion.div
                        className={cn(
                            'relative mt-1.5 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg',
                            'data-[state=closed]:animate-out data-[state=open]:animate-in',
                        )}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ViewportResizer>
                            <AnimatePresence
                                mode="popLayout"
                                custom={direction}
                            >
                                {viewportContent}
                            </AnimatePresence>
                        </ViewportResizer>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const ViewportResizer = ({ children }: { children: React.ReactNode }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState<number | 'auto'>('auto');
    const [width, setWidth] = useState<number | 'auto'>('auto');

    useEffect(() => {
        if (!ref.current) return;

        const element = ref.current;
        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                if (entry.contentBoxSize) {
                    setHeight(entry.contentRect.height);
                    setWidth(entry.contentRect.width);
                }
            }
        });

        if (element.firstElementChild) {
            observer.observe(element.firstElementChild);
        } else {
            observer.observe(element);
        }

        return () => observer.disconnect();
    }, [children]);

    return (
        <motion.div
            animate={{ width, height }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative overflow-hidden"
        >
            <div ref={ref} className="relative h-fit w-fit">
                {children}
            </div>
        </motion.div>
    );
};

const NavigationMenuIndicator = ({
    className,
    ...props
}: ComponentProps<typeof motion.div>) => {
    const { value, getItem, isMounted } = useNavigationMenu();
    const [position, setPosition] = useState<{
        left: number;
        width: number;
    } | null>(null);

    useEffect(() => {
        if (!value) {
            setPosition(null);
            return;
        }

        const activeItem = getItem(value);
        if (activeItem) {
            setPosition({
                left: activeItem.offsetLeft,
                width: activeItem.offsetWidth,
            });
        }
    }, [value, getItem, isMounted]);

    return (
        <AnimatePresence>
            {value && position && (
                <motion.div
                    initial={{ opacity: 0, scaleX: 0.5 }}
                    animate={{
                        opacity: 1,
                        scaleX: 1,
                        x: position.left,
                        width: position.width,
                    }}
                    exit={{ opacity: 0, scaleX: 0.5 }}
                    transition={{
                        type: 'spring',
                        stiffness: 350,
                        damping: 30,
                    }}
                    className={cn(
                        'absolute bottom-0 h-0.5 w-full bg-primary',
                        className,
                    )}
                    style={{ originX: 0 }}
                    {...props}
                />
            )}
        </AnimatePresence>
    );
};

export {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuContent,
    NavigationMenuTrigger,
    NavigationMenuViewport,
    NavigationMenuIndicator,
};
