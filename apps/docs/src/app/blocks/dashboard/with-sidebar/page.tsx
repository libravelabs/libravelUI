"use client";

import type { SVGProps } from "react";
import { useId } from "react";
import { AppSidebar } from "./components/app-sidebar";
import {
  SidebarContent,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/block/sidebar";
import { CardsSection } from "./components/cards-section";
import { Separator } from "@/components/ui/core/separator";
import { DataTable } from "./components/data-table";
import { products } from "./products";
import { DashboardChart } from "./components/dashboard-chart";
import { Breadcrumb, BreadcrumbItem } from "@/components/ui/core/breadcrumbs";

export default function DashboardSidebarPage() {
  return (
    <SidebarProvider defaultOpen>
      <AppSidebar />

      <SidebarContent>
        <header className="sticky top-0 z-10 bg-background flex gap-4 h-14 items-center border-b p-2">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-4" />

          <Breadcrumb>
            <BreadcrumbItem>Dashboard</BreadcrumbItem>
          </Breadcrumb>
        </header>

        <div className="flex flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-4">
            <CardsSection data={products} />
          </div>

          <div className="relative flex-1 overflow-hidden rounded-xl border p-4">
            <DashboardChart />
          </div>

          <DataTable data={products} />
        </div>
      </SidebarContent>
    </SidebarProvider>
  );
}
