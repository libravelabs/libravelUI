"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/core/accordion";

export default function AccordionBasic() {
  return (
    <Accordion>
      <AccordionItem>
        <AccordionTrigger>
          What is the only food that never spoils?
        </AccordionTrigger>
        <AccordionContent>
          <p>
            Honey! Archaeologists have found pots of honey in ancient Egyptian
            tombs that are over 3,000 years old and still perfectly edible.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem>
        <AccordionTrigger>Can an octopus taste with its arms?</AccordionTrigger>
        <AccordionContent>
          <p>
            Yes! An octopus has taste receptors on its suckers, so it can
            literally taste what it touches.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem>
        <AccordionTrigger>What’s the shortest war in history?</AccordionTrigger>
        <AccordionContent>
          <p>
            The Anglo-Zanzibar War in 1896 lasted between 38 and 45 minutes. ⚔️
            That’s shorter than most Netflix episodes.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
