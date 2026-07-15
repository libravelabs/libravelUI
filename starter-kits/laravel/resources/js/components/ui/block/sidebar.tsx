import * as React from "react";
import { PanelLeftCloseIcon, PanelLeftOpenIcon } from "lucide-react";
import { cva } from "class-variance-authority";
import { Button, ButtonProps } from "@/components/ui/core/button";
import {
  DockBody,
  DockContent,
  DockDescription,
  DockHeader,
  DockTitle,
  type DockContentProps,
} from "@/components/ui/core/dock";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/core/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Link, type InertiaLinkProps } from "@inertiajs/react";

const SIDEBAR_STORAGE_KEY = "sidebar_state";
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

type SidebarVariant = "sidebar" | "float" | "inset";
type SidebarCollapsible = "offcanvas" | "icon" | "none";
type SidebarSide = "left" | "right";
type SidebarState = "expanded" | "collapsed";

type SidebarConfig = {
  variant: SidebarVariant;
  collapsible: SidebarCollapsible;
  side: SidebarSide;
};

type SidebarContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
  isMobile: boolean;
  variant: SidebarVariant;
  collapsible: SidebarCollapsible;
  side: SidebarSide;
  setConfig: (config: SidebarConfig) => void;
};

const DEFAULT_CONFIG: SidebarConfig = {
  variant: "sidebar",
  collapsible: "offcanvas",
  side: "left",
};

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

function useSidebarContext(): SidebarContextValue {
  const context = React.useContext(SidebarContext);

  if (!context) {
    throw new Error("useSidebar must be used within SidebarProvider");
  }

  return context;
}

function useSidebar(): Omit<SidebarContextValue, "setConfig"> {
  const { setConfig: _setConfig, ...context } = useSidebarContext();
  return context;
}

type SidebarProviderProps = React.ComponentProps<"div"> & {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

function readPersistedOpen(): boolean | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const value = window.localStorage.getItem(SIDEBAR_STORAGE_KEY);

    if (value === "true") {
      return true;
    }

    if (value === "false") {
      return false;
    }
  } catch {
    return null;
  }

  return null;
}

function writePersistedOpen(open: boolean): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(SIDEBAR_STORAGE_KEY, String(open));
  } catch {
    return;
  }
}

function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange,
  className,
  style,
  children,
  ...props
}: SidebarProviderProps) {
  const isControlled = openProp !== undefined;
  const isMobile = useIsMobile();
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const [hydrated, setHydrated] = React.useState(false);
  const [config, setConfig] = React.useState<SidebarConfig>(DEFAULT_CONFIG);

  React.useEffect(() => {
    setHydrated(true);

    if (isControlled) {
      return;
    }

    const persistedOpen = readPersistedOpen();

    if (persistedOpen !== null) {
      setInternalOpen(persistedOpen);
    }
  }, [isControlled]);

  const open = isControlled ? openProp === true : internalOpen;

  const setOpen = React.useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setInternalOpen(nextOpen);
      }

      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange],
  );

  const toggle = React.useCallback(() => {
    setOpen(!open);
  }, [open, setOpen]);

  React.useEffect(() => {
    if (!hydrated) {
      return;
    }

    writePersistedOpen(open);
  }, [hydrated, open]);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key.toLowerCase() === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault();
        toggle();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggle]);

  const contextValue = React.useMemo<SidebarContextValue>(
    () => ({
      open,
      setOpen,
      toggle,
      isMobile,
      variant: config.variant,
      collapsible: config.collapsible,
      side: config.side,
      setConfig,
    }),
    [open, setOpen, toggle, isMobile, config],
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <div
        data-slot="sidebar-wrapper"
        style={
          {
            "--sidebar-width": SIDEBAR_WIDTH,
            "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
            ...style,
          } as React.CSSProperties
        }
        className={cn(
          "relative flex h-svh w-full overflow-hidden has-data-[variant=inset]:bg-sidebar",
          className,
        )}
        {...props}
      >
        <div className="flex h-full min-h-0 w-full items-stretch overflow-hidden">
          {children}
        </div>
      </div>
    </SidebarContext.Provider>
  );
}

