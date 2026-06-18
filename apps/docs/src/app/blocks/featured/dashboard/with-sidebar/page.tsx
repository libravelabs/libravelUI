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

export default function DashboardSidebarPage() {
  return (
    <SidebarProvider defaultOpen>
      <AppSidebar />

      <SidebarContent>
        <header className="flex gap-4 h-14 items-center border-b p-2">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-4" />
          <span>Dashboard</span>
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

function PlaceholderPattern({ className, ...props }: SVGProps<SVGSVGElement>) {
  const patternId = useId();

  return (
    <svg
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <pattern
          id={patternId}
          x="0"
          y="0"
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <path d="M-3 13 15-5M-5 5l18-18M-1 21 17 3" />
        </pattern>
      </defs>

      <rect
        width="100%"
        height="100%"
        stroke="none"
        fill={`url(#${patternId})`}
      />
    </svg>
  );
}
