"use client";

import { useState } from "react";
import { MultipleSelect } from "@/components/ui/core/multiple-select";

const genres = [
  { id: "action", label: "Action" },
  { id: "adventure", label: "Adventure" },
  { id: "animation", label: "Animation" },
  { id: "comedy", label: "Comedy" },
  { id: "crime", label: "Crime" },
  { id: "documentary", label: "Documentary" },
  { id: "drama", label: "Drama" },
  { id: "family", label: "Family" },
  { id: "fantasy", label: "Fantasy" },
  { id: "history", label: "History" },
  { id: "horror", label: "Horror" },
  { id: "music", label: "Music" },
  { id: "mystery", label: "Mystery" },
  { id: "romance", label: "Romance" },
  { id: "science-fiction", label: "Science Fiction" },
  { id: "superhero", label: "Superhero" },
  { id: "satire", label: "Satire" },
  { id: "political", label: "Political" },
  { id: "dark-comedy", label: "Dark Comedy" },
  { id: "spy", label: "Spy" },
  { id: "psychological", label: "Psychological" },
  { id: "tv-movie", label: "TV Movie" },
  { id: "thriller", label: "Thriller" },
  { id: "war", label: "War" },
  { id: "western", label: "Western" },
];

export default function MultipleSelectSimple() {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <MultipleSelect<(typeof genres)[number]>
      items={genres}
      value={selected}
      onChange={setSelected}
      label="Genres"
      placeholder="Select genres"
      inputPlaceholder="Search genres..."
      className="min-w-64"
    />
  );
}
