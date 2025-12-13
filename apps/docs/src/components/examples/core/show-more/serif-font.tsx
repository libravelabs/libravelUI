"use client";

import { ShowMoreText } from "@/components/ui/core/show-more";

export default function SerifFontShowMore() {
  return (
    <ShowMoreText
      text="Octopuses have three hearts and their blood is blue, which sets them apart from most animals. Two of the hearts pump blood to the gills, where it picks up oxygen, while the third heart pumps it to the rest of the body. Unlike human blood, which uses iron-based hemoglobin, octopus blood contains hemocyanin, a copper-based molecule that turns blue when oxygenated. This adaptation helps them survive in deep, cold ocean waters with low oxygen levels."
      maxLength={110}
      classNames={{
        wrapper: "border border-border p-5 rounded-xl",
        text: "font-serif",
        toggle: "text-green-500 hover:text-green-700",
      }}
      showMoreLabel="Show More"
      showLessLabel="Show Less"
    />
  );
}
