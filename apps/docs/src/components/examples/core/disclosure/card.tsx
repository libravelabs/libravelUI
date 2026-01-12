"use client";

import { useState } from "react";
import {
  Disclosure,
  DisclosureContent,
  DisclosureTrigger,
} from "@/components/ui/core/disclosure";
import { cn } from "@/lib/utils";

export default function DisclosureCard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className="relative h-[400px] w-[267px] overflow-hidden rounded-xl"
    >
      <img
        src="https://image.tmdb.org/t/p/w342/2zmTngn1tYC1AvfnrFLhxeD82hz.jpg"
        alt="the-boys"
        className={cn(
          "pointer-events-none h-auto w-full select-none duration-700 ease-in-out",
          isOpen && "blur-[3px] scale-110"
        )}
      />
      <Disclosure
        onExpandedChange={setIsOpen}
        isExpanded={isOpen}
        className="absolute bottom-0 left-0 right-0 bg-background text-foreground"
      >
        <DisclosureTrigger hideChevron>
          The Boys (2019 - present)
        </DisclosureTrigger>
        <DisclosureContent>
          <p className="text-justify">
            A group of vigilantes known informally as “The Boys” set out to take
            down corrupt superheroes with no more than blue-collar grit and a
            willingness to fight dirty.
          </p>
        </DisclosureContent>
      </Disclosure>
    </div>
  );
}
