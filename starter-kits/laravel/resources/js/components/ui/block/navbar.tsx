import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { LayoutGroup, motion } from "motion/react";
import { cva, type VariantProps } from "class-variance-authority";
import { Menu } from "lucide-react";
import { Link } from "@inertiajs/react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button, type ButtonProps } from "@/components/ui/core/button";
import { Separator } from "@/components/ui/core/separator";
import { Dock, DockContent } from "@/components/ui/core/dock";
import { cn } from "@/lib/utils";

type Breakpoint = "md" | "lg";
type Layout = "mobile" | "desktop";
type Side = "left" | "right";
type NavbarVariant = "default" | "float" | "inset";
type NavbarPlacement = "top" | "bottom";
type NavbarSticky = boolean;

type NavbarConfig = {
  variant: NavbarVariant;
  placement: NavbarPlacement;
  isSticky: NavbarSticky;
};

interface NavbarContextProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  isMobile: boolean;
  toggleNavbar: () => void;
  breakpoint: Breakpoint;
  layout: Layout;
  config: NavbarConfig;
  setConfig: (config: NavbarConfig) => void;
}

const DEFAULT_CONFIG: NavbarConfig = {
  variant: "default",
  placement: "top",
  isSticky: false,
};

const NavbarContext = createContext<NavbarContextProps | null>(null);

const useNavbarContext = () => {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error("useNavbar must be used within a NavbarProvider.");
  }
  return context;
};

const useNavbar = () => {
  const { setConfig: _setConfig, ...context } = useNavbarContext();
  return context;
};

interface NavbarProviderProps extends React.ComponentProps<"div"> {
  defaultOpen?: boolean;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  breakpoint?: Breakpoint;
}

const NavbarProvider = ({
  isOpen: openProp,
  onOpenChange: setOpenProp,
  defaultOpen = false,
  breakpoint = "md",
  className,
  children,
  ...props
}: NavbarProviderProps) => {
  const [openInternal, setOpenInternal] = useState(defaultOpen);
  const [config, setConfig] = useState<NavbarConfig>(DEFAULT_CONFIG);

  const open = openProp ?? openInternal;

  const setOpen = useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const nextValue = typeof value === "function" ? value(open) : value;

      if (setOpenProp) {
        setOpenProp(nextValue);
        return;
      }

      setOpenInternal(nextValue);
    },
    [setOpenProp, open],
  );

  const toggleNavbar = useCallback(() => {
    setOpen((prev) => !prev);
  }, [setOpen]);

  const isMobile = useIsMobile(breakpoint === "md" ? 768 : 1024);

  const layout: Layout =
    isMobile === undefined ? "desktop" : isMobile ? "mobile" : "desktop";

  const contextValue = useMemo<NavbarContextProps>(
    () => ({
      open,
      setOpen,
      isMobile: !!isMobile,
      toggleNavbar,
      breakpoint,
      layout,
      config,
      setConfig,
    }),
    [open, setOpen, isMobile, toggleNavbar, breakpoint, layout, config],
  );

  if (isMobile === undefined) return null;

  return (
    <NavbarContext.Provider value={contextValue}>
      <div
        data-slot="navbar-wrapper"
        data-variant={config.variant}
        data-placement={config.placement}
        data-sticky={config.isSticky ? "true" : "false"}
        className={cn(
          "relative flex h-svh w-full overflow-hidden data-[variant=inset]:bg-sidebar",
          className,
        )}
        {...props}
      >
        <div className="flex h-full min-h-0 w-full flex-col items-stretch overflow-hidden data-[placement=bottom]:flex-col-reverse">
          {children}
        </div>
      </div>
    </NavbarContext.Provider>
  );
};

const navbarSurfaceStyle = cva("flex w-full items-center", {
  variants: {
    variant: {
      default: "bg-background p-4",
      float:
        "mx-auto max-w-7xl rounded-xl border bg-sidebar px-4 py-2 shadow-xs",
      inset: "bg-sidebar px-6 pt-2",
    },
    sticky: {
      true: "fixed z-20",
    },
    placement: {
      top: "inset-x-0 top-0",
      bottom: "inset-x-0 bottom-0",
    },
    breakpoint: {
      md: "md:flex",
      lg: "lg:flex",
    },
  },
  compoundVariants: [
    {
      variant: "default",
      placement: "top",
      className: "border-b",
    },
    {
      variant: "default",
      placement: "bottom",
      className: "border-t",
    },
    {
      sticky: true,
      variant: "float",
      placement: "top",
      className: "top-4",
    },
    {
      sticky: true,
      variant: "float",
      placement: "bottom",
      className: "bottom-4",
    },
    {
      sticky: true,
      variant: "inset",
      placement: "bottom",
      className: "bottom-2",
    },
  ],
  defaultVariants: {
    variant: "default",
    placement: "top",
  },
});

