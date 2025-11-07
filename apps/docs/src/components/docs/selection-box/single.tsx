"use client";

import { Selectionbox, SelectionboxItem } from "@/components/ui/selection-box";
import { LayoutGrid, LayoutList, LayoutPanelTop } from "lucide-react";

export default function SingleSelectionBox() {
  return (
    <Selectionbox columns={3} gap={4} selectionMode="single">
      <SelectionboxItem
        textValue="grid"
        label="Grid Layout"
        description="Display items in a clean grid view."
        icon={<LayoutGrid />}
      />
      <SelectionboxItem
        textValue="list"
        label="List Layout"
        description="Show items in a detailed list format."
        icon={<LayoutList />}
      />
      <SelectionboxItem
        textValue="compact"
        label="Compact Layout"
        description="Minimal view with more content per page."
        icon={<LayoutPanelTop />}
      />
    </Selectionbox>
  );
}
