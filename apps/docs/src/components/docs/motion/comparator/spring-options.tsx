"use client";

import {
  Comparator,
  ComparatorPane,
  ComparatorSlider,
} from "@/components/ui/motion/comparator";

export default function SpringOptionsComparator() {
  return (
    <Comparator
      className="relative h-[400px] w-full"
      enableHover
      springOptions={{ bounce: 0.3 }}
    >
      <ComparatorPane position="left">
        <img
          src="https://ik.imagekit.io/xfc1k3ab4/gene-takavic.png"
          alt="gene-takavic"
          className="h-full w-full rounded-xl object-cover"
        />
      </ComparatorPane>

      <ComparatorPane position="right">
        <img
          src="https://ik.imagekit.io/xfc1k3ab4/jimmy-mcgill.png"
          alt="jimmy-mcgill"
          className="h-full w-full rounded-xl object-cover"
        />
      </ComparatorPane>

      <ComparatorSlider />
    </Comparator>
  );
}
