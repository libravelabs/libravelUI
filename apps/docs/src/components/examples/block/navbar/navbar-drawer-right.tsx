import {
  NavbarProvider,
  Navbar,
  NavbarItem,
  NavbarSection,
  NavbarSpacer,
  NavbarTrigger,
  NavbarMobile,
  NavbarDrawer,
  NavbarStart,
  NavbarGap,
} from "@/components/ui/block/navbar";
import { Button } from "@/components/ui/core/button";
import { Command } from "lucide-react";

export default function NavbarDrawerRight() {
  return (
    <NavbarProvider>
      <NavbarMobile>
        <NavbarStart className="flex items-center gap-2 px-2">
          <Command className="size-5" />
          <span className="font-semibold text-sm">Acme</span>
        </NavbarStart>
        <NavbarSpacer />
        <NavbarTrigger />
      </NavbarMobile>

      <NavbarDrawer side="right">
        <NavbarSection>
          <NavbarItem href="#">Overview</NavbarItem>
          <NavbarItem href="#">Customers</NavbarItem>
          <NavbarItem href="#">Products</NavbarItem>
          <NavbarItem href="#">Settings</NavbarItem>
        </NavbarSection>
      </NavbarDrawer>

      <Navbar>
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
          <Button tone="ghost">Log In</Button>
          <Button>Sign Up</Button>
        </NavbarSection>
      </Navbar>
    </NavbarProvider>
  );
}
