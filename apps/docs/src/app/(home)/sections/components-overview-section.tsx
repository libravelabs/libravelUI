import { Wind, Zap, EyeOff, Layers } from "lucide-react";

const COMPONENTS_OVERVIEW_CONTENT = {
  header: {
    badge: "◼ MOTION_MODULE",
    title: "Motion Primitives",
    description: (
      <>
        Used for dialogs, menus, and state transitions.
        <br />
        Optional by default. Never blocks interaction.
      </>
    ),
    meta: {
      labId: "LAB_ID: 94-B",
      status: "STATUS: OPTIMAL",
    },
  },
  features: [
    {
      icon: Wind,
      title: "Original Primitives",
      description: "Built from scratch for React. Not a wrapper.",
    },
    {
      icon: EyeOff,
      title: "Reduced Motion",
      description: "Respects system preferences automatically.",
    },
    {
      icon: Zap,
      title: "Performance",
      description: "Optimized for 60fps. Zero layout thrashing.",
    },
    {
      icon: Layers,
      title: "Composable",
      description: "Add motion to any component. Zero conflict.",
    },
  ],
};

export function ComponentsOverviewSection() {
  return (
    <section className="py-24 border-b">
      <div className="container px-6 mx-auto">
        <div className="mb-20 flex flex-col items-start gap-4 border-l-2 border-primary/20 pl-6 md:flex-row md:items-end md:justify-between md:border-l-0 md:pl-0">
          <div className="max-w-xl">
            <div className="mb-2 flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-primary">
              {COMPONENTS_OVERVIEW_CONTENT.header.badge}
            </div>
            <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-5xl">
              {COMPONENTS_OVERVIEW_CONTENT.header.title}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground font-light leading-relaxed">
              {COMPONENTS_OVERVIEW_CONTENT.header.description}
            </p>
          </div>
          <div className="hidden font-mono text-xs text-muted-foreground/50 md:block text-right">
            <div>{COMPONENTS_OVERVIEW_CONTENT.header.meta.labId}</div>
            <div>{COMPONENTS_OVERVIEW_CONTENT.header.meta.status}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {COMPONENTS_OVERVIEW_CONTENT.features.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 rounded-lg border  hover:bg-muted/5 transition-all duration-300"
            >
              <div className="mb-4 inline-flex items-center justify-center h-10 w-10 rounded-md bg-muted/10 text-foreground group-hover:text-primary transition-colors">
                <feature.icon className="size-5" />
              </div>
              <h3 className="text-base font-medium mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
