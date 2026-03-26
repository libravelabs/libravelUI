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

export default function NavbarPlacementBottom() {
  return (
    <NavbarProvider>
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

      <NavbarInset>
        <div className="h-[300px] border-2 border-dashed border-muted m-4 rounded-lg flex items-center justify-center">
          <span className="text-muted-foreground">Main Content Above Navbar</span>
        </div>
      </NavbarInset>
      
      <Navbar placement="bottom">
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
