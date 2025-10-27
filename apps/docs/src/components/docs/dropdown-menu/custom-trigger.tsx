"use client";

import { useEffect } from "react";
import { Avatar } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuHeader,
} from "@/components/ui/dropdown-menu";
import {
  LogOut,
  Sun,
  Moon,
  Laptop,
  Settings,
  LayoutDashboard,
  Command,
  LifeBuoy,
} from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "next-themes";

export default function CustomTrigger() {
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCmdOrCtrl = e.metaKey || e.ctrlKey;

      if (!isCmdOrCtrl) return;

      switch (e.key) {
        case "1":
          e.preventDefault();
          setTheme("system");
          break;
        case "2":
          e.preventDefault();
          setTheme("dark");
          break;
        case "3":
          e.preventDefault();
          setTheme("light");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setTheme]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger aria-label="Open Menu" plain>
        <Avatar
          alt="Martin Scorsese"
          size="lg"
          src="https://i.ytimg.com/vi/QWFWIU-D36E/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDpdsuMduBqYtN7kAkne7irbTKLlg"
          className="cursor-pointer"
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="min-w-64" withArrow>
        <DropdownMenuHeader className="flex flex-col gap-1 px-2 py-1.5">
          <div className="text-sm font-medium leading-none">
            Martin Scorsese
          </div>
          <div className="text-xs text-muted-foreground">@iamthegoat</div>
        </DropdownMenuHeader>

        <DropdownMenuSeparator />

        <DropdownMenuGroup title="Navigation">
          <DropdownMenuItem href="#dashboard">
            <LayoutDashboard className="mr-2 size-4" />
            Dashboard
          </DropdownMenuItem>
          <DropdownMenuItem href="#settings">
            <Settings className="mr-2 size-4" />
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup title="Tools">
          <DropdownMenuItem href="#command">
            <Command className="mr-2 size-4" />
            Command Menu
            <DropdownMenuShortcut keys="⌘K" />
          </DropdownMenuItem>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              {resolvedTheme === "light" ? (
                <Sun className="mr-2 size-4" />
              ) : resolvedTheme === "dark" ? (
                <Moon className="mr-2 size-4" />
              ) : (
                <Laptop className="mr-2 size-4" />
              )}
              Switch Theme
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem onAction={() => setTheme("system")}>
                <Laptop className="mr-2 size-4" />
                System
                <DropdownMenuShortcut keys="⌘1" />
              </DropdownMenuItem>
              <DropdownMenuItem onAction={() => setTheme("dark")}>
                <Moon className="mr-2 size-4" />
                Dark
                <DropdownMenuShortcut keys="⌘2" />
              </DropdownMenuItem>
              <DropdownMenuItem onAction={() => setTheme("light")}>
                <Sun className="mr-2 size-4" />
                Light
                <DropdownMenuShortcut keys="⌘3" />
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup title="Support">
          <DropdownMenuItem href="#support">
            <LifeBuoy className="mr-2 size-4" />
            Contact Support
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup title="Danger Zone">
          <DropdownMenuItem
            onAction={() =>
              toast.promise(promise, {
                loading: "Logging out...",
                success: () => `Logged out`,
                error: "Error",
              })
            }
            variant="destructive"
          >
            <LogOut className="mr-2 size-4" />
            Log out
            <DropdownMenuShortcut keys="⇧⌘Q" />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const promise = () =>
  new Promise((resolve) => setTimeout(() => resolve({ name: "Sonner" }), 2000));
