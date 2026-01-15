import {
  HeroSection,
  ComponentsOverviewSection,
  PlaygroundSection,
  SystemPrinciplesSection,
  ExamplesSection,
  CTASection,
} from "./sections";
import { Playground } from "@/components/app/playground";

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen overflow-x-hidden">
      <HeroSection />
      <ComponentsOverviewSection />
      <Playground comp="button/basic.demo" />
      <PlaygroundSection />
      <SystemPrinciplesSection />
      <ExamplesSection />
      <CTASection />
    </main>
  );
}
