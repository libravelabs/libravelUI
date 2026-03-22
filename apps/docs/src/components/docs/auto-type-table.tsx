"use client";

import * as React from "react";
import { TypeTable } from "./type-table";
import { RegistryComponentDocs } from "@/lib/registry-docs";

export function AutoTypeTable({
  comp,
  name,
}: {
  comp?: string;
  name?: string;
}) {
  const [types, setTypes] = React.useState<RegistryComponentDocs[] | null>(
    null,
  );
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const run = async () => {
      try {
        let slug = "";
        if (name) {
          slug = name;
        } else if (comp) {
          slug = comp.replace(/^@\//, "").replace(/\.tsx$/, "");
        }

        if (!slug) return;

        setError(null);
        const res = await fetch(`/api/source/${slug}`);
        if (!res.ok) {
          setError(`Component not found or API error (${res.status})`);
          return;
        }

        const json = await res.json();
        if (json.docs) {
          setTypes(json.docs);
        } else {
          setTypes([]);
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : "Unknown error");
      }
    };
    run();
  }, [comp, name]);

  if (error) {
    return <p className="text-destructive text-sm italic">{error}</p>;
  }

  if (!types) return <p className="text-muted-foreground">Loading types…</p>;

  if (types.length === 0) return <p className="text-muted-foreground text-sm italic">No props documented for this component.</p>;

  return (
    <div className="flex flex-col gap-8">
      {types.map((doc) => (
        <TypeTable
          key={doc.displayName}
          title={doc.displayName}
          type={doc.props}
        />
      ))}
    </div>
  );
}
