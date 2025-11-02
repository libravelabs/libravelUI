"use client";

import { useDragAndDrop } from "react-aria-components";
import { useListData } from "react-stately";
import { ListBox, ListBoxItem } from "@/components/ui/list-box";

export default function DNDListBox() {
  const list = useListData({
    initialItems: [
      { id: "1", label: "Nirvana" },
      { id: "2", label: "Radiohead" },
      { id: "3", label: "Foo Fighters" },
      { id: "4", label: "Arctic Monkeys" },
      { id: "5", label: "The Strokes" },
    ],
  });

  const { dragAndDropHooks } = useDragAndDrop({
    getItems: (keys) =>
      [...keys].map((key) => ({
        "text/plain": list.getItem(key)?.label ?? "",
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
    <ListBox
      className="max-w-2xs"
      items={list.items}
      selectionMode="multiple"
      dragAndDropHooks={dragAndDropHooks}
    >
      {(item) => <ListBoxItem key={item.id}>{item.label}</ListBoxItem>}
    </ListBox>
  );
}
