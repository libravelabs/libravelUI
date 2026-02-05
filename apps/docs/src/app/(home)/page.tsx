import { HeroSection } from "./sections/hero-section";
import { ComparisonSection } from "./sections/comparison-section";
import { ShowcaseSection } from "./sections/showcase-section";
import { ComponentsOverviewSection } from "./sections/components-overview-section";
import { ExamplesSection } from "./sections/examples-section";
import { PlaygroundSection } from "./sections/playground-section";
import { AccessibilitySection } from "./sections/accessibility-section";
import { CTASection } from "./sections/cta-section";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <ComparisonSection />
      <ShowcaseSection />
      <ComponentsOverviewSection />
      <ExamplesSection />
      <PlaygroundSection />
      <AccessibilitySection />
      <CTASection />
    </main>
  );
}