const sidebarSpacerVariants = cva(
  "relative shrink-0 bg-transparent transition-[width] duration-200 ease-linear",
  {
    variants: {
      variant: {
        sidebar: "h-svh",
        float: "hidden",
        inset: "h-svh",
      },
      collapsible: {
        none: "w-[var(--sidebar-width)]",
        offcanvas: "",
        icon: "",
      },
      state: {
        expanded: "w-[var(--sidebar-width)]",
        collapsed: "w-0",
      },
      side: {
        left: "",
        right: "",
      },
    },
    compoundVariants: [
      {
        collapsible: "icon",
        state: "collapsed",
        variant: "sidebar",
        className: "w-[var(--sidebar-width-icon)]",
      },
      {
        collapsible: "icon",
        state: "collapsed",
        variant: "float",
        className: "w-[var(--sidebar-width-icon)]",
      },
      {
        collapsible: "icon",
        state: "collapsed",
        variant: "inset",
        className: "w-[var(--sidebar-width-icon)]",
      },
    ],
    defaultVariants: {
      variant: "sidebar",
      collapsible: "offcanvas",
      state: "expanded",
      side: "left",
    },
  },
);

const sidebarDesktopShellVariants = cva(
  "fixed inset-y-0 z-10 hidden h-svh w-[var(--sidebar-width)] transition-[left,right,width,transform] duration-200 ease-linear md:flex",
  {
    variants: {
      variant: {
        sidebar: "",
        float: "p-2",
        inset: "pt-2",
      },
      side: {
        left: "left-0",
        right: "right-0",
      },
      collapsible: {
        none: "",
        offcanvas: "",
        icon: "",
      },
      state: {
        expanded: "",
        collapsed: "",
      },
    },
    compoundVariants: [
      {
        side: "left",
        collapsible: "offcanvas",
        state: "collapsed",
        className: "left-[calc(var(--sidebar-width)*-1)]",
      },
      {
        side: "right",
        collapsible: "offcanvas",
        state: "collapsed",
        className: "right-[calc(var(--sidebar-width)*-1)]",
      },
      {
        collapsible: "icon",
        state: "collapsed",
        className: "w-[var(--sidebar-width-icon)]",
      },
      {
        variant: "float",
        collapsible: "icon",
        state: "collapsed",
        className: "w-[calc(var(--sidebar-width-icon)+1rem)]",
      },
      {
        variant: "sidebar",
        side: "left",
        className: "border-r",
      },
      {
        variant: "sidebar",
        side: "right",
        className: "border-l",
      },
    ],
    defaultVariants: {
      variant: "sidebar",
      side: "left",
      collapsible: "offcanvas",
      state: "expanded",
    },
  },
);

const sidebarPanelVariants = cva(
  "flex h-full w-full flex-col overflow-hidden text-sidebar-foreground bg-sidebar",
  {
    variants: {
      variant: {
        sidebar: "",
        float: "rounded-xl",
        inset: "rounded-xl",
      },
      state: {
        expanded: "",
        collapsed: "justify-center",
      },
    },
    defaultVariants: {
      variant: "sidebar",
      state: "expanded",
    },
  },
);

type SidebarProps = React.ComponentProps<"div"> &
  DockContentProps & {
    side?: SidebarSide;
    variant?: SidebarVariant;
    collapsible?: SidebarCollapsible;
  };

