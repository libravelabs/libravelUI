"use client";

import { ListBox, ListBoxItem } from "@/components/ui/core/list-box";

export default function BasicListBox() {
  return (
    <ListBox className="max-w-2xs" items={items} selectionMode="single">
      {(item) => <ListBoxItem id={item.id}>{item.label}</ListBoxItem>}
    </ListBox>
  );
}

const items = [
  { id: "action", label: "Action" },
  { id: "adventure", label: "Adventure" },
  { id: "animation", label: "Animation" },
  { id: "comedy", label: "Comedy" },
  { id: "crime", label: "Crime" },
] as const;
