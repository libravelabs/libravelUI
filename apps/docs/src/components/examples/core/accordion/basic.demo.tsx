"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  type AccordionProps,
} from "@/components/ui/core/accordion";

const tones: { value: string; label: string }[] = [
  { value: "default", label: "Default" },
  { value: "ghost", label: "Ghost" },
  { value: "outline", label: "Outline" },
  { value: "solid", label: "Solid" },
  { value: "muted", label: "Muted" },
  { value: "separated", label: "Separated" },
];

const sizes: { value: string; label: string }[] = [
  { value: "sm", label: "Small" },
  { value: "md", label: "Medium" },
  { value: "lg", label: "Large" },
  { value: "full", label: "Full" },
];

export default function BasicAccordion({
  tone = "default",
  size = "md",
  allowsMultipleExpanded = false,
  isDisabled = false,
}: AccordionProps) {
  return (
    <Accordion
      tone={tone}
      size={size}
      allowsMultipleExpanded={allowsMultipleExpanded}
      isDisabled={isDisabled}
    >
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

export const controls = {
  tone: {
    type: "select",
    options: tones,
    defaultValue: "default",
    label: "Tone",
  },
  size: {
    type: "select",
    options: sizes,
    defaultValue: "md",
    label: "Size",
  },
  allowsMultipleExpanded: {
    type: "boolean",
    defaultValue: false,
    label: "Allows Multiple Expanded",
  },
  isDisabled: {
    type: "boolean",
    defaultValue: false,
    label: "Disabled",
  },
};
