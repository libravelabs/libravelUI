"use client";

import { Avatar } from "@/components/ui/core/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuHeader,
} from "@/components/ui/core/dropdown-menu";

import {
  CreditCard,
  Bell,
  Settings,
  LogOut,
  User,
  Sparkles,
  ChevronsUpDown,
} from "lucide-react";

export function UserMenu({ open }: { open: boolean }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Open Menu"
        tone={open ? "ghost" : "unstyled"}
        size="lg"
        iconOnly={!open}
        className="w-full justify-start px-2"
      >
        <Avatar
          alt="Martin Scorsese"
          size="sm"
          src="https://i.ytimg.com/vi/QWFWIU-D36E/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDpdsuMduBqYtN7kAkne7irbTKLlg"
          shape="square"
          className="cursor-pointer"
        />

        {open && (
          <>
            <div className="text-start min-w-0 truncate text-xs">
              <p className="font-medium">John Doe</p>
              <p className="text-muted-foreground">Administrator</p>
            </div>
            <ChevronsUpDown className="ml-auto" />
          </>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="min-w-72"
        popover={{
          placement: "right",
        }}
      >
        <DropdownMenuHeader className="flex flex-col gap-1 px-2">
          <div className="text-sm font-medium leading-none">
            Martin Scorsese
          </div>

          <div className="text-xs text-muted-foreground">
            martin@filmstudio.com
          </div>
        </DropdownMenuHeader>

        <DropdownMenuSeparator />

        <DropdownMenuGroup title="Account">
          <DropdownMenuItem>
            <User className="mr-2 size-4" />
            Profile
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Bell className="mr-2 size-4" />
            Notifications
          </DropdownMenuItem>

          <DropdownMenuItem>
            <CreditCard className="mr-2 size-4" />
            Billing
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup title="Workspace">
          <DropdownMenuItem>
            <Sparkles className="mr-2 size-4" />
            Upgrade Plan
            <DropdownMenuShortcut keys="PRO" />
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Settings className="mr-2 size-4" />
            Settings
            <DropdownMenuShortcut keys="⌘," />
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem tone="destructive">
          <LogOut className="mr-2 size-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
