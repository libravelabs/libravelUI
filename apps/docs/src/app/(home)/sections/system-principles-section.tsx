import { cn } from "@/lib/utils";

const principles = [
  {
    title: "Atomic Design",
    description:
      "Built on a foundation of unstyled primitives (React Aria) for maximum flexibility and accessibility.",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      </svg>
    ),
  },
  {
    title: "Composition First",
    description:
      "Components are designed to be composed together to create complex UIs without fighting the library.",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
        />
      </svg>
    ),
  },
  {
    title: "Token System",
    description:
      "Powered by a comprehensive design token system for consistent spacing, colors, and typography.",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
        />
      </svg>
    ),
  },
];

export function SystemPrinciplesSection() {
  return (
    <section className="py-24 bg-background border-b border-border">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-sm font-mono text-primary mb-6 tracking-widest uppercase">
              // ARCHITECTURE
            </h2>
            <h3 className="text-4xl font-bold text-foreground mb-6">
              Engineered for
              <br />
              Modern Applications
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Libravel UI isn't just a set of pretty pictures. It's a robust
              architecture built on top of React Aria, designed to be
              accessible, customizable, and reliable.
            </p>

            <div className="p-4 bg-muted/50 border border-border rounded-lg">
              <code className="text-sm font-mono text-foreground">
                <span className="text-chart-4">const</span>{" "}
                <span className="text-chart-5">ui</span> ={" "}
                <span className="text-chart-2">new</span>{" "}
                <span className="text-primary">System</span>({"{"}{" "}
                <span className="text-muted-foreground">...tokens</span> {"}"});
              </code>
            </div>
          </div>

          <div className="space-y-8">
            {principles.map((p) => (
              <div key={p.title} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center text-primary">
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
