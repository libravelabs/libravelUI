import { NavbarProvider, NavbarInset } from "@/components/ui/block/navbar";
import { AppNavbar } from "./app-navbar";
import { Heading } from "@/components/ui/core/heading";

export default function NavbarDefaultPage() {
  return (
    <NavbarProvider>
      <AppNavbar />

      <NavbarInset>
        <div className="p-4">
          <div className="h-180 border-2 border-dashed border-muted rounded-lg flex items-center justify-center bg-muted/20">
            <span className="text-muted-foreground">
              This is default navbar
            </span>
          </div>
        </div>
      </NavbarInset>
    </NavbarProvider>
  );
}
