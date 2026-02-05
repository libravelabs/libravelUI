import { Terminal } from "lucide-react";

const SHOWCASE_SECTION_CONTENT = {
  header: {
    badge: "◼ SYSTEM_USAGE",
    title: "When should I use this?",
    description: "Positioned between raw primitives and copy-paste UI kits.",
    meta: {
      labId: "LAB_ID: 94-B",
      status: "STATUS: OPTIMAL",
    },
  },
  useCases: [
    "React Aria accessibility without starting from scratch.",
    "Motion that respects accessibility preferences.",
    "Building a design system, not a UI kit.",
    "Stable, versioned APIs.",
  ],
  log: {
    title: "system_check.log",
    checks: [
      { status: "success", text: "Validating design requirements..." },
      { status: "success", text: "Checking accessibility compliance..." },
      { status: "success", text: "Verifying API stability..." },
      { status: "info", text: "Result: Recommended for production." },
    ],
  },
};

export function ShowcaseSection() {
  return (
    <section className="py-24 border-b bg-muted/5">
      <div className="container px-6 mx-auto">
        <div className="mb-20 flex flex-col items-start gap-4 border-l-2 border-primary/20 pl-6 md:flex-row md:items-end md:justify-between md:border-l-0 md:pl-0">
          <div className="max-w-xl">
            <div className="mb-2 flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-primary">
              {SHOWCASE_SECTION_CONTENT.header.badge}
            </div>
            <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-5xl">
              {SHOWCASE_SECTION_CONTENT.header.title}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground font-light leading-relaxed">
              {SHOWCASE_SECTION_CONTENT.header.description}
            </p>
          </div>
          <div className="hidden font-mono text-xs text-muted-foreground/50 md:block text-right">
            <div>{SHOWCASE_SECTION_CONTENT.header.meta.labId}</div>
            <div>{SHOWCASE_SECTION_CONTENT.header.meta.status}</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="space-y-6">
              {SHOWCASE_SECTION_CONTENT.useCases.map((useCase, i) => (
                <div key={i} className="flex gap-4 items-start group">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors">
                    {useCase}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border p-6 font-mono text-xs text-muted-foreground shadow-sm">
            <div className="flex items-center gap-2 border-b pb-4 mb-4">
              <Terminal className="size-4" />
              <span>{SHOWCASE_SECTION_CONTENT.log.title}</span>
            </div>
            <div className="space-y-2">
              {SHOWCASE_SECTION_CONTENT.log.checks.map((check, i) => (
                <div key={i} className="flex gap-2">
                  <span
                    className={
                      check.status === "success"
                        ? "text-green-500"
                        : "text-blue-500"
                    }
                  >
                    {check.status === "success" ? "✓" : "ℹ"}
                  </span>
                  <span>{check.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
