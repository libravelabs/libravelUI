"use client";

import { NavbarProvider, NavbarContent } from "@/components/ui/block/navbar";
import { AppNavbar } from "./components/app-navbar";
import { Heading } from "@/components/ui/core/heading";
import { CardsSection } from "./components/cards-section";
import { Separator } from "@/components/ui/core/separator";
import { DataTable } from "./components/data-table";
import { products } from "./products";
import { DashboardChart } from "./components/dashboard-chart";

export default function NavbarDefaultPage() {
  return (
    <NavbarProvider>
      <AppNavbar />

      <NavbarContent>
        <div className="flex flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-4">
            <CardsSection data={products} />
          </div>

          <div className="relative flex-1 overflow-hidden rounded-xl border p-4">
            <DashboardChart />
          </div>

          <DataTable data={products} />
        </div>
      </NavbarContent>
    </NavbarProvider>
  );
}
