"use client";

import { useState } from "react";
import type { Selection } from "react-stately";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function SingleDropdownMenu() {
  const [selected, setSelected] = useState<Selection>(new Set([]));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger variant="outline">
        Product Status
      </DropdownMenuTrigger>
      <DropdownMenuContent
        popover={{ placement: "bottom" }}
        selectionMode="single"
        selectedKeys={selected}
        onSelectionChange={setSelected}
        items={items}
      >
        {(item) => (
          <DropdownMenuItem id={item.value} textValue={item.label}>
            {item.label}
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface Items {
  label: string;
  value: string;
}

const items: Items[] = [
  { label: "In Stock", value: "in_stock" },
  { label: "On Sale", value: "on_sale" },
  { label: "Featured", value: "featured" },
  { label: "New Arrivals", value: "new_arrivals" },
  { label: "Best Sellers", value: "best_sellers" },
];
