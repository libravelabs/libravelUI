"use client";

import { useState } from "react";
import type { Selection } from "react-stately";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function MultipleDropdownMenu() {
  const [selected, setSelected] = useState<Selection>(new Set([]));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger variant="outline">
        Store Settings
      </DropdownMenuTrigger>
      <DropdownMenuContent
        popover={{ placement: "bottom" }}
        selectionMode="multiple"
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
  { label: "Show Revenue", value: "revenue" },
  { label: "Show Orders", value: "orders" },
  { label: "Show Active Users", value: "active_users" },
  { label: "Show Sessions", value: "sessions" },
  { label: "Show Conversion Rate", value: "conversion_rate" },
];
