import { ChevronsUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuHeader,
} from "@/components/ui/core/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/block/sidebar";
import { Avatar } from "@/components/ui/core/avatar";

export function NavUser() {
  const { state } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            tone="ghost"
            className="w-full flex items-center gap-2"
          >
            <Avatar
              src="/assets/dummies/travis-bickle.png"
              alt="Travis Bickle"
              className="size-8"
              shape="square"
            />

            {state === "expanded" && (
              <>
                <div className="flex flex-col text-left text-sm">
                  <span className="font-medium">Travis Bickle</span>
                  <span className="text-xs text-muted-foreground">
                    travis.bickle@taxi.nyc
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto" />
              </>
            )}
          </DropdownMenuTrigger>

          <DropdownMenuContent
            popover={{
              placement: "bottom",
              withArrow: true,
            }}
          >
            <>
              <DropdownMenuHeader separator className="flex items-center gap-2">
                <div className="flex flex-col">
                  <span className="font-medium">Travis Bickle</span>
                  <span className="text-xs text-muted-foreground">
                    travis.bickle@taxi.nyc
                  </span>
                </div>
              </DropdownMenuHeader>

              <DropdownMenuGroup>
                <DropdownMenuItem onAction={() => console.log("Appearance")}>
                  Appearance
                </DropdownMenuItem>

                <DropdownMenuItem onAction={() => console.log("Dashboard")}>
                  Dashboard
                </DropdownMenuItem>

                <DropdownMenuItem onAction={() => console.log("Settings")}>
                  Settings
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuGroup>
                <DropdownMenuItem
                  onAction={() => console.log("You talkin' to me?")}
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
