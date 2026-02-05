import { PackageInstall } from "@/components/docs/package-install";
import { Button } from "@/components/ui/core/button";
import { AnimatedCircleIndicator } from "@/components/ui/motion/animated-circle-indicator";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const HERO_SECTION_CONTENT = {
  header: {
    badge: "SYSTEM_ONLINE v1.0.0",
    title: (
      <>
        Composable React components
        <span className="block text-muted-foreground mt-2 text-2xl sm:text-4xl md:text-5xl font-normal">
          built on React Aria.
        </span>
      </>
    ),
    description: (
      <>
        Accessible by default. Predictable APIs.
        <br />
        Zero visual opinion.
      </>
    ),
    meta: {
      status: "STATUS: OPTIMAL",
      version: "v1.0.0",
    },
  },
  actions: {
    install: "@libravel/ui",
    cta: {
      label: (
        <>
          Browse Components <ArrowRight />
        </>
      ),
      href: "/docs/components",
    },
  },
};

export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center overflow-hidden border-b">
      <div className="absolute inset-0 bg-grid" />

      <div className="container relative z-10 flex flex-col items-center text-center px-4 md:px-6">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-mono text-muted-foreground backdrop-blur-sm">
          <AnimatedCircleIndicator
            tone="success"
            animation="pulseTransparent"
          />
          <span>{HERO_SECTION_CONTENT.header.badge}</span>
        </div>

        <h1 className="max-w-4xl text-4xl font-medium tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
          {HERO_SECTION_CONTENT.header.title}
        </h1>

        <div className="mt-10 flex flex-col items-center gap-6 w-full max-w-md">
          <div className="w-full">
            <PackageInstall
              packageName={HERO_SECTION_CONTENT.actions.install}
            />
          </div>
          <Link href={HERO_SECTION_CONTENT.actions.cta.href}>
            <Button radius="none" size="xl">
              {HERO_SECTION_CONTENT.actions.cta.label}
            </Button>
          </Link>
        </div>

        <p className="mt-8 max-w-2xl text-lg text-muted-foreground/80 font-light leading-relaxed">
          {HERO_SECTION_CONTENT.header.description}
        </p>
      </div>
    </section>
  );
}
