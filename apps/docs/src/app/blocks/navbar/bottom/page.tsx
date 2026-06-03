import { NavbarProvider, NavbarInset } from "@/components/ui/block/navbar";
import { AppNavbar } from "./app-navbar";
import { Heading } from "@/components/ui/core/heading";

export default function NavbarBottomPage() {
  return (
    <NavbarProvider>
      <AppNavbar />

      <NavbarInset>
        <div className="h-75 border-2 border-dashed border-muted m-4 rounded-lg flex items-center justify-center">
          <span className="text-muted-foreground">Main Content Container</span>
        </div>
      </NavbarInset>
    </NavbarProvider>
  );
}
