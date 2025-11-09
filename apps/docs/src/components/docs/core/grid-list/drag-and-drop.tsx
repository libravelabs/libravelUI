"use client";

import { GridList, GridListItem } from "@/components/ui/core/grid-list";
import { useListData } from "react-stately";
import { useDragAndDrop } from "react-aria-components";

export default function DragAndDropGridList() {
  const list = useListData({
    initialItems: items,
  });
  const { dragAndDropHooks } = useDragAndDrop({
    getItems: (keys) =>
      [...keys].map((key) => ({
        "text/plain": list.getItem(key)?.name ?? "",
      })),
    onReorder(e) {
      if (e.target.dropPosition === "before") {
        list.moveBefore(e.target.key, e.keys);
      } else if (e.target.dropPosition === "after") {
        list.moveAfter(e.target.key, e.keys);
      }
    },
  });

  return (
    <GridList
      multiple
      items={list.items}
      aria-label="Droppable list"
      dragAndDropHooks={dragAndDropHooks}
    >
      {(item) => <GridListItem id={item.id}>{item.name}</GridListItem>}
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
