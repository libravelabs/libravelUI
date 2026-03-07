"use client";

import { PackageInstall } from "@/components/docs/package-install";
import Link from "next/link";
import { Glow } from "@/components/app/glow";
import type { GridItem } from "../page";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/core/card";

export function HeroSection({ GRID }: { GRID: GridItem[] }) {
  return (
    <section className="bg-grid overflow-hidden px-2">
      <Glow
        variant="center"
        className="absolute inset-0 pointer-events-none opacity-20"
      />

      <div className="relative">
        <div className="fade-up max-w-xl" style={{ animationDelay: "0ms" }}>
          <p className="text-xs text-card-foreground uppercase tracking-widest mb-5 font-mono">
            Open-source UI components
          </p>
          <h1 className="serif text-6xl font-normal leading-none text-foreground mb-4 tracking-tight">
            Build interfaces
            <br />
            <em className="text-muted-foreground">without limits.</em>
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed mb-8">
            Copy-paste components you own and adapt — not a runtime dependency.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-end w-full gap-4">
            <PackageInstall
              packageName="@libravelui"
              className="w-full sm:w-80"
            />
            <Link
              href="/components"
              className="shrink-0 sm:mb-1.5 hover:underline font-medium"
            >
              Browse Components &rarr;
            </Link>
          </div>
        </div>

        <div
          className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 fade-up"
          style={{ animationDelay: "130ms" }}
        >
          {GRID.slice(0, 5).map(({ name, Preview }, i) => (
            <Card
              key={name}
              variant="gradient"
              padding="none"
              className={cn(i === 0 && "lg:col-span-2")}
            >
              <CardHeader>
                <p className="text-xs text-card-foreground px-4 pt-3 font-mono">
                  {name}
                </p>
              </CardHeader>
              <CardContent className="h-56 flex items-center justify-center">
                <Preview />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
