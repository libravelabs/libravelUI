"use client";

import { SearchBar } from "@/components/ui/search-bar";
import { Shortcut } from "@/components/ui/shortcut";

export default function BasicSearchBar() {
  return (
    <SearchBar
      label="Search"
      placeholder="Anything, mate..."
      endContent={<Shortcut keys="⌘K" />}
      className="max-w-sm"
    />
  );
}
