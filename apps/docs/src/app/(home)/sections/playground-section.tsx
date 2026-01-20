import { Button } from "@/components/ui/core/button";
import { Playground } from "@/components/app/playground";

export function PlaygroundSection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12">
          <div>
            <h2 className="text-sm font-mono text-primary mb-2 tracking-widest uppercase">
              {"◼ INTERACTIVE"}
            </h2>
            <p className="text-3xl font-semibold text-foreground tracking-tight">
              Playground & Fabrication
            </p>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <Button tone="outline" className="font-mono text-xs h-9">
              <span className="w-2 h-2 rounded-full bg-primary mr-2" />
              Live Environment
            </Button>
          </div>
        </div>

        <Playground comp="button/basic.demo" orientation="horizontal" />
      </div>
    </section>
  );
}