type NavbarSurfaceVariants = VariantProps<typeof navbarSurfaceStyle>;

type NavbarProps = React.ComponentProps<"div"> &
  Omit<NavbarSurfaceVariants, "sticky" | "breakpoint"> & {
    isSticky?: boolean;
  };

function useFloatingNavbarVisibility(placement: NavbarPlacement) {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  const showNav = useCallback(() => {
    setIsVisible(true);
  }, []);

  const hideNav = useCallback(() => {
    setIsVisible(false);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const listenerOptions: AddEventListenerOptions = {
      passive: true,
      capture: true,
    };

    const getCurrentScrollTop = (target: EventTarget | null) => {
      if (target === window || target === document) {
        return window.scrollY;
      }

      if (
        target instanceof HTMLElement &&
        target.hasAttribute("data-scrollable")
      ) {
        return target.scrollTop;
      }

      return null;
    };

    const initialTarget = document.querySelector("[data-scrollable]");
    lastScrollY.current =
      initialTarget instanceof HTMLElement
        ? initialTarget.scrollTop
        : window.scrollY;

    const handleScroll = (event: Event) => {
      const current = getCurrentScrollTop(event.target);
      if (current === null) return;

      const diff = current - lastScrollY.current;

      if (diff > 6) {
        hideNav();
      } else if (diff < -6) {
        showNav();
      }

      lastScrollY.current = current;
    };

    window.addEventListener("scroll", handleScroll, listenerOptions);

    return () => {
      window.removeEventListener("scroll", handleScroll, listenerOptions);
    };
  }, [hideNav, showNav]);

  return {
    isVisible,
    hiddenOffset: placement === "top" ? -16 : 16,
  };
}

