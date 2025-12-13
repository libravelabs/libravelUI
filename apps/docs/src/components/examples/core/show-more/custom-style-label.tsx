"use client";

import { ShowMoreText } from "@/components/ui/core/show-more";

export default function CustomStyledLabelShowMore() {
  return (
    <ShowMoreText
      text="Bananas are technically classified as berries, while strawberries are not — a fact that surprises many. In botanical terms, a berry is a fruit that comes from a single flower with one ovary and typically has several seeds. Because bananas grow from a flower with a single ovary and develop into a soft, edible fruit with tiny seeds, they fit the bill. Strawberries, on the other hand, form from a flower with multiple ovaries, making them 'aggregate fruits' instead."
      maxLength={90}
      classNames={{
        wrapper: "bg-card shadow-sm rounded-xl p-4",
        text: "text-card-foreground italic",
        toggle: "text-primary hover:opacity-70",
      }}
      showMoreLabel="Expand"
      showLessLabel="Collapse"
    />
  );
}
