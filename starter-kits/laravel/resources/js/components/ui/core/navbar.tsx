import React, {
    createContext,
    useContext,
    useCallback,
    useId,
    useMemo,
    useState,
} from 'react';
import { LayoutGroup, motion } from 'motion/react';
import { Link } from '@/components/ui/core/link';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button, type ButtonProps } from '@/components/ui/core/button';
import { Separator } from '@/components/ui/core/separator';
import { Dock, DockContent } from '@/components/ui/core/dock';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import { cva } from 'class-variance-authority';

type Breakpoint = 'md' | 'lg';
type Layout = 'mobile' | 'desktop';
type Variant = 'default' | 'float' | 'inset';
type Placement = 'top' | 'bottom';
type Side = 'left' | 'right';

interface NavbarContextProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    isMobile: boolean;
    toggleNavbar: () => void;
    breakpoint: Breakpoint;
    layout: Layout;
}

const NavbarContext = createContext<NavbarContextProps | null>(null);

const useNavbar = () => {
    const context = useContext(NavbarContext);
    if (!context) {
        throw new Error('useNavbar must be used within a NavbarProvider.');
    }
    return context;
};

interface NavbarProviderProps extends React.ComponentProps<'div'> {
    defaultOpen?: boolean;
    isOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    breakpoint?: Breakpoint;
}

const NavbarProvider = ({
    isOpen: openProp,
    onOpenChange: setOpenProp,
    defaultOpen = false,
    breakpoint = 'md',
    className,
    ...props
}: NavbarProviderProps) => {
    const [openInternal, setOpenInternal] = useState(defaultOpen);
    const open = openProp ?? openInternal;

    const setOpen = useCallback(
        (value: boolean | ((value: boolean) => boolean)) => {
            if (setOpenProp) {
                setOpenProp(typeof value === 'function' ? value(open) : value);
                return;
            }
            setOpenInternal(typeof value === 'function' ? value(open) : value);
        },
        [setOpenProp, open],
    );

    const toggleNavbar = useCallback(() => {
        setOpen((prev) => !prev);
    }, [setOpen]);

    const isMobile = useIsMobile(breakpoint === 'md' ? 768 : 1024);

    const layout: Layout =
        isMobile === undefined ? 'desktop' : isMobile ? 'mobile' : 'desktop';

    const contextValue = useMemo<NavbarContextProps>(
        () => ({
            open,
            setOpen,
            isMobile: !!isMobile,
            toggleNavbar,
            breakpoint,
            layout,
        }),
        [open, setOpen, isMobile, toggleNavbar, breakpoint, layout],
    );

    if (isMobile === undefined) return null;

    return (
        <NavbarContext.Provider value={contextValue}>
            <div
                data-breakpoint={breakpoint}
                className={cn(
                    'relative flex min-h-svh w-full flex-col',
                    className,
                )}
                {...props}
            />
        </NavbarContext.Provider>
    );
};

const navbarStyle = cva('group relative isolate w-full', {
    variants: {
        variant: {
            default: '',
            float: 'mx-auto w-full max-w-7xl px-4 xl:max-w-(--breakpoint-xl)',
            inset: 'bg-sidebar',
        },
        isSticky: {
            true: 'sticky z-40',
        },
        placement: {
            top: 'top-0',
            bottom: 'bottom-0',
        },
    },
    compoundVariants: [
        {
            variant: 'float',
            placement: 'top',
            className: 'md:pt-4',
        },
        {
            variant: 'float',
            placement: 'bottom',
            className: 'md:pb-4',
        },
        {
            variant: 'inset',
            placement: 'bottom',
            className: 'pb-2',
        },
    ],
    defaultVariants: {
        variant: 'default',
        placement: 'top',
    },
});

const navbarContentStyle = cva(
    'relative isolate hidden py-(--navbar-gutter) [--navbar-gutter:--spacing(2.5)]',
    {
        variants: {
            variant: {
                default: 'border-b px-4',
                float: 'px-0',
                inset: 'px-6',
            },
            breakpoint: {
                md: 'md:block',
                lg: 'lg:block',
            },
        },
        defaultVariants: {
            breakpoint: 'md',
        },
    },
);

