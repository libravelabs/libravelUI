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
                className={cn(
                    'flex min-h-svh w-full flex-col overflow-hidden',
                    breakpoint === 'md'
                        ? 'has-data-[variant=float]:md:block'
                        : 'has-data-[variant=float]:lg:block',

                    // base spacing
                    breakpoint === 'md' ? 'md:pt-0' : 'lg:pt-0',
                    breakpoint === 'md'
                        ? 'has-data-[sticky=true]:md:pt-16'
                        : 'has-data-[sticky=true]:lg:pt-16',

                    // variant: float
                    'has-data-[variant=float]:overflow-auto',
                    breakpoint === 'md'
                        ? 'has-data-[variant=float]:md:pt-4'
                        : 'has-data-[variant=float]:lg:pt-4',

                    // variant: inset
                    'has-data-[variant=inset]:bg-sidebar',

                    // placement: bottom (default)
                    'has-placement-bottom:pt-0',
                    'has-placement-bottom:pb-16',

                    // float + bottom
                    'has-data-[variant=float]:has-placement-bottom:pt-0',
                    'has-data-[variant=float]:has-placement-bottom:pb-0',

                    // inset + bottom
                    'has-data-[variant=inset]:has-placement-bottom:pt-6',
                    'has-data-[variant=inset]:has-placement-bottom:pb-12',

                    className,
                )}
                {...props}
            />
        </NavbarContext.Provider>
    );
};

const navbarSurfaceStyle = cva('flex w-full items-center', {
    variants: {
        variant: {
            default:
                'bg-background p-4 placement-top:border-b placement-bottom:border-t',
            float: 'mx-auto max-w-7xl rounded-xl border bg-sidebar px-4 py-2 shadow-xs',
            inset: 'bg-sidebar px-6 pt-2',
        },
        sticky: {
            true: 'fixed z-10',
        },
        placement: {
            top: 'inset-x-0 top-0',
            bottom: 'inset-x-0 bottom-0',
        },
        breakpoint: {
            md: 'md:flex',
            lg: 'lg:flex',
        },
    },
    compoundVariants: [
        {
            sticky: true,
            variant: 'float',
            placement: 'top',
            className: 'top-4',
        },
        {
            sticky: true,
            variant: 'float',
            placement: 'bottom',
            className: 'bottom-4',
        },
        {
            sticky: true,
            variant: 'inset',
            placement: 'bottom',
            className: 'bottom-2',
        },
    ],
    defaultVariants: {
        variant: 'default',
        placement: 'top',
    },
});

type NavbarProps = React.ComponentProps<'div'> &
    React.ComponentProps<typeof navbarSurfaceStyle> & {
        isSticky?: boolean;
    };

const Navbar = ({
    isSticky,
    placement = 'top',
    variant = 'default',
    className,
    ref,
    ...props
}: NavbarProps) => {
    const { breakpoint, isMobile } = useNavbar();

    if (isMobile) return null;

    return (
        <div
            ref={ref}
            data-navbar
            data-variant={variant}
            data-placement={placement}
            data-sticky={
                variant === 'inset' ? true : isSticky ? 'true' : 'false'
            }
            className={cn(
                'peer/navbar',
                navbarSurfaceStyle({
                    variant,
                    sticky:
                        variant === 'inset' || variant === 'default'
                            ? true
                            : isSticky,
                    placement,
                    breakpoint,
                }),
                className,
            )}
            {...props}
        />
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
                                    : 'inset-x-0 -bottom-1 h-0.5 w-full',
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

const NavbarInset = ({ className, ...props }: React.ComponentProps<'main'>) => {
    return (
        <main
            data-slot="navbar-inset"
            className={cn(
                'relative flex flex-1 flex-col overflow-auto',
                'peer-data-[variant=float]/navbar:overflow-y-hidden peer-data-[variant=inset]/navbar:m-2 peer-data-[variant=inset]/navbar:-mt-4 peer-data-[variant=inset]/navbar:rounded-xl peer-data-[variant=inset]/navbar:bg-background',
                className,
            )}
            {...props}
        />
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
