"use client";

import { ShowMoreText } from "@/components/ui/core/show-more";

export default function BasicShowMore() {
  return (
    <ShowMoreText
      text="The Eiffel Tower can grow over 6 inches taller during summer due to thermal expansion. The metal that makes up the tower expands when it's exposed to heat, causing the entire structure to literally stretch upward. Engineers account for this shift in their maintenance routines, and it’s a great real-world example of how physics plays out on massive, iconic landmarks."
      maxLength={100}
      className="text-sm"
    />
  );
}
