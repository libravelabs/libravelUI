"use client";

import { useState } from "react";
import { Button } from "@/components/ui/core/button";
import { Form } from "@/components/ui/core/form";
import { SearchBar } from "@/components/ui/core/search-bar";
import { SearchIcon } from "lucide-react";

export default function WithFormSearchBar() {
  const [query, setQuery] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!query.trim()) {
      setError(
        "You can search for something or leave it blank to see all results."
      );
    } else {
      setError(null);
      console.log("Searching for:", query);
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="flex items-center w-full gap-2 max-w-sm"
    >
      <SearchBar
        label="Search"
        placeholder="Anything, mate..."
        value={query}
        onChange={(value: string) => setQuery(value)}
        error={error}
      />
      <Button type="submit" tone="secondary" iconOnly>
        <SearchIcon />
      </Button>
    </Form>
  );
}
