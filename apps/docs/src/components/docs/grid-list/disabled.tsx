"use client";

import { GridList, GridListItem } from "@/components/ui/grid-list";

export default function DisabledGridList() {
  return (
    <GridList
      items={items}
      aria-label="Select your favorite bands"
      className="min-w-64"
    >
      {(item) => (
        <GridListItem
          isDisabled={[1, 7].includes(Number(item.id))}
          id={item.id}
        >
          {item.name}
        </GridListItem>
      )}
    </GridList>
  );
}

const items = [
  { id: "1", name: "Leeds United" },
  { id: "2", name: "Real Madrid" },
  { id: "3", name: "Manchester City" },
  { id: "4", name: "Bayern Munich" },
  { id: "5", name: "Liverpool" },
  { id: "6", name: "Paris Saint-Germain" },
  { id: "7", name: "FC Barcelona" },
];
