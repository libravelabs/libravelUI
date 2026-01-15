import Link from "next/link";
import { Button } from "@/components/ui/core/button";

export function CTASection() {
  return (
    <section className="py-24 bg-background flex flex-col items-center justify-center text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--primary)_0%,transparent_70%)] opacity-[0.1] pointer-events-none" />

      <div className="relative z-10 max-w-xl px-6">
        <h2 className="text-3xl font-bold text-foreground mb-6">
          Ready to build?
        </h2>
        <p className="text-muted-foreground mb-10 text-lg">
          Explore the documentation or start building with the components
          immediately.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/docs/components">
            <Button tone="default" size="lg" className="min-w-[160px]">
              Browse Components
            </Button>
          </Link>
          <Link href="/docs">
            <Button tone="outline" size="lg" className="min-w-[160px]">
              Read the Docs
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
