"use client";

import * as React from "react";
import { TypeTable, TypeDefinition } from "@/components/type-table";
import { LinkIcon } from "lucide-react";

interface TypeDoc {
  displayName: string;
  props: Record<string, TypeDefinition>;
}

type TypesResponse = TypeDoc[] | Record<string, Record<string, TypeDefinition>>;

export function AutoTypeTable({ comp }: { comp: string }) {
  const [types, setTypes] = React.useState<TypesResponse | null>(null);

  React.useEffect(() => {
    const run = async () => {
      try {
        const fullPath = comp.replace(/^@\//, "");
        const res = await fetch("/api/parse-type", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ source: fullPath }),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Failed to fetch types");
        setTypes(json);
      } catch {
        setTypes(null);
      }
    };
    run();
  }, [comp]);

  if (!types) return <p className="text-muted-foreground">Loading types…</p>;

  const isEmptyArray = Array.isArray(types) && types.length === 0;
  const isEmptyObject =
    !Array.isArray(types) && Object.keys(types).length === 0;

  if (isEmptyArray || isEmptyObject) return null;

  return (
    <>
      {Array.isArray(types)
        ? types.map((doc) => {
            if (!doc.props || Object.keys(doc.props).length === 0) return null;
            return (
              <div key={doc.displayName} className="mb-8">
                <h3
                  className="flex scroll-m-28 flex-row items-center gap-2"
                  id={doc.displayName.toLowerCase()}
                >
                  <a
                    data-card
                    href={`#${doc.displayName.toLowerCase()}`}
                    className="peer"
                  >
                    {doc.displayName}
                  </a>
                  <LinkIcon className="lucide size-3.5 shrink-0 text-fd-muted-foreground opacity-0 transition-opacity peer-hover:opacity-100" />
                </h3>
                <TypeTable type={doc.props} />
              </div>
            );
          })
        : Object.entries(types).map(([name, def]) => {
            if (!def || Object.keys(def).length === 0) return null;
            return (
              <div key={name} className="mb-8">
                <h3
                  className="flex scroll-m-28 flex-row items-center gap-2"
                  id={name.toLowerCase()}
                >
                  <a data-card href={`#${name.toLowerCase()}`} className="peer">
                    {name}
                  </a>
                  <LinkIcon className="lucide size-3.5 shrink-0 text-fd-muted-foreground opacity-0 transition-opacity peer-hover:opacity-100" />
                </h3>
                <TypeTable type={def} />
              </div>
            );
          })}
    </>
  );
}