type NavbarProps = React.ComponentProps<'div'> & {
    isSticky?: boolean;
    placement?: Placement;
    variant?: Variant;
};

const Navbar = ({
    children,
    isSticky,
    placement = 'top',
    variant = 'default',
    className,
    ref,
    ...props
}: NavbarProps) => {
    const { breakpoint, isMobile } = useNavbar();

    return (
        <div
            ref={ref}
            data-navbar
            data-variant={variant}
            data-placement={placement}
            data-sticky={isSticky ? 'true' : undefined}
            className={cn(
                'peer/navbar relative isolate',
                navbarStyle({ variant, isSticky, placement }),
                isMobile && 'hidden',
                className,
            )}
            {...props}
        >
            <div className={navbarContentStyle({ variant, breakpoint })}>
                <div
                    data-navbar-content
                    className={cn(
                        'mx-auto w-full max-w-(--breakpoint-2xl) items-center',
                        breakpoint === 'md' ? 'md:flex' : 'lg:flex',
                        variant === 'float' &&
                            'rounded-xl border bg-sidebar px-4 py-(--navbar-gutter) shadow-xs',
                        variant === 'inset' && 'rounded-xl bg-transparent',
                    )}
                >
                    {children}
                </div>
            </div>
        </div>
    );
};

const NavbarDrawer = ({
    children,
    side = 'left',
    ...props
}: React.ComponentProps<typeof Dock> & { side?: Side }) => {
    const { open, setOpen, isMobile } = useNavbar();
    if (!isMobile) return null;

    return (
        <Dock isOpen={open} onOpenChange={setOpen} {...props}>
            <DockContent
                side={side}
                aria-label="Mobile Navigation"
                classNames={{
                    content:
                        'entering:blur-in exiting:blur-out [&>button]:hidden pe-0',
                }}
            >
                {children}
            </DockContent>
        </Dock>
    );
};

const NavbarSection = ({
    className,
    ...props
}: React.ComponentProps<'div'>) => {
    const id = useId();
    const { layout } = useNavbar();

    return (
        <LayoutGroup id={id}>
            <div
                data-slot="navbar-section"
                className={cn(
                    'col-span-full grid grid-cols-[auto_1fr] gap-3 gap-y-0.5',
                    layout === 'desktop' &&
                        'flex flex-none grid-cols-none flex-row items-center gap-2.5',
                    className,
                )}
                {...props}
            />
        </LayoutGroup>
    );
};

const navbarItemStyle = cva(
    'group relative col-span-2 inline-flex h-9 items-center gap-2 bg-transparent px-4 py-2 text-sm font-medium ring-ring/10 outline-ring/50 transition-[color,box-shadow] hover:bg-foreground/10 focus-visible:ring-4 focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg:not([class*="size-"])]:size-4',
);

interface NavbarItemProps extends React.ComponentProps<typeof Link> {
    isCurrent?: boolean;
    target?: React.HTMLAttributeAnchorTarget;
}

const NavbarItem = ({
    className,
    isCurrent,
    children,
    ...props
}: NavbarItemProps) => {
    const { layout } = useNavbar();

    return (
        <Link
            data-slot="navbar-item"
            className={cn(
                navbarItemStyle(),
                layout === 'mobile'
                    ? 'w-full rounded-s-md'
                    : 'w-fit rounded-md',
                isCurrent &&
                    layout === 'mobile' &&
                    'bg-foreground/10 hover:bg-foreground/8',
                className,
            )}
            {...props}
        >
            {(values) => (
                <>
                    {typeof children === 'function'
                        ? children(values)
                        : children}
                    {isCurrent && (
                        <motion.span
                            data-slot="current-indicator"
                            layoutId="navbar-current-indicator"
                            transition={{
                                type: 'spring',
                                stiffness: 500,
                                damping: 40,
                            }}
                            className={cn(
                                'absolute rounded-full bg-foreground',
                                layout === 'mobile'
                                    ? 'end-0 h-9 w-0.5'
                                    : 'inset-x-0 -bottom-[calc(var(--navbar-gutter)+1px)] h-0.5 w-full',
                            )}
                        />
                    )}
                </>
            )}
        </Link>
    );
};

