import { usePage } from "@inertiajs/react";
import {
  CreditCard,
  Bell,
  Settings,
  LogOut,
  User,
  Sparkles,
  ChevronsUpDown,
} from "lucide-react";
import { Avatar } from "@/components/ui/core/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/core/dropdown-menu";
import { useSidebar } from "@/components/ui/block/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import type { SharedData } from "@/types";
import type { PopoverContentProps } from "@/components/ui/core/popover";
import { UserMenuContent } from "./user-menu-content";
import { UserInfo } from "./user-info";

export function NavUser({
  variant = "default",
  popover,
}: {
  variant?: "default" | "avatar";
  popover?: PopoverContentProps;
}) {
  const { auth } = usePage<SharedData>().props;
  const { open } = useSidebar();
  const isMobile = useIsMobile();

  const renderMenuContent = () => <UserMenuContent user={auth.user} />;

  if (variant === "avatar") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger tone="unstyled" className="w-auto p-2">
          <UserInfo user={auth.user} showName={false} />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          popover={{
            placement: "bottom start",
            withArrow: true,
            ...popover,
          }}
        >
          {renderMenuContent()}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Open Menu"
        tone={open ? "ghost" : "unstyled"}
        size="lg"
        className="w-full justify-start px-2"
      >
        <UserInfo user={auth.user} showName={open} />
        {open && <ChevronsUpDown className="ml-auto size-4" />}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="min-w-72"
        popover={{
          placement: isMobile ? "bottom" : open ? "end" : "bottom",
          withArrow: true,
          ...popover,
        }}
      >
        {renderMenuContent()}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
