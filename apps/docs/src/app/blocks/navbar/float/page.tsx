import { NavbarProvider } from "@/components/ui/block/navbar";
import { AppNavbar } from "./app-navbar";
import { Heading } from "@/components/ui/core/heading";

export default function NavbarFloatPage() {
  return (
    <NavbarProvider className="px-6">
      <AppNavbar />

      <Heading className="md:pt-10">Navbar Float</Heading>
    </NavbarProvider>
  );
}
