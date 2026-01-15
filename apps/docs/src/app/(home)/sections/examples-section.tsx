import { Button } from "@/components/ui/core/button";
import { Card } from "@/components/ui/core/card";
import { Badge } from "@/components/ui/core/badge";
import { Link } from "@/components/ui/core/link";
import { cn } from "@/lib/utils";

export function ExamplesSection() {
  return (
    <section className="py-24 bg-background border-b border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-sm font-mono text-primary mb-2 tracking-widest uppercase">
              // COMPOSITION
            </h2>
            <h3 className="text-3xl font-semibold text-foreground tracking-tight">
              Built with Libravel
            </h3>
            <p className="text-muted-foreground mt-2 max-w-lg">
              Real-world examples assembled from atomic primitives.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Login Form Example */}
          <div className="group relative rounded-xl border border-border bg-card/50 p-6">
            <div className="absolute top-4 right-4 z-10">
              <Badge
                tone="active"
                className="bg-primary/10 text-primary border-primary/20"
              >
                Auth
              </Badge>
            </div>

            <div className="mt-8 space-y-4 bg-background border border-border p-6 rounded-lg pointer-events-none select-none">
              <div className="text-center mb-6">
                <div className="w-10 h-10 bg-muted rounded mx-auto mb-2" />
                <div className="h-4 w-24 bg-muted rounded mx-auto" />
              </div>
              <div className="space-y-2">
                <div className="h-9 w-full bg-card border border-input rounded px-2 flex items-center text-xs text-muted-foreground">
                  email@company.com
                </div>
                <div className="h-9 w-full bg-card border border-input rounded px-2 flex items-center text-xs text-muted-foreground">
                  ••••••••
                </div>
              </div>
              <div className="h-9 w-full bg-primary rounded flex items-center justify-center text-xs font-medium text-primary-foreground">
                Sign In
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-foreground font-medium">Authentication</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Login form composed of Card, Input, Label, and Button.
              </p>
            </div>
          </div>

          {/* Dashboard Widget Example */}
          <div className="group relative rounded-xl border border-border bg-card/50 p-6">
            <div className="absolute top-4 right-4 z-10">
              <Badge
                tone="default"
                className="bg-chart-2/10 text-chart-2 border-chart-2/20"
              >
                Data
              </Badge>
            </div>

            <div className="mt-8 space-y-4 bg-background border border-border p-6 rounded-lg pointer-events-none select-none">
              <div className="flex justify-between items-center mb-4">
                <div className="h-4 w-20 bg-muted rounded" />
                <div className="h-3 w-12 bg-muted rounded" />
              </div>
              <div className="flex items-end gap-2 h-24">
                <div className="w-1/5 bg-muted h-[40%] rounded-t" />
                <div className="w-1/5 bg-muted h-[70%] rounded-t" />
                <div className="w-1/5 bg-chart-1 h-[50%] rounded-t" />
                <div className="w-1/5 bg-muted h-[30%] rounded-t" />
                <div className="w-1/5 bg-muted h-[80%] rounded-t" />
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-foreground font-medium">Analytics Card</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Dashboard tile with Badge, Select, and custom visualization.
              </p>
            </div>
          </div>

          {/* Media Player Example */}
          <div className="group relative rounded-xl border border-border bg-card/50 p-6">
            <div className="absolute top-4 right-4 z-10">
              <Badge
                tone="default"
                className="bg-chart-5/10 text-chart-5 border-chart-5/20"
              >
                Media
              </Badge>
            </div>

            <div className="mt-8 space-y-4 bg-background border border-border p-6 rounded-lg pointer-events-none select-none">
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 bg-muted rounded" />
                <div>
                  <div className="h-3 w-24 bg-muted rounded mb-2" />
                  <div className="h-2 w-16 bg-card rounded" />
                </div>
              </div>
              <div className="h-1 w-full bg-muted rounded overflow-hidden">
                <div className="h-full w-1/3 bg-foreground" />
              </div>
              <div className="flex justify-center gap-4">
                <div className="w-6 h-6 bg-muted rounded-full" />
                <div className="w-8 h-8 bg-foreground rounded-full" />
                <div className="w-6 h-6 bg-muted rounded-full" />
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-foreground font-medium">Media Player</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Complex stateful component with Slider, Progress, and Icons.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
