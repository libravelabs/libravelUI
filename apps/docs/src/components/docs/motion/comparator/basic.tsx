"use client";

import { Badge } from "@/components/ui/core/badge";
import {
  Comparator,
  ComparatorPane,
  ComparatorSlider,
} from "@/components/ui/motion/comparator";

export default function BasicComparator() {
  return (
    <Comparator className="relative h-[400px] w-full">
      <ComparatorPane position="left">
        <img
          src="https://static.vecteezy.com/system/resources/previews/038/816/666/non_2x/ai-generated-candidgraphs-capturing-friends-sharing-laughter-and-joyful-moments-together-in-various-settings-free-photo.jpeg"
          alt="gene-takavic"
          className="h-full w-full rounded-xl object-cover"
        />
        <Badge variant="secondary" className="absolute end-4 bottom-4">
          After
        </Badge>
      </ComparatorPane>

      <ComparatorPane position="right">
        <img
          src="https://static.vecteezy.com/system/resources/previews/038/816/666/non_2x/ai-generated-candidgraphs-capturing-friends-sharing-laughter-and-joyful-moments-together-in-various-settings-free-photo.jpeg"
          alt="jimmy-mcgill"
          className="h-full w-full rounded-xl object-cover blur-xs"
        />
        <Badge variant="secondary" className="absolute start-4 bottom-4">
          Before
        </Badge>
      </ComparatorPane>

      <ComparatorSlider />
    </Comparator>
  );
}
