"use client";

import * as React from "react";
import { TypeTable } from "@/components/type-table";
import { RegistryComponentDocs } from "@/lib/registry-docs";

export function AutoTypeTable({
  comp,
  name,
}: {
  comp?: string;
  name?: string;
}) {
  const [types, setTypes] = React.useState<RegistryComponentDocs[] | null>(
    null
  );

  React.useEffect(() => {
    const run = async () => {
      try {
        let slug = "";
        if (name) {
          slug = name;
        } else if (comp) {
          const basename = comp.split("/").pop();
          slug = basename ? basename.replace(/\.tsx$/, "") : "";
        }

        if (!slug) return;

        const res = await fetch(`/api/source/${slug}`);
        if (!res.ok) return;

        const json = await res.json();
        if (json.docs) {
          setTypes(json.docs);
        }
      } catch {
        //
      }
    };
    run();
  }, [comp, name]);

  if (!types) return <p className="text-muted-foreground">Loading types…</p>;

  if (types.length === 0) return null;

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