function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible: rawCollapsible = "offcanvas",
  className,
  children,
  ...props
}: SidebarProps) {
  const { open, setOpen, isMobile, setConfig } = useSidebarContext();
  const collapsible =
    variant === "float" && rawCollapsible === "offcanvas"
      ? "icon"
      : rawCollapsible;
  const state: "expanded" | "collapsed" =
    collapsible === "none" ? "expanded" : open ? "expanded" : "collapsed";

  React.useLayoutEffect(() => {
    setConfig({
      variant,
      collapsible,
      side,
    });

    return () => {
      setConfig(DEFAULT_CONFIG);
    };
  }, [variant, collapsible, side, setConfig]);

  if (isMobile) {
    return (
      <DockContent
        isOpen={open}
        onOpenChange={setOpen}
        side={side}
        isFloat={variant !== "sidebar"}
        isBlurred={variant === "float"}
        notch={variant === "float"}
        closeButton
        classNames={{
          content: cn(
            "bg-sidebar p-0 text-sidebar-foreground h-full w-[280px] rounded-none border-0",
            side === "left" && "border-r",
            side === "right" && "border-l",
          ),
          overlay: "fixed inset-0 z-50 bg-background/40 backdrop-blur-sm",
          wrapper:
            side === "left"
              ? "fixed inset-y-0 left-0 z-50 h-full w-[280px]"
              : "fixed inset-y-0 right-0 z-50 h-full w-[280px]",
        }}
        {...props}
      >
        <DockHeader className="sr-only">
          <DockTitle>Sidebar</DockTitle>
          <DockDescription>Displays the mobile sidebar.</DockDescription>
        </DockHeader>
        <DockBody className="flex h-full w-full flex-col">{children}</DockBody>
      </DockContent>
    );
  }

  return (
    <div
      data-slot="sidebar"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : undefined}
      data-variant={variant}
      data-side={side}
      className={cn(side === "right" && "md:order-2", className)}
      {...props}
    >
      <div
        className={cn(
          sidebarSpacerVariants({
            variant,
            collapsible,
            state,
            side,
          }),
        )}
      />
      <aside
        className={cn(
          sidebarDesktopShellVariants({
            variant,
            collapsible,
            state,
            side,
          }),
        )}
      >
        <div className={sidebarPanelVariants({ variant, state })}>
          {children}
        </div>
      </aside>
    </div>
  );
}

function SidebarItem({
  isActive,
  children,
  ...props
}: InertiaLinkProps & {
  isActive?: boolean;
}) {
  const { open, collapsible } = useSidebar();
  const Comp = props.href ? Link : "span";

  return (
    <Comp className="w-full" {...props}>
      <Button
        tone="ghost"
        iconOnly={open}
        className={cn(
          "justify-start w-full p-2",
          !open &&
            collapsible === "icon" &&
            "[&>*:not(:first-child)]:hidden justify-center",
          isActive && "bg-foreground/10",
        )}
      >
        {children}
      </Button>
    </Comp>
  );
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-header"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  );
}

function SidebarBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-body"
      className={cn(
        "flex min-h-0 w-full h-full flex-col gap-2 overflow-auto p-2",
        className,
      )}
      {...props}
    />
  );
}

const sidebarContentVariants = cva(
  "relative flex flex-1 min-h-0 overflow-auto max-w-full flex-1 flex-col bg-background",
  {
    variants: {
      variant: {
        sidebar: "",
        float: "",
        inset: "m-2 rounded-xl shadow-sm",
      },
      collapsible: {
        none: "",
        offcanvas: "",
        icon: "",
      },
    },
    compoundVariants: [
      {
        variant: "float",
        className: "ps-14 rounded-xl shadow-sm",
      },
      {
        variant: "float",
        collapsible: "icon",
        className: "ps-14 rounded-xl shadow-sm",
      },
      {
        variant: "float",
        collapsible: "none",
        className: "ps-14 rounded-xl shadow-sm",
      },
    ],
    defaultVariants: {
      variant: "sidebar",
    },
  },
);

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  const { variant, collapsible } = useSidebar();

  return (
    <div
      data-slot="sidebar-content"
      className={cn(
        sidebarContentVariants({ variant, collapsible }),
        className,
      )}
      {...props}
    />
  );
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-footer"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  );
}

function SidebarTrigger({
  className,
  onClick,
  children,
  ...props
}: React.ComponentProps<typeof TooltipTrigger>) {
  const { open, toggle, isMobile } = useSidebar();
  const collapsed = !open;

  return (
    <Tooltip>
      <TooltipTrigger
        data-slot="sidebar-trigger"
        data-sidebar="trigger"
        tone="ghost"
        iconOnly
        aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
        onClick={(event) => {
          onClick?.(event);
          toggle();
        }}
        {...props}
      >
        {children ?? (
          <>
            {isMobile || collapsed ? (
              <PanelLeftOpenIcon className="size-4" />
            ) : (
              <PanelLeftCloseIcon className="size-4" />
            )}
          </>
        )}
      </TooltipTrigger>
      <TooltipContent placement="end" hidden={!collapsed || isMobile}>
        {collapsed ? "Expand sidebar" : "Collapse sidebar"}
      </TooltipContent>
    </Tooltip>
  );
}

export {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarItem,
  SidebarHeader,
  SidebarBody,
  SidebarContent,
  SidebarFooter,
  useSidebar,
};
