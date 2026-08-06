"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  type AccordionProps,
} from "@/components/ui/core/accordion";
import type { StoryBookConfig } from "@/components/app/notebook/types";

type AccordionStoryArgs = {
  tone: AccordionProps["tone"];
  size: AccordionProps["size"];
  allowsMultipleExpanded: boolean;
  isDisabled: boolean;
};

const AccordionExample = (args: AccordionStoryArgs) => (
  <Accordion
    tone={args.tone}
    size={args.size}
    allowsMultipleExpanded={args.allowsMultipleExpanded}
    isDisabled={args.isDisabled}
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

const tones = [
  { value: "default", label: "Default" },
  { value: "ghost", label: "Ghost" },
  { value: "outline", label: "Outline" },
  { value: "solid", label: "Solid" },
  { value: "muted", label: "Muted" },
  { value: "separated", label: "Separated" },
] as const;

const sizes = [
  { value: "sm", label: "Small" },
  { value: "md", label: "Medium" },
  { value: "lg", label: "Large" },
  { value: "full", label: "Full" },
] as const;

export const accordion = {
  title: "Accordion",

  layout: {
    control: {
      columns: 2,
    },
  },

  args: {
    tone: {
      defaultValue: "default",
      control: {
        type: "select",
        options: [...tones],
      },
      style: {
        colSpan: 1,
      },
    },

    size: {
      defaultValue: "md",
      control: {
        type: "select",
        options: [...sizes],
      },
      style: {
        colSpan: 1,
      },
    },

    allowsMultipleExpanded: {
      defaultValue: false,
      control: {
        type: "boolean",
      },
      style: {
        colSpan: 1,
      },
    },

    isDisabled: {
      defaultValue: false,
      control: {
        type: "boolean",
      },
      style: {
        colSpan: 1,
      },
    },
  },

  render: AccordionExample,

  code: (args) => ({
    imports: [
      'import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/core/accordion";',
    ],
    element: AccordionExample(args),
  }),
} satisfies StoryBookConfig<AccordionStoryArgs>;
