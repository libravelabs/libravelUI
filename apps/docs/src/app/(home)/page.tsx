import { ShowcaseSection } from "@/app/(home)/sections/showcase-section";
import {
  HeroSection,
  ComponentsOverviewSection,
  PlaygroundSection,
  SystemPrinciplesSection,
  ExamplesSection,
  CTASection,
} from "./sections";

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen overflow-x-hidden">
      <HeroSection />
      <ShowcaseSection />
      <ComponentsOverviewSection />
      <PlaygroundSection />
      <SystemPrinciplesSection />
      <ExamplesSection />
      <CTASection />
    </main>
  );
}
