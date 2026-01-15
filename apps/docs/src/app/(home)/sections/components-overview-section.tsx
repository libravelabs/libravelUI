import { Button } from "@/components/ui/core/button";
import Link from "next/link";

const COMPONENTS_OVERVIEW_CONTENT = {
  header: {
    badge: "// COMPONENT INDEX",
    title: "Inventory",
  },
  cta: {
    text: "View Full Registry",
    href: "/docs/components",
  },
  categories: [
    {
      title: "Primitives",
      description: "Fundamental building blocks.",
      items: ["Button", "Icon", "Typography", "Layout"],
      count: "04",
      status: "Available",
    },
    {
      title: "Form Elements",
      description: "Input and data collection interfaces.",
      items: ["Input", "Select", "Checkbox", "Switch", "Radio"],
      count: "12",
      status: "Available",
    },
    {
      title: "Overlay System",
      description: "Modals, dialogs, and popovers.",
      items: ["Dialog", "Popover", "Tooltip", "Toast"],
      count: "08",
      status: "Available",
    },
    {
      title: "Data Display",
      description: "Tables, lists, and visualization.",
      items: ["Table", "Card", "Badge", "Avatar"],
      count: "06",
      status: "Available",
    },
  ],
};

export function ComponentsOverviewSection() {
  return (
    <section className="py-24 bg-background border-b border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-sm font-mono text-primary mb-2 tracking-widest uppercase">
              {COMPONENTS_OVERVIEW_CONTENT.header.badge}
            </h2>
            <h3 className="text-3xl font-semibold text-foreground tracking-tight">
              {COMPONENTS_OVERVIEW_CONTENT.header.title}
            </h3>
          </div>
          <Link href={COMPONENTS_OVERVIEW_CONTENT.cta.href}>
            <Button tone="ghost" className="text-muted-foreground group">
              {COMPONENTS_OVERVIEW_CONTENT.cta.text}{" "}
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
          {COMPONENTS_OVERVIEW_CONTENT.categories.map((category) => (
            <div
              key={category.title}
              className="group relative p-8 bg-card hover:bg-muted transition-colors duration-300"
            >
              <div className="flex justify-between items-start mb-6">
                <h4 className="text-lg font-medium text-card-foreground">
                  {category.title}
                </h4>
                <span className="text-xs font-mono text-muted-foreground">
                  {category.count}
                </span>
              </div>

              <p className="text-sm text-muted-foreground mb-8 h-10">
                {category.description}
              </p>

              <div className="space-y-2">
                {category.items.map((item) => (
                  <div
                    key={item}
                    className="flex items-center text-sm text-muted-foreground group-hover:text-foreground transition-colors"
                  >
                    <span className="w-1.5 h-1.5 bg-border rounded-sm mr-2 group-hover:bg-primary transition-colors" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-4 border-t border-dashed border-border group-hover:border-input transition-colors">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors">
                  {category.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
