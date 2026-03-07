"use client";

import React, { useState, createContext, useContext } from "react";
import { ChevronDown, PanelRightIcon, PanelLeftIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/core/button";
import { motion, AnimatePresence } from "motion/react";
import { Link, LinkProps } from "@/components/ui/core/link";
import { useIsMobile } from "@/hooks/use-mobile";
import { DockContent } from "@/components/ui/core/dock";

type SidebarContextType = {
  isMobile: boolean;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  toggleSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextType | null>(null);

function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}

function SidebarProvider({ children, className }: React.ComponentProps<"div">) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = useState(false);

  const toggleSidebar = () => {
    setOpenMobile(!openMobile);
  };

  return (
    <SidebarContext.Provider
      value={{
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
      }}
    >
      <div className={cn("flex min-h-svh w-full", className)}>{children}</div>
    </SidebarContext.Provider>
  );
}

function Sidebar({ children, className }: React.ComponentProps<"aside">) {
  const { isMobile, openMobile, setOpenMobile } = useSidebar();

  if (isMobile) {
    return (
      <DockContent
        isOpen={openMobile}
        onOpenChange={setOpenMobile}
        side="left"
        isFloat={false}
        classNames={{
          content:
            "bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden h-full w-[280px] rounded-none border-r fixed inset-y-0 left-0 z-50",
          overlay: "fixed inset-0 z-50 bg-black/80 backdrop-blur-sm",
          wrapper: "fixed inset-y-0 left-0 z-50 h-full w-[280px]",
        }}
      >
        <div className="flex h-full flex-col bg-sidebar">{children}</div>
      </DockContent>
    );
  }

  return (
    <aside
      className={cn(
        "w-[280px] h-screen bg-sidebar border-r border-sidebar-border flex-col hidden md:flex",
        className,
      )}
    >
      {children}
    </aside>
  );
}

function SidebarTrigger({
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const context = useContext(SidebarContext);

  if (!context) return null;

  const { toggleSidebar, openMobile } = context;

  return (
    <Button
      data-sidebar="trigger"
      tone="ghost"
      iconOnly
      size="sm"
      onClick={(e) => {
        onClick?.(e);
        toggleSidebar();
      }}
      {...props}
    >
      {openMobile ? <PanelRightIcon /> : <PanelLeftIcon />}
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("shrink-0 flex flex-col gap-2 px-3 py-4", className)}
      {...props}
    />
  );
}

function SidebarBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "relative flex-1 flex flex-col gap-1 overflow-y-auto px-3",
        className,
      )}
      {...props}
    />
  );
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("shrink-0 px-3 py-4", className)} {...props} />;
}

interface SidebarSectionProps extends React.ComponentProps<"div"> {
  title?: string;
}

function SidebarSection({ title, children, className }: SidebarSectionProps) {
  return (
    <div className={cn("space-y-1", className)}>
      {title && (
        <div className="px-3 mb-2">
          <h3 className="text-sm font-medium text-sidebar-foreground/50">
            {title}
          </h3>
        </div>
      )}
      {children}
    </div>
  );
}

interface SidebarItemProps extends ButtonProps {
  icon?: React.ReactNode;
  isActive?: boolean;
  href?: string;
  button?: ButtonProps;
  link?: LinkProps;
}

function SidebarItem({
  children,
  icon,
  isActive,
  size = "sm",
  tone = "ghost",
  href,
  button,
  link,
  className,
  ...props
}: SidebarItemProps) {
  if (href) {
    return (
      <Link href={href} className="w-full" {...link}>
        <Button
          size={size}
          tone={tone}
          className={cn(
            "w-full justify-start [&_*:not(.truncate)]:truncate",
            isActive ? "bg-foreground/10" : "hover:bg-foreground/5",
            button?.className,
          )}
          {...button}
        >
          {icon && icon}
          {children}
        </Button>
      </Link>
    );
  }

  return (
    <Button
      size={size}
      tone={tone}
      className={cn(
        "w-full justify-start [&_*:not(.truncate)]:truncate",
        isActive ? "bg-foreground/10" : "hover:bg-foreground/5",
        className,
      )}
      {...props}
    >
      {icon && icon}
      {children}
    </Button>
  );
}

interface SidebarGroupProps extends ButtonProps {
  label: React.ReactNode;
  icon?: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  stickyHeader?: boolean;
  classNames?: {
    stickyHeader?: string;
    trigger?: string;
  };
}

function SidebarGroup({
  label,
  icon,
  children,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  className,
  size = "sm",
  stickyHeader = false,
  classNames,
  ...props
}: SidebarGroupProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  const handleToggle = () => {
    const next = !isOpen;
    if (!isControlled) setUncontrolledOpen(next);
    onOpenChange?.(next);
  };

  return (
    <div className={cn("grid gap-1 w-full", className)}>
      <div
        className={cn(
          stickyHeader &&
            cn("sticky top-0 bg-sidebar", classNames?.stickyHeader),
        )}
      >
        <SidebarItem
          onClick={handleToggle}
          icon={icon}
          size={size}
          className={cn(classNames?.trigger)}
          {...props}
        >
          {label && <h3 className="font-medium">{label}</h3>}
          <ChevronDown
            className={cn(
              "size-4 shrink-0 transition-transform duration-200 ms-auto",
              isOpen && "rotate-180",
            )}
          />
        </SidebarItem>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.25, ease: "easeInOut" },
              opacity: { duration: 0.15 },
            }}
            style={{ overflow: "hidden" }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SidebarSeparator({ className }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("border-t border-sidebar-border border-dashed", className)}
    />
  );
}

export {
  SidebarProvider,
  useSidebar,
  SidebarTrigger,
  Sidebar,
  SidebarHeader,
  SidebarBody,
  SidebarFooter,
  SidebarSection,
  SidebarItem,
  SidebarGroup,
  SidebarSeparator,
};

export type { SidebarSectionProps, SidebarItemProps, SidebarGroupProps };
