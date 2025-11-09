"use client";

import { SearchBar } from "@/components/ui/core/search-bar";
import { Shortcut } from "@/components/ui/core/shortcut";

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
