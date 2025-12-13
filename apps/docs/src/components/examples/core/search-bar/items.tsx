"use client";

import { DropdownMenuItem } from "@/components/ui/core/dropdown-menu";
import { SearchBar } from "@/components/ui/core/search-bar";
import { Autocomplete, Menu, useFilter } from "react-aria-components";
import { useAsyncList } from "react-stately";

interface Person {
  id: string;
  name: string;
}

export default function ItemsSearchBar() {
  const { contains } = useFilter({ sensitivity: "base" });
  const list = useAsyncList<Person>({
    async load({ signal, cursor }) {
      if (cursor) {
        cursor = cursor.replace(/^http:\/\//i, "https://");
      }

      const res = await fetch(
        cursor || `https://swapi.py4e.com/api/people/?search=`,
        {
          signal,
        }
      );
      const json = await res.json();
      const items = json.results.map((p: Person & { url: string }) => ({
        id: p.url,
        name: p.name,
      }));

      return {
        items,
        cursor: json.next,
      };
    },
  });

  return (
    <div className="grid w-full gap-4">
      <Autocomplete filter={contains}>
        <SearchBar placeholder="Search for names" />
        <Menu
          items={list.items}
          renderEmptyState={() => (
            <p className="text-muted-foreground text-sm">No results found.</p>
          )}
          className="rounded-md border p-1"
          selectionMode="single"
        >
          {(item) => (
            <DropdownMenuItem key={item.id}>{item.name}</DropdownMenuItem>
          )}
        </Menu>
      </Autocomplete>
    </div>
  );
}
