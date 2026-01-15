import { Button } from "@/components/ui/core/button";
import Link from "next/link";
import { ShiningText } from "@/components/ui/motion/shining-text";
import { ArrowRight } from "lucide-react";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import { Badge } from "@/components/ui/core/badge";

const HERO_CONTENT = {
  badge: {
    text: "v2.0.0 released",
    status: "Stable",
  },
  title: {
    prefix: "Build interfaces with",
    main: "Precision Components",
  },
  description:
    "The comprehensive React component library for mission-critical applications. Type-safe, accessible, and composable.",
  stats: [
    { value: "40+", label: "Components" },
    { value: "100%", label: "Type-Safe" },
    { value: "ARIA", label: "Compliant" },
    { value: "Zero", label: "Runtime Styles" },
  ],
  cta: {
    text: "Browse components",
    href: "/docs/components",
  },
  command: "npm install @libravel/ui",
};

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden bg-background text-foreground border-b border-border">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] opacity-[0.05] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-6xl px-6 text-center space-y-12">
        <Badge
          tone="outline"
          className="px-3 py-1 text-xs font-mono tracking-widest uppercase"
        >
          <span>{HERO_CONTENT.badge.text}</span>
          <span className="h-3 w-px bg-border" />
          <span className="text-primary">{HERO_CONTENT.badge.status}</span>
        </Badge>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground drop-shadow-2xl">
          <span className="block mb-2">{HERO_CONTENT.title.prefix}</span>
          <span className="bg-clip-text text-transparent bg-linear-to-b from-primary via-primary/80 to-foreground">
            {HERO_CONTENT.title.main}
          </span>
        </h1>

        <ShiningText className="text-lg md:text-xl max-w-2xl leading-relaxed">
          {HERO_CONTENT.description}
        </ShiningText>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 pt-4 border-t border-border w-full max-w-3xl">
          {HERO_CONTENT.stats.map((stat, index) => (
            <div key={index} className="text-left">
              <div className="text-2xl font-mono text-foreground">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-6 w-full justify-center items-center pt-8">
          <Link href={HERO_CONTENT.cta.href}>
            <Button
              tone="default"
              size="xl"
              className="h-14 px-10 text-base rounded-none min-w-[200px] gap-3 uppercase"
            >
              {HERO_CONTENT.cta.text}
              <ArrowRight />
            </Button>
          </Link>
          <DynamicCodeBlock
            lang="bash"
            code={HERO_CONTENT.command}
            codeblock={{
              className:
                "flex items-center justify-center h-14 px-10 text-base rounded-none min-w-[200px] font-mono border border-border",
            }}
          />
        </div>
      </div>
    </section>
  );
}
