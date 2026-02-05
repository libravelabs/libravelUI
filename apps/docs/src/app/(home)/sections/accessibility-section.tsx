import { CheckCircle2 } from "lucide-react";

const ACCESSIBILITY_SECTION_CONTENT = {
  header: {
    badge: "◼ SYSTEM_STATUS",
    title: "Accessibility Status: OK",
    description: "System-wide compliance check passed.",
    meta: {
      labId: "LAB_ID: 94-B",
      status: "STATUS: OPTIMAL",
    },
  },
  checks: [
    "Keyboard navigation",
    "Focus management",
    "ARIA roles",
    "Screen reader support",
    "Reduced motion compliant",
  ],
};

export function AccessibilitySection() {
  return (
    <section className="py-24">
      <div className="container px-6 mx-auto">
        <div className="mb-20 flex flex-col items-start gap-4 border-l-2 border-primary/20 pl-6 md:flex-row md:items-end md:justify-between md:border-l-0 md:pl-0">
          <div className="max-w-xl">
            <div className="mb-2 flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-primary">
              {ACCESSIBILITY_SECTION_CONTENT.header.badge}
            </div>
            <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-5xl">
              {ACCESSIBILITY_SECTION_CONTENT.header.title}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground font-light leading-relaxed">
              {ACCESSIBILITY_SECTION_CONTENT.header.description}
            </p>
          </div>
          <div className="hidden font-mono text-xs text-muted-foreground/50 md:block text-right">
            <div>{ACCESSIBILITY_SECTION_CONTENT.header.meta.labId}</div>
            <div>{ACCESSIBILITY_SECTION_CONTENT.header.meta.status}</div>
          </div>
        </div>

        <div className="max-w-md mx-auto grid gap-4">
          {ACCESSIBILITY_SECTION_CONTENT.checks.map((check) => (
            <div
              key={check}
              className="flex items-center justify-between p-4 rounded border bg-muted/5"
            >
              <span className="text-sm font-medium">{check}</span>
              <CheckCircle2 className="size-5 text-green-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
