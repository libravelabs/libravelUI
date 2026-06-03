import {
  Navbar,
  NavbarItem,
  NavbarSection,
  NavbarSpacer,
  NavbarTrigger,
  NavbarMobile,
  NavbarDrawer,
  NavbarStart,
  NavbarGap,
  NavbarInset,
} from "@/components/ui/block/navbar";
import { Command } from "lucide-react";
import { UserMenu } from "./user-menu";

export function AppNavbar() {
  return (
    <>
      <NavbarMobile className="order-last">
        <NavbarStart className="flex items-center gap-2 px-2">
          <Command className="size-5" />
          <span className="font-semibold text-sm">Acme</span>
        </NavbarStart>
        <NavbarSpacer />
        <NavbarTrigger />
      </NavbarMobile>

      <NavbarDrawer>
        <NavbarSection>
          <NavbarItem href="#">Overview</NavbarItem>
          <NavbarItem href="#">Customers</NavbarItem>
          <NavbarItem href="#">Products</NavbarItem>
          <NavbarItem href="#">Settings</NavbarItem>
        </NavbarSection>
      </NavbarDrawer>

      <Navbar placement="bottom" variant="inset">
        <NavbarStart className="flex items-center gap-2 px-2">
          <Command className="size-5" />
          <span className="font-semibold text-sm">Acme</span>
        </NavbarStart>
        <NavbarGap />
        <NavbarSection>
          <NavbarItem href="#" isCurrent>
            Overview
          </NavbarItem>
          <NavbarItem href="#">Customers</NavbarItem>
          <NavbarItem href="#">Products</NavbarItem>
          <NavbarItem href="#">Settings</NavbarItem>
        </NavbarSection>
        <NavbarSpacer />
        <NavbarSection>
          <UserMenu />
        </NavbarSection>
      </Navbar>
    </>
  );
}