const NavbarSpacer = ({
    className,
    ref,
    ...props
}: React.ComponentProps<'div'>) => {
    return <div ref={ref} className={cn('flex-1', className)} {...props} />;
};

const NavbarStart = ({
    className,
    ref,
    ...props
}: React.ComponentProps<'div'>) => {
    const { layout } = useNavbar();

    return (
        <div
            ref={ref}
            className={cn(
                'relative p-2 py-4',
                layout === 'desktop' && 'p-0.5',
                className,
            )}
            {...props}
        />
    );
};

const NavbarGap = ({
    className,
    ref,
    ...props
}: React.ComponentProps<'div'>) => {
    return <div ref={ref} className={cn('mx-2', className)} {...props} />;
};

const NavbarSeparator = ({
    className,
    ...props
}: React.ComponentProps<typeof Separator>) => {
    return (
        <Separator
            orientation="vertical"
            className={cn('h-5', className)}
            {...props}
        />
    );
};

const NavbarMobile = ({
    className,
    ref,
    ...props
}: React.ComponentProps<'div'>) => {
    const { breakpoint } = useNavbar();

    return (
        <div
            ref={ref}
            data-slot="navbar-mobile"
            className={cn(
                'flex items-center gap-x-3 px-4 py-2.5',
                breakpoint === 'md' ? 'md:hidden' : 'lg:hidden',
                className,
            )}
            {...props}
        />
    );
};

const NavbarInset = ({
    className,
    ref,
    children,
    ...props
}: React.ComponentProps<'div'>) => {
    return (
        <div
            ref={ref}
            data-navbar-inset
            className={cn(
                'flex flex-1 flex-col peer-data-[variant=inset]/navbar:bg-sidebar peer-data-[variant=inset]/navbar:p-2 peer-data-[variant=inset]/navbar:pt-0',
                className,
            )}
            {...props}
        >
            <div className="rounded-xl bg-background">{children}</div>
        </div>
    );
};

interface NavbarTriggerProps extends ButtonProps {
    ref?: React.RefObject<HTMLButtonElement>;
}

const NavbarTrigger = ({
    className,
    onPress,
    ref,
    ...props
}: NavbarTriggerProps) => {
    const { toggleNavbar, breakpoint } = useNavbar();

    return (
        <Button
            ref={ref}
            data-slot="navbar-trigger"
            tone="ghost"
            aria-label={props['aria-label'] || 'Toggle Navbar'}
            size="sm"
            iconOnly
            className={cn(
                breakpoint === 'md' ? 'md:hidden' : 'lg:hidden',
                className,
            )}
            onPress={(event) => {
                onPress?.(event);
                toggleNavbar();
            }}
            {...props}
        >
            <Menu />
            <span className="sr-only">Toggle Navbar</span>
        </Button>
    );
};

const NavbarLabel = ({ className, ...props }: React.ComponentProps<'span'>) => {
    return (
        <span
            data-slot="navbar-label"
            className={cn('truncate', className)}
            {...props}
        />
    );
};

export {
    useNavbar,
    NavbarProvider,
    Navbar,
    NavbarMobile,
    NavbarDrawer,
    NavbarInset,
    NavbarTrigger,
    NavbarItem,
    NavbarSection,
    NavbarSpacer,
    NavbarLabel,
    NavbarSeparator,
    NavbarStart,
    NavbarGap,
    navbarItemStyle,
};

export type {
    NavbarProviderProps,
    NavbarProps,
    NavbarTriggerProps,
    NavbarItemProps,
};
