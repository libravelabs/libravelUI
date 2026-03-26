import Link from "next/link";
import { Button } from "@/components/ui/core/button";
import { Glow } from "@/components/app/glow";

const CTA_SECTION_CONTENT = {
  header: {
    badge: "◼ SYSTEM_INIT",
    title: "Ready to build?",
    description: "Start building immediately.",
    meta: {
      labId: "LAB_ID: 94-B",
      status: "STATUS: OPTIMAL",
    },
  },
  actions: {
    browse: "Browse Components",
    docs: "Read the Docs",
  },
};

export function CTASection() {
  return (
    <section className="group pt-24 pb-12 flex flex-col items-center justify-center text-center relative overflow-hidden">
      <div className="relative z-10 max-w-xl px-6">
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-mono text-primary">
            <span>{CTA_SECTION_CONTENT.header.badge}</span>
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-6">
            {CTA_SECTION_CONTENT.header.title}
          </h2>
          <p className="text-muted-foreground mb-10 text-lg">
            {CTA_SECTION_CONTENT.header.description}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/docs/components">
            <Button tone="default" size="lg" className="min-w-[160px]">
              {CTA_SECTION_CONTENT.actions.browse}
            </Button>
          </Link>
          <Link href="/docs">
            <Button tone="outline" size="lg" className="min-w-[160px]">
              {CTA_SECTION_CONTENT.actions.docs}
            </Button>
          </Link>
        </div>
      </div>

      <div className="absolute top-0 left-0 h-full w-full translate-y-4 opacity-40 transition-all duration-500 ease-in-out group-hover:translate-y-8 group-hover:opacity-100">
        <Glow variant="bottom" />
      </div>
    </section>
  );
}
