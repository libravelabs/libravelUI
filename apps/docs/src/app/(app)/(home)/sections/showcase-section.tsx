import { Card, CardFooter, CardHeader } from "@/components/ui/core/card";
import { ChevronRight, Terminal } from "lucide-react";
import Link from "next/link";
import type { GridItem } from "../page";

export function ShowcaseSection({ GRID }: { GRID: GridItem[] }) {
  return (
    <section className="border-t py-12 px-2">
      <div className="flex items-baseline justify-between mb-10">
        <div>
          <h2 className="serif text-3xl font-normal">Components</h2>
          <p className="text-xs text-muted-foreground mt-1 font-mono">
            90+ components and counting.
          </p>
        </div>
        <Link
          href="/components"
          className="text-xs text-muted-foreground transition-colors"
        >
          View all →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 [&>*:nth-last-child(1):nth-child(3n+1)]:lg:col-span-3 gap-3">
        {GRID.slice(5).map(({ name, href, Preview }, i) => (
          <Card key={name} variant="gradient" padding="none">
            <CardHeader className="h-56 flex items-center justify-center">
              <Preview />
            </CardHeader>

            <Link href={href}>
              <CardFooter className="px-4 py-2.5 flex items-center justify-between border-t hover:bg-foreground/5 hover:ps-6 transition-all duration-300">
                <span className="text-xs font-medium font-mono">{name}</span>
                <ChevronRight className="size-3" />
              </CardFooter>
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
}
