"use client";

import { Badge } from "@/components/ui/badge";
import { Heading } from "@/components/ui/heading";
import {
  Comparator,
  ComparatorPane,
  ComparatorSlider,
} from "@/components/ui/motion/comparator";

export default function BasicComparator() {
  return (
    <div className="flex flex-col items-center text-center w-full">
      <Heading>Enhance image with upscale AI</Heading>
      <p className="text-sm max-w-xl text-muted-foreground mt-2 mb-4">
        Powered by AI technology, our image upscaler can enlarge your images by
        200% or 400% without losing quality. Enhance your photos with higher
        resolution and better detail.
      </p>
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
    </div>
  );
}
