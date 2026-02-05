import { Lock, Play, Settings, Signal } from "lucide-react";
import { Skeleton } from "@/components/ui/core/skeleton";
import { Button } from "@/components/ui/core/button";
import { ProgressBar } from "@/components/ui/core/progress";
import { Switch } from "@/components/ui/core/switch";

const EXAMPLES_SECTION_CONTENT = {
  header: {
    badge: "◼ SYSTEM_EXAMPLES",
    title: "Real-world Patterns",
    description: "Operational modules. Assembled from atomic primitives.",
    meta: {
      labId: "LAB_ID: 94-B",
      status: "STATUS: OPTIMAL",
    },
  },
  items: [
    {
      id: "01",
      label: "// IDENTITY_MODULE",
      title: "Authentication",
      description: "Secure access point assembled from atomic primitives.",
      visual: (
        <div className="w-full max-w-[240px] h-[280px] flex flex-col justify-between rounded border bg-foreground/5 p-6 backdrop-blur-md">
          <div className="flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border text-foreground">
              <Lock className="size-5" />
            </div>
          </div>
          <div className="space-y-3">
            <div className="space-y-2">
              <Skeleton className="h-2 w-16 rounded-full" />
              <Skeleton className="h-8 w-full rounded" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-2 w-24 rounded-full" />
              <Skeleton className="h-8 w-full rounded" />
            </div>
          </div>
          <div className="pt-2">
            <Skeleton className="h-9 w-full rounded" />
          </div>
        </div>
      ),
    },
    {
      id: "02",
      label: "// SYSTEM_CONTROL",
      title: "Command Protocol",
      description: "System configuration interface with toggle controls.",
      visual: (
        <div className="w-full max-w-[240px] h-[280px] flex flex-col justify-between rounded border bg-foreground/5 p-6 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
              <Settings className="size-3" />
              <span>sys_cfg</span>
            </div>
            <div className="ms-2 size-1.5 rounded-full bg-primary/50 shadow-[0_0_8px_rgba(var(--primary),0.4)]" />
          </div>
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <Skeleton className="h-2 w-20 rounded-full" />
              <Switch defaultSelected aria-label="Toggle system" />
            </div>
            <div className="flex items-center justify-between">
              <Skeleton className="h-2 w-16 rounded-full" />
              <Switch aria-label="Toggle power" />
            </div>
            <div className="flex items-center justify-between">
              <Skeleton className="h-2 w-24 rounded-full" />
              <Switch defaultSelected aria-label="Toggle network" />
            </div>
          </div>
          <div className="pt-2">
            <Skeleton className="h-9 w-full rounded" />
          </div>
        </div>
      ),
    },
    {
      id: "03",
      label: "// MEDIA_CONTROLLER",
      title: "Playback System",
      description: "Interactive slider and progress controls.",
      visual: (
        <div className="w-full max-w-[240px] h-[280px] flex flex-col justify-between rounded border bg-foreground/5 p-6 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 shrink-0 rounded" />
            <div className="space-y-1.5">
              <Skeleton className="h-2 w-20 rounded-full" />
              <Skeleton className="h-1.5 w-12 rounded-full" />
            </div>
          </div>
          <div className="space-y-2">
            <ProgressBar value={33} hideValue />
            <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
              <span>04:20</span>
              <span>12:00</span>
            </div>
          </div>
          <div className="flex justify-center gap-4">
            <Button
              tone="outline"
              radius="full"
              iconOnly
              className="h-8 w-8 hover:bg-foreground/5"
            >
              <Play className="h-3 w-3 fill-foreground/50" />
            </Button>
          </div>
        </div>
      ),
    },
  ],
};

export function ExamplesSection() {
  return (
    <section className="relative overflow-hidden py-32 border-b">
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-30%,rgba(120,119,198,0.05),transparent)]" />

      <div className="container relative mx-auto px-6">
        <div className="mb-20 flex flex-col items-start gap-4 border-l-2 border-primary/20 pl-6 md:flex-row md:items-end md:justify-between md:border-l-0 md:pl-0">
          <div className="max-w-xl">
            <div className="mb-2 flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-primary">
              {EXAMPLES_SECTION_CONTENT.header.badge}
            </div>
            <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-5xl">
              {EXAMPLES_SECTION_CONTENT.header.title}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground font-light leading-relaxed">
              {EXAMPLES_SECTION_CONTENT.header.description}
            </p>
          </div>
          <div className="hidden font-mono text-xs text-muted-foreground/50 md:block text-right">
            <div>{EXAMPLES_SECTION_CONTENT.header.meta.labId}</div>
            <div>{EXAMPLES_SECTION_CONTENT.header.meta.status}</div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {EXAMPLES_SECTION_CONTENT.items.map((item) => (
            <div
              key={item.id}
              className="group relative flex h-full flex-col overflow-hidden rounded-sm border hover:bg-muted/5 transition-all duration-500"
            >
              <div className="aspect-4/3 w-full border-b bg-[radial-gradient(circle_at_center,var(--color-background)_0%,transparent_100%)] p-8 flex items-center justify-center relative">
                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-size-[4px_4px]" />
                <div className="relative z-10 transition-transform duration-500 will-change-transform group-hover:scale-105">
                  {item.visual}
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-between p-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    <span className="text-primary">0{item.id}</span>
                    <span>{item.label}</span>
                  </div>
                  <h3 className="min-h-7 font-mono text-xl text-foreground">
                    {item.title}
                  </h3>
                  <p className="min-h-10 text-sm leading-relaxed text-muted-foreground/80">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 flex items-center justify-between border-t pt-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-primary">
                    <Signal className="h-3 w-3" />
                    <span>LIVE_PREVIEW</span>
                  </div>
                  <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