const Navbar = ({
  isSticky: isStickyProp = false,
  placement = "top",
  variant = "default",
  className,
  ref,
  ...props
}: NavbarProps) => {
  const { breakpoint, isMobile, setConfig } = useNavbarContext();
  const isSticky =
    placement === "bottom"
      ? true
      : variant === "inset"
        ? false
        : !!isStickyProp;

  useLayoutEffect(() => {
    setConfig({
      variant,
      placement,
      isSticky,
    });

    return () => {
      setConfig(DEFAULT_CONFIG);
    };
  }, [variant, placement, isSticky, setConfig]);

  if (isMobile) return null;

  if (variant === "float") {
    const { isVisible, hiddenOffset } = useFloatingNavbarVisibility(placement);

    return (
      <motion.div
        data-navbar
        data-variant={variant}
        data-placement={placement}
        data-sticky={isSticky ? "true" : "false"}
        initial={false}
        animate={{
          y: isVisible ? 0 : hiddenOffset,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 420,
          damping: 36,
        }}
        className={cn(
          "peer/navbar fixed inset-x-0 z-20 px-4",
          placement === "top" ? "top-4" : "bottom-4",
          isVisible ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <div
          ref={ref}
          className={cn(
            navbarSurfaceStyle({
              variant,
              placement,
              sticky: isSticky,
              breakpoint,
            }),
            className,
          )}
          {...props}
        />
      </motion.div>
    );
  }

  return (
    <div
      ref={ref}
      data-navbar
      data-variant={variant}
      data-placement={placement}
      data-sticky={isSticky ? "true" : "false"}
      className={cn(
        "peer/navbar",
        navbarSurfaceStyle({
          variant,
          sticky: isSticky,
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
  side = "left",
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
          content: "entering:blur-in exiting:blur-out [&>button]:hidden pe-0",
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
}: React.ComponentProps<"div">) => {
  const id = useId();
  const { layout } = useNavbar();

  return (
    <LayoutGroup id={id}>
      <div
        data-slot="navbar-section"
        className={cn(
          "col-span-full grid grid-cols-[auto_1fr] gap-3 gap-y-0.5",
          layout === "desktop" &&
            "flex flex-none grid-cols-none flex-row items-center gap-2.5",
          className,
        )}
        {...props}
      />
    </LayoutGroup>
  );
};

const navbarItemStyle = cva(
  "group relative col-span-2 inline-flex h-9 items-center gap-2 bg-transparent px-4 py-2 text-sm font-medium ring-ring/10 outline-ring/50 transition-[color,box-shadow] hover:bg-foreground/10 focus-visible:ring-4 focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4",
);

interface NavbarItemProps extends React.ComponentProps<typeof Link> {
  isActive?: boolean;
}

const NavbarItem = ({
  className,
  isActive,
  children,
  ...props
}: NavbarItemProps) => {
  const { layout, open } = useNavbar();
  const Comp = props.href ? Link : "span";

  return (
    <Comp className="w-full" {...props}>
      <Button
        tone="ghost"
        iconOnly={open}
        className={cn("relative justify-start w-full p-2")}
      >
        {children}

        {isActive && (
          <motion.span
            data-slot="current-indicator"
            layoutId="navbar-current-indicator"
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 40,
            }}
            className={cn(
              "absolute rounded-full bg-foreground",
              layout === "mobile"
                ? "end-0 h-9 w-0.5"
                : "inset-x-0 -bottom-1 h-0.5 w-full",
            )}
          />
        )}
      </Button>
    </Comp>
  );
};

const NavbarSpacer = ({
  className,
  ref,
  ...props
}: React.ComponentProps<"div">) => {
  return <div ref={ref} className={cn("flex-1", className)} {...props} />;
};

const NavbarStart = ({
  className,
  ref,
  ...props
}: React.ComponentProps<"div">) => {
  const { layout } = useNavbar();

  return (
    <div
      ref={ref}
      className={cn(
        "relative p-2 py-4",
        layout === "desktop" && "p-0.5",
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
}: React.ComponentProps<"div">) => {
  return <div ref={ref} className={cn("mx-2", className)} {...props} />;
};

const NavbarSeparator = ({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) => {
  return (
    <Separator
      orientation="vertical"
      className={cn("h-5", className)}
      {...props}
    />
  );
};

const NavbarMobile = ({
  className,
  ref,
  ...props
}: React.ComponentProps<"div">) => {
  const { breakpoint } = useNavbar();

  return (
    <div
      ref={ref}
      data-slot="navbar-mobile"
      className={cn(
        "flex items-center gap-x-3 px-4 py-2.5",
        breakpoint === "md" ? "md:hidden" : "lg:hidden",
        className,
      )}
      {...props}
    />
  );
};

const navbarContentVariants = cva(
  "relative flex flex-1 min-h-0 max-w-full flex-col overflow-auto bg-background",
  {
    variants: {
      variant: {
        default: "",
        float: "",
        inset: "m-2 rounded-xl shadow-sm",
      },
      placement: {
        top: "",
        bottom: "",
      },
      isSticky: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "default",
        placement: "top",
        isSticky: true,
        className: "pt-16",
      },
      {
        variant: "default",
        placement: "bottom",
        isSticky: true,
        className: "pb-16",
      },
      {
        variant: "float",
        placement: "top",
        className: "pt-20",
      },
      {
        variant: "float",
        placement: "bottom",
        className: "pb-20",
      },
      {
        variant: "inset",
        isSticky: true,
        placement: "top",
        className: "mt-12",
      },
      {
        variant: "inset",
        isSticky: true,
        placement: "bottom",
        className: "mb-12",
      },
    ],
    defaultVariants: {
      variant: "default",
      placement: "top",
      isSticky: false,
    },
  },
);

function NavbarContent({ className, ...props }: React.ComponentProps<"div">) {
  const { config } = useNavbarContext();

  return (
    <div
      data-slot="navbar-content"
      className={cn(
        navbarContentVariants({
          variant: config.variant,
          placement: config.placement,
          isSticky: config.isSticky,
        }),
        className,
      )}
      {...props}
    />
  );
}

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
      aria-label={props["aria-label"] || "Toggle Navbar"}
      size="sm"
      iconOnly
      className={cn(breakpoint === "md" ? "md:hidden" : "lg:hidden", className)}
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

const NavbarLabel = ({ className, ...props }: React.ComponentProps<"span">) => {
  return (
    <span
      data-slot="navbar-label"
      className={cn("truncate", className)}
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
  NavbarContent,
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
