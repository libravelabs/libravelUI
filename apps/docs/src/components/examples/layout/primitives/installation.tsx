"use client";

import { ComponentSource } from "@/components/docs/component-source";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/core/accordion";
import { PackageInstall } from "@/components/docs/package-install";

export type InstallationProps = {
  section?: string;
  name: string;
  packages?: string | string[];
  requiredBlock?: React.ReactNode;
};

export function Installation({
  name,
  section = "motion",
  packages = ["tailwind-merge", "clsx", "motion"],
  requiredBlock,
}: InstallationProps) {
  const packageList = Array.isArray(packages)
    ? packages
    : typeof packages === "string"
      ? [packages]
      : [];

  return (
    <div className="flex flex-col gap-4 not-prose">
      {/* CLI quick start */}
      <Accordion tone="outline" size="full" defaultExpandedKeys={["cli"]}>
        <AccordionItem id="cli">
          <AccordionTrigger>
            <h3 className="text-sm font-semibold">Quick start (CLI)</h3>
            <p className="text-xs text-muted-foreground">
              Run a single command to install the component and dependencies.
            </p>
          </AccordionTrigger>
          <AccordionContent className="pt-1">
            <PackageInstall packageName={name} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem id="manual">
          <AccordionTrigger>
            <h3 className="text-sm font-semibold text-foreground">
              Manual installation
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Install the dependencies, add the utility helpers, then copy the
              component into your codebase.
            </p>
          </AccordionTrigger>
          <AccordionContent>
            {requiredBlock && <div className="mt-2 mb-6">{requiredBlock}</div>}
            <ol className="flex flex-col gap-4 text-muted-foreground">
              {steps.map((item) => (
                <li key={item.step} className="space-y-2">
                  <div className="flex items-center gap-2 font-medium">
                    <span className="inline-flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                      {item.step}
                    </span>
                    <h3 className="font-bold">{item.title}</h3>
                  </div>

                  <p>{item.description}</p>

                  {typeof item.content === "function"
                    ? item.content({ packageList, section, name })
                    : item.content}
                </li>
              ))}
            </ol>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

const steps = [
  {
    step: 1,
    title: "Install required dependencies",
    description:
      "Install the animation library and utility helpers used by the component.",
    content: ({ packageList }: { packageList: string[] }) => (
      <PackageInstall packageName={packageList.join(" ")} />
    ),
  },
  {
    step: 2,
    title: (
      <>
        Add the <code className="rounded bg-muted px-1">cn</code> helper
      </>
    ),
    description: (
      <>
        Create a reusable <code className="rounded bg-muted px-1">cn</code>{" "}
        helper that merges Tailwind classes using{" "}
        <code className="rounded bg-muted px-1">clsx</code> and{" "}
        <code className="rounded bg-muted px-1">tailwind-merge</code>.
      </>
    ),
    content: <ComponentSource comp="lib/utils" isReact={false} />,
  },
  {
    step: 3,
    title: "Copy the component file",
    description: (
      <>
        Copy the component implementation into your{" "}
        <code className="rounded bg-muted px-1">components/ui</code> directory.
        You can customize the path if needed.
      </>
    ),
    content: ({ section, name }: InstallationProps) => (
      <ComponentSource comp={`components/ui/${section}/${name}`} />
    ),
  },
  {
    step: 4,
    title: "Import and use in your app",
    description:
      "Import the component wherever you need it and start using it in your UI. The component is fully compatible with MDX pages.",
    content: ({ section, name }: InstallationProps) => (
      <div className="overflow-hidden rounded-md border border-border/80 bg-background/90">
        <pre className="px-3 py-2 text-[11px] font-mono [scrollbar-width:none]">
          <code>{`import { ${kebabToPascal(name)} } from "@/components/ui/${section}/${name}";`}</code>
        </pre>
      </div>
    ),
  },
];

function kebabToPascal(str: string) {
  return str
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");
}
