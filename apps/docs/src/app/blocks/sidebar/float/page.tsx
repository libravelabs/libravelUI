"use client";

import { useState, type SVGProps } from "react";
import { useId } from "react";
import { AppSidebar } from "./app-sidebar";
import {
  SidebarContent,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/block/sidebar";

export default function FloatSidebarPage() {
  const [open, setOpen] = useState(false);

  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <AppSidebar open={open} setOpen={setOpen} />

      <SidebarContent>
        <div className="flex flex-col gap-2 p-2">
          <div className="grid auto-rows-min gap-2 md:grid-cols-3">
            <div className="relative aspect-video overflow-hidden rounded-xl border">
              <PlaceholderPattern className="absolute inset-0 size-full stroke-foreground/20" />
            </div>

            <div className="relative aspect-video overflow-hidden rounded-xl border">
              <PlaceholderPattern className="absolute inset-0 size-full stroke-foreground/20" />
            </div>

            <div className="relative aspect-video overflow-hidden rounded-xl border">
              <PlaceholderPattern className="absolute inset-0 size-full stroke-foreground/20" />
            </div>
          </div>

          <div className="relative min-h-150 flex-1 overflow-hidden rounded-xl border">
            <PlaceholderPattern className="absolute inset-0 size-full stroke-foreground/20" />
          </div>
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
