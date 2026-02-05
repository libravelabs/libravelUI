const COMPARISON_SECTION_CONTENT = {
  header: {
    badge: "◼ SYSTEM_POSITIONING",
    title: "Position in the ecosystem",
    description: "Bridge between primitives and kits.",
    meta: {
      labId: "LAB_ID: 94-B",
      status: "STATUS: OPTIMAL",
    },
  },
  data: [
    {
      feature: "Accessibility",
      primitives: "Built-in",
      kits: "Good",
      libravel: "Built-in (React Aria)",
    },
    {
      feature: "Styling",
      primitives: "None",
      kits: "Opinionated",
      libravel: "Minimal / Unopinionated",
    },
    {
      feature: "Motion",
      primitives: "None",
      kits: "Basic",
      libravel: "Advanced / Primitives",
    },
    {
      feature: "Updates",
      primitives: "Package",
      kits: "Manual Copy-Paste",
      libravel: "Versioned Package",
    },
  ],
};

export function ComparisonSection() {
  return (
    <section className="py-24 border-b">
      <div className="container px-6 mx-auto">
        <div className="mb-20 flex flex-col items-start gap-4 border-l-2 border-primary/20 pl-6 md:flex-row md:items-end md:justify-between md:border-l-0 md:pl-0">
          <div className="max-w-xl">
            <div className="mb-2 flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-primary">
              {COMPARISON_SECTION_CONTENT.header.badge}
            </div>
            <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-5xl">
              {COMPARISON_SECTION_CONTENT.header.title}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground font-light leading-relaxed">
              {COMPARISON_SECTION_CONTENT.header.description}
            </p>
          </div>
          <div className="hidden font-mono text-xs text-muted-foreground/50 md:block text-right">
            <div>{COMPARISON_SECTION_CONTENT.header.meta.labId}</div>
            <div>{COMPARISON_SECTION_CONTENT.header.meta.status}</div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-4 font-mono font-normal text-muted-foreground w-1/4">
                  {"// FEATURE"}
                </th>
                <th className="py-4 font-mono font-normal text-muted-foreground w-1/4">
                  Raw Primitives
                </th>
                <th className="py-4 font-mono font-normal text-muted-foreground w-1/4">
                  UI Kits
                </th>
                <th className="py-4 font-mono font-medium text-primary w-1/4">
                  libravelUI
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_SECTION_CONTENT.data.map((row) => (
                <tr
                  key={row.feature}
                  className="border-b hover:bg-muted/5 transition-colors"
                >
                  <td className="py-4 font-medium text-foreground">
                    {row.feature}
                  </td>
                  <td className="py-4 text-muted-foreground">
                    {row.primitives}
                  </td>
                  <td className="py-4 text-muted-foreground">{row.kits}</td>
                  <td className="py-4 text-foreground font-medium">
                    {row.libravel}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
