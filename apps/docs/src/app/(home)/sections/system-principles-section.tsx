import { GalleryVerticalEnd, LayoutPanelTop, SwatchBook } from "lucide-react";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";

const SYSTEM_PRINCIPLES_CONTENT = {
  header: {
    badge: "◼ ARCHITECTURE",
    title: ["Engineered for", "Modern Applications"],
    description:
      "Libravel UI isn't just a set of pretty pictures. It's a robust architecture built on top of React Aria, designed to be accessible, customizable, and reliable.",
  },
  code: `import { Button } from "@/components/ui/core/button";

export default () => (
  <Button tone="outline">
    Deploy System
  </Button>
);`,
  principles: [
    {
      title: "Accessible Core",
      description:
        "Built on top of React Aria to ensure full WAI-ARIA compliance and keyboard navigation support out of the box.",
      icon: <GalleryVerticalEnd />,
    },
    {
      title: "Tailwind Native",
      description:
        "Styled completely with Tailwind CSS utility classes, making customization as simple as adding a className.",
      icon: <SwatchBook />,
    },
    {
      title: "Composable API",
      description:
        "Designed with composition in mind. Components expose their internal structure for maximum flexibility.",
      icon: <LayoutPanelTop />,
    },
  ],
};

export function SystemPrinciplesSection() {
  return (
    <section className="py-24 bg-background border-b border-border">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-primary">
              {SYSTEM_PRINCIPLES_CONTENT.header.badge}
            </div>
            <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-5xl mb-6">
              {SYSTEM_PRINCIPLES_CONTENT.header.title.map((line, index) => (
                <span key={index}>
                  {line}
                  {index <
                    SYSTEM_PRINCIPLES_CONTENT.header.title.length - 1 && <br />}
                </span>
              ))}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground font-light leading-relaxed mb-8">
              {SYSTEM_PRINCIPLES_CONTENT.header.description}
            </p>

            <div className="overflow-hidden rounded-xl border border-border bg-muted/30 backdrop-blur-sm">
              <DynamicCodeBlock
                lang="tsx"
                code={SYSTEM_PRINCIPLES_CONTENT.code}
                codeblock={{
                  allowCopy: false,
                  className: "my-0 border-0 bg-transparent shadow-none",
                }}
              />
            </div>
          </div>

          <div className="space-y-8">
            {SYSTEM_PRINCIPLES_CONTENT.principles.map((p) => (
              <div key={p.title} className="flex gap-4 group">
                <div className="shrink-0 w-12 h-12 rounded-lg bg-muted/50 border border-border flex items-center justify-center text-primary group-hover:bg-primary/10 group-hover:border-primary/50 transition-colors duration-300">
                  {p.icon}
                </div>
                <div>
                  <h4 className="text-lg font-medium text-foreground mb-2">
                    {p.title}
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
