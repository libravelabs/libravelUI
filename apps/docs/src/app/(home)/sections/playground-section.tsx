"use client";

import { Playground } from "@/components/app/playground/playground";
import { useIsMobile } from "@/hooks/use-mobile";

const PLAYGROUND_SECTION_CONTENT = {
  header: {
    badge: "◼ CONTROL_INTERFACE",
    title: "Command Center",
    description: <>Generate code. Tweak parameters. Copy. Paste.</>,
    meta: {
      labId: "LAB_ID: 94-B",
      status: "STATUS: OPTIMAL",
    },
  },
};

export function PlaygroundSection() {
  const isMobile = useIsMobile();

  return (
    <section className="relative overflow-hidden pt-12">
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-30%,rgba(var(--primary),0.1),transparent)]" />

      <div className="container relative z-10">
        <div className="mb-20 flex flex-col items-start gap-4 border-l-2 border-primary/20 pl-6 md:flex-row md:items-end md:justify-between md:border-l-0 md:pl-0">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-primary">
              {PLAYGROUND_SECTION_CONTENT.header.badge}
            </div>
            <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-5xl">
              {PLAYGROUND_SECTION_CONTENT.header.title}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground font-light leading-relaxed">
              {PLAYGROUND_SECTION_CONTENT.header.description}
            </p>
          </div>
          <div className="hidden font-mono text-xs text-muted-foreground/50 md:block text-right">
            <div>{PLAYGROUND_SECTION_CONTENT.header.meta.labId}</div>
            <div>{PLAYGROUND_SECTION_CONTENT.header.meta.status}</div>
          </div>
        </div>

        <div className="mx-auto shadow-2xl shadow-primary/5 rounded-2xl overflow-hidden border backdrop-blur-sm">
          <Playground
            comp="button/basic.demo"
            orientation={isMobile ? "vertical" : "horizontal"}
          />
        </div>
      </div>
    </section>
  );
}
