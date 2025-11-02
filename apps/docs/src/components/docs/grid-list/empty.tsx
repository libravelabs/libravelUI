"use client";

import { GridList, GridListEmpty } from "@/components/ui/grid-list";

export default function EmptyGridList() {
  return (
    <GridList
      items={[]}
      aria-label="Select items"
      className="min-w-64"
      renderEmptyState={() => <GridListEmpty>No results found.</GridListEmpty>}
    />
  );
}
