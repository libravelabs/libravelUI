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
  NavbarInset,
} from "@/components/ui/block/navbar";
import { Button } from "@/components/ui/core/button";
import { Command } from "lucide-react";

export default function NavbarFloat() {
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

      <NavbarDrawer>
        <NavbarSection>
          <NavbarItem href="#">Overview</NavbarItem>
          <NavbarItem href="#">Customers</NavbarItem>
          <NavbarItem href="#">Products</NavbarItem>
          <NavbarItem href="#">Settings</NavbarItem>
        </NavbarSection>
      </NavbarDrawer>

      <Navbar variant="float">
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
      <NavbarInset>
        <div className="p-4 rounded-xl mx-4 my-2 border bg-muted/20 h-[300px] flex items-center justify-center">
            <span className="text-muted-foreground">Main Content Container</span>
        </div>
      </NavbarInset>
    </NavbarProvider>
  );
}
