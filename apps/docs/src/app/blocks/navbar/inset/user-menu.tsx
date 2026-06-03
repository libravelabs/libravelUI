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
} from "lucide-react";

export function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger aria-label="Open Menu" tone="unstyled">
        <Avatar
          alt="Martin Scorsese"
          size="sm"
          src="https://i.ytimg.com/vi/QWFWIU-D36E/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDpdsuMduBqYtN7kAkne7irbTKLlg"
          className="cursor-pointer"
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="min-w-72" withArrow>
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
