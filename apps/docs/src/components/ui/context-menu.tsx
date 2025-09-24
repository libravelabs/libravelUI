"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Menu, type MenuProps } from "react-aria-components";
import {
  PopoverContent,
  type PopoverContentProps,
} from "@/components/ui/popover";
import {
  DropdownMenuContent,
  DropdownMenuDescription,
  DropdownMenuGroup,
  DropdownMenuHeader,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "./dropdown-menu";

interface ContextMenuContextType {
  triggerRef: React.RefObject<HTMLElement | null>;
  offset: { offset: number; crossOffset: number } | null;
  setOffset: React.Dispatch<
    React.SetStateAction<{ offset: number; crossOffset: number } | null>
  >;
}

const ContextMenuContext = React.createContext<ContextMenuContextType | null>(
  null
);

function useContextMenuCtx() {
  const ctx = React.useContext(ContextMenuContext);
  if (!ctx) {
    throw new Error("ContextMenu components must be used inside <ContextMenu>");
  }
  return ctx;
}

function ContextMenu({ children }: { children: React.ReactNode }) {
  const [offset, setOffset] = React.useState<{
    offset: number;
    crossOffset: number;
  } | null>(null);

  const triggerRef = React.useRef<HTMLElement>(null);

  return (
    <ContextMenuContext.Provider value={{ triggerRef, offset, setOffset }}>
      {children}
    </ContextMenuContext.Provider>
  );
}

type ContextMenuTriggerProps = React.HTMLAttributes<HTMLElement>;

function ContextMenuTrigger({ className, ...props }: ContextMenuTriggerProps) {
  const { triggerRef, setOffset } = useContextMenuCtx();

  function onContextMenu(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    setOffset({
      offset: e.clientY - rect.bottom,
      crossOffset: e.clientX - rect.left,
    });
  }

  return (
    <div
      ref={triggerRef as any}
      className={cn("cursor-default select-none", className)}
      aria-haspopup="menu"
      onContextMenu={onContextMenu}
      {...props}
    />
  );
}

interface ContextMenuContentProps<T>
  extends MenuProps<T>,
    Pick<PopoverContentProps, "withArrow"> {
  className?: string;
  popover?: PopoverContentProps;
}

function ContextMenuContent<T extends object>({
  className,
  popover,
  withArrow,
  children,
  ...props
}: ContextMenuContentProps<T>) {
  const { triggerRef, offset, setOffset } = useContextMenuCtx();

  if (!offset) return null;

  return (
    <PopoverContent
      withArrow={withArrow}
      {...popover}
      isOpen={!!offset}
      shouldFlip={false}
      triggerRef={triggerRef}
      placement="bottom start"
      offset={offset.offset}
      crossOffset={offset.crossOffset}
      onOpenChange={() => setOffset(null)}
    >
      <Menu
        data-slot="context-menu-content"
        className={cn(
          "bg-popover text-popover-foreground z-50 min-w-64 max-h-[35rem] overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md outline-hidden",
          className
        )}
        {...props}
      >
        {children}
      </Menu>
    </PopoverContent>
  );
}

const ContextMenuItem = DropdownMenuItem;
const ContextMenuLabel = DropdownMenuLabel;
const ContextMenuSeparator = DropdownMenuSeparator;
const ContextMenuHeader = DropdownMenuHeader;
const ContextMenuGroup = DropdownMenuGroup;
const ContextMenuShortcut = DropdownMenuShortcut;
const ContextMenuSub = DropdownMenuSub;
const ContextMenuSubTrigger = DropdownMenuSubTrigger;
const ContextMenuSubContent = DropdownMenuSubContent;
const ContextMenuDescription = DropdownMenuDescription;

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuHeader,
  ContextMenuGroup,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
  ContextMenuDescription,
};
