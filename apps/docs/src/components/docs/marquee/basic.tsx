"use client";

import { Marquee, MarqueeContent, MarqueeItem } from "@/components/ui/marquee";

export default function BasicMarquee() {
  return (
    <Marquee>
      <MarqueeContent>
        {items.map((item) => (
          <MarqueeItem key={item}>
            <i
              className={`devicon-${item}-plain min-w-[100px]`}
              aria-hidden="true"
            />
          </MarqueeItem>
        ))}
      </MarqueeContent>
    </Marquee>
  );
}

const items = ["github", "laravel", "tailwindcss", "react", "nextjs"];
