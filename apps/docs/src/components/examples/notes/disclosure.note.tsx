"use client";

import {
  Disclosure,
  DisclosureContent,
  DisclosureTrigger,
} from "@/components/ui/core/disclosure";
import type { DisclosureProps } from "@/components/ui/core/disclosure";
import type { StoryBookConfig } from "@/components/app/notebook/types";

type DisclosureStoryArgs = {
  tone: DisclosureProps["tone"];
  size: DisclosureProps["size"];
  isDisabled: DisclosureProps["isDisabled"];
};

const DisclosureExample = (args: DisclosureStoryArgs) => (
  <Disclosure tone={args.tone} size={args.size} isDisabled={args.isDisabled}>
    <DisclosureTrigger>What’s included in the Pro plan?</DisclosureTrigger>

    <DisclosureContent>
      <p>
        The Pro plan includes unlimited projects, advanced analytics, priority
        support, and integrations with third-party tools like Slack and Google
        Drive.
      </p>
    </DisclosureContent>
  </Disclosure>
);

export const disclosure = {
  title: "Disclosure",

  layout: {
    control: {
      columns: 2,
      className: "gap-6",
    },
  },

  args: {
    tone: {
      defaultValue: "default",
      style: {
        colSpan: 1,
      },
      control: {
        type: "select",
        options: [
          { value: "default", label: "Default" },
          { value: "ghost", label: "Ghost" },
          { value: "outline", label: "Outline" },
          { value: "solid", label: "Solid" },
          { value: "muted", label: "Muted" },
          { value: "separated", label: "Separated" },
        ],
      },
    },

    size: {
      defaultValue: "md",
      style: {
        colSpan: 1,
      },
      control: {
        type: "select",
        options: [
          { value: "sm", label: "Small" },
          { value: "md", label: "Medium" },
          { value: "lg", label: "Large" },
          { value: "full", label: "Full" },
        ],
      },
    },

    isDisabled: {
      defaultValue: false,
      style: {
        colSpan: 1,
      },
      control: {
        type: "boolean",
      },
    },
  },

  render: DisclosureExample,

  code: (args) => ({
    imports: [
      'import { Disclosure, DisclosureContent, DisclosureTrigger } from "@/components/ui/core/disclosure";',
    ],
    element: DisclosureExample(args),
  }),
} satisfies StoryBookConfig<DisclosureStoryArgs>;
