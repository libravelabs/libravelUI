import { Button } from "@/components/ui/core/button";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";
import { Logo } from "@/components/logo";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 md:p-8 selection:bg-primary/20">
      <div className="relative w-full max-w-7xl min-h-[85vh] bg-card border border-border rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row transition-all duration-700">
        <div className="flex-[1.2] p-10 lg:p-20 flex flex-col justify-between relative z-10">
          <div className="space-y-16">
            <div className="flex items-center gap-4">
              <Logo className="w-32" />
              <div className="h-4 w-px bg-border" />
              <span className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase">
                Starter Kit
              </span>
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-medium tracking-tight text-foreground leading-[1.05]">
                Engineering
                <br />
                <span className="text-muted-foreground font-mono text-[0.8em] tracking-normal opacity-60">
                  stable_core_lib
                </span>
              </h1>

              <p className="max-w-[440px] text-base lg:text-lg leading-relaxed text-muted-foreground">
                Professional UI primitives for technical-grade applications.
                Built for performance, scalability, and developer experience.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="https://ui.libravelabs.com/getting-started"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" radius="full">
                  <Image
                    src="/libravel.svg"
                    alt="libravel-logo"
                    className="mr-2 invert dark:invert-0"
                    width={16}
                    height={16}
                  />
                  Get Started
                </Button>
              </a>

              <a
                href="https://ui.libravelabs.com/docs/installation"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" radius="full" tone="outline">
                  Documentation
                </Button>
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase">
                Production Ready
              </span>
              <span className="text-[10px] font-mono text-primary font-semibold">
                v1.0.0-stable
              </span>
            </div>
          </div>
        </div>

        <div className="hidden md:flex flex-1 relative bg-muted/25 border-l border-border overflow-hidden">
          <div className="absolute inset-0 opacity-50 pointer-events-none">
            <div className="absolute inset-0 grid grid-cols-6 grid-rows-6">
              {Array.from({ length: 36 }).map((_, i) => (
                <div key={i} className="border border-border/40" />
              ))}
            </div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full aspect-square max-w-[520px] p-20">
              <div className="absolute inset-0 border border-primary/20 rounded-full animate-[spin_40s_linear_infinite]" />
              <div className="absolute inset-12 border border-border rounded-full animate-[spin_30s_linear_infinite_reverse]" />
              <div className="absolute inset-24 border border-primary/10 rounded-full animate-[spin_20s_linear_infinite]" />

              <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-44 bg-card border border-primary/30 rounded-3xl p-6 flex flex-col gap-4 shadow-2xl shadow-primary/20 transition-colors hover:border-primary/70">
                <div className="flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-primary/80" />
                    <div className="h-2 w-2 rounded-full bg-primary/40" />
                    <div className="h-2 w-2 rounded-full bg-primary/20" />
                  </div>
                  <div className="h-6 w-12 bg-primary/10 rounded-md border border-primary/20" />
                </div>

                <div className="space-y-3">
                  <div className="h-2 w-full bg-muted rounded-full" />
                  <div className="h-2 w-4/5 bg-muted rounded-full opacity-60" />
                  <div className="h-2 w-3/5 bg-muted rounded-full opacity-30" />
                </div>

                <div className="mt-auto flex gap-3">
                  <div className="h-10 flex-1 bg-muted/40 rounded-xl border border-border" />
                  <div className="h-10 w-24 bg-primary rounded-xl shadow-md shadow-primary/30" />
                </div>
              </div>

              <div className="absolute top-10 right-12 w-36 h-24 bg-card/80 border border-border rounded-2xl shadow-xl p-4 flex flex-col gap-2">
                <div className="h-1 w-12 bg-primary/60 rounded-full" />
                <div className="flex-1 flex items-end gap-1">
                  <div className="flex-1 bg-chart-1 h-1/2 rounded-sm" />
                  <div className="flex-1 bg-chart-2 h-3/4 rounded-sm" />
                  <div className="flex-1 bg-chart-3 h-full rounded-sm" />
                  <div className="flex-1 bg-chart-4 h-2/3 rounded-sm" />
                </div>
              </div>

              <div className="absolute bottom-12 left-8 w-28 h-28 border border-primary/20 rounded-2xl rotate-12 flex items-center justify-center">
                <div className="w-12 h-12 border border-primary/40 rounded-full animate-pulse" />
              </div>
            </div>
          </div>

          <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-card to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-background to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
